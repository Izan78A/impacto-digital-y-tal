#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { config } from 'dotenv';
import { GitHubDeployer } from './deployers/github.js';
import { RenderDeployer } from './deployers/render.js';
import { SupabaseDeployer } from './deployers/supabase.js';
import { DockerDeployer } from './deployers/docker.js';
import { AgentSystem } from './agent/system.js';
import { PhoneNotifier } from './utils/phone.js';

config();

const program = new Command();

program
  .name('impacto-upload')
  .description('Sistema para subir proyectos locales a la nube y gestionar productos digitales')
  .version('1.0.0');

program
  .command('deploy')
  .description('Despliega un proyecto a la nube')
  .option('-p, --provider <provider>', 'Proveedor de nube (github, render, supabase, docker)', 'github')
  .option('-d, --directory <directory>', 'Directorio del proyecto', process.cwd())
  .option('-n, --notify', 'Enviar notificación telefónica al completar', false)
  .action(async (options) => {
    const spinner = ora('Iniciando despliegue...').start();
    
    try {
      let deployer;
      
      switch (options.provider.toLowerCase()) {
        case 'github':
          deployer = new GitHubDeployer();
          break;
        case 'render':
          deployer = new RenderDeployer();
          break;
        case 'supabase':
          deployer = new SupabaseDeployer();
          break;
        case 'docker':
          deployer = new DockerDeployer();
          break;
        default:
          spinner.fail(chalk.red(`Proveedor no soportado: ${options.provider}`));
          return;
      }
      
      spinner.text = `Desplegando a ${options.provider}...`;
      const result = await deployer.deploy(options.directory);
      
      spinner.succeed(chalk.green(`✓ Proyecto desplegado exitosamente a ${options.provider}`));
      console.log(chalk.cyan(`URL: ${result.url}`));
      
      if (options.notify) {
        const notifier = new PhoneNotifier();
        await notifier.sendDeploymentNotification(options.provider, result.url);
      }
    } catch (error) {
      spinner.fail(chalk.red(`Error en el despliegue: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('agent')
  .description('Ejecuta el sistema agéntico para modificar código automáticamente')
  .option('-t, --task <task>', 'Tarea a realizar')
  .option('-f, --file <file>', 'Archivo a modificar')
  .action(async (options) => {
    const spinner = ora('Iniciando sistema agéntico...').start();
    
    try {
      const agent = new AgentSystem();
      spinner.text = 'Analizando código...';
      
      const result = await agent.executeTask(options.task, options.file);
      
      spinner.succeed(chalk.green('✓ Tarea completada por el agente'));
      console.log(chalk.cyan('Cambios realizados:'));
      console.log(result.changes);
    } catch (error) {
      spinner.fail(chalk.red(`Error en el agente: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Inicializa un nuevo proyecto para deployment')
  .action(async () => {
    console.log(chalk.bold.cyan('\n🚀 Configuración de Proyecto para Impacto Digital\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Nombre del proyecto:',
        default: 'mi-proyecto'
      },
      {
        type: 'list',
        name: 'provider',
        message: 'Selecciona el proveedor principal:',
        choices: ['GitHub', 'Render', 'Supabase', 'Docker Hub']
      },
      {
        type: 'confirm',
        name: 'useDocker',
        message: '¿Usar Docker?',
        default: true
      },
      {
        type: 'confirm',
        name: 'enableAgent',
        message: '¿Habilitar sistema agéntico?',
        default: true
      }
    ]);
    
    const spinner = ora('Creando configuración...').start();
    
    // Create project structure
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const projectPath = path.join(process.cwd(), answers.projectName);
    await fs.mkdir(projectPath, { recursive: true });
    
    // Create Dockerfile if needed
    if (answers.useDocker) {
      const dockerfileContent = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
      await fs.writeFile(path.join(projectPath, 'Dockerfile'), dockerfileContent);
    }
    
    // Create agent config if needed
    if (answers.enableAgent) {
      const agentConfig = {
        enabled: true,
        tasks: [],
        autoCommands: true
      };
      await fs.writeFile(
        path.join(projectPath, 'agent.config.json'),
        JSON.stringify(agentConfig, null, 2)
      );
    }
    
    // Create deployment config
    const deployConfig = {
      projectName: answers.projectName,
      provider: answers.provider.toLowerCase(),
      docker: answers.useDocker,
      agent: answers.enableAgent
    };
    
    await fs.writeFile(
      path.join(projectPath, 'deploy.config.json'),
      JSON.stringify(deployConfig, null, 2)
    );
    
    spinner.succeed(chalk.green(`✓ Proyecto inicializado en ${projectPath}`));
    console.log(chalk.cyan('\nPróximos pasos:'));
    console.log(chalk.white(`  cd ${answers.projectName}`));
    console.log(chalk.white('  impacto-upload deploy'));
  });

program
  .command('call')
  .description('Realiza una llamada telefónica de notificación')
  .option('-m, --message <message>', 'Mensaje a enviar')
  .action(async (options) => {
    const spinner = ora('Realizando llamada...').start();
    
    try {
      const notifier = new PhoneNotifier();
      await notifier.makeCall(options.message || 'Su despliegue ha sido completado');
      spinner.succeed(chalk.green('✓ Llamada realizada'));
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('duplicate-agent')
  .description('Duplica el sistema agéntico para crear nuevas instancias')
  .option('-n, --name <name>', 'Nombre del nuevo agente')
  .action(async (options) => {
    const spinner = ora('Duplicando sistema agéntico...').start();
    
    try {
      const agent = new AgentSystem();
      const newAgent = await agent.duplicate(options.name);
      
      spinner.succeed(chalk.green(`✓ Nuevo agente creado: ${newAgent.name}`));
      console.log(chalk.cyan(`Ubicación: ${newAgent.path}`));
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();

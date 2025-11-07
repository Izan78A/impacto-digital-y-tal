import { AgentSystem } from './system.js';
import chalk from 'chalk';

async function main() {
  console.log(chalk.bold.cyan('\n🤖 Agent System Runner\n'));
  
  const agent = new AgentSystem();
  
  // Get task from command line
  const task = process.argv[2] || 'list agents';
  
  if (task === 'list agents') {
    const agents = await agent.listAgents();
    console.log(chalk.green(`Found ${agents.length} agents:`));
    agents.forEach(a => {
      console.log(chalk.white(`  - ${a.name} (v${a.version})`));
    });
  } else {
    const result = await agent.executeTask(task, process.argv[3]);
    console.log(chalk.green('\n✓ Task completed:'));
    console.log(JSON.stringify(result, null, 2));
  }
}

main().catch(console.error);

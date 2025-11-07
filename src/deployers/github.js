import simpleGit from 'simple-git';
import axios from 'axios';
import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

config();

export class GitHubDeployer {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.username = process.env.GITHUB_USERNAME;
    this.apiUrl = 'https://api.github.com';
  }

  async deploy(projectPath) {
    const git = simpleGit(projectPath);
    
    // Get project name from directory
    const projectName = path.basename(projectPath);
    
    // Check if repository exists
    let repoExists = false;
    try {
      await axios.get(`${this.apiUrl}/repos/${this.username}/${projectName}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      repoExists = true;
    } catch (error) {
      // Repository doesn't exist
    }
    
    // Create repository if it doesn't exist
    if (!repoExists) {
      await axios.post(`${this.apiUrl}/user/repos`, {
        name: projectName,
        private: false,
        auto_init: false
      }, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
    }
    
    // Initialize git if needed
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
      await git.add('.');
      await git.commit('Initial commit');
    }
    
    // Add remote if not exists
    const remotes = await git.getRemotes();
    const originExists = remotes.some(r => r.name === 'origin');
    
    if (!originExists) {
      await git.addRemote('origin', `https://github.com/${this.username}/${projectName}.git`);
    }
    
    // Push to GitHub
    await git.push('origin', 'main', ['--set-upstream', '--force']);
    
    return {
      url: `https://github.com/${this.username}/${projectName}`,
      provider: 'github',
      status: 'success'
    };
  }

  async injectCommands(filePath, commands) {
    // Read the file
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Detect file type and inject appropriately
    const ext = path.extname(filePath);
    let newContent = content;
    
    if (ext === '.js' || ext === '.mjs') {
      // For JavaScript files, add commands as comments and executable code
      const injectedCode = `
// Auto-injected commands by Impacto Digital System
${commands.map(cmd => `// ${cmd}`).join('\n')}

// Executable commands
${commands.map(cmd => `console.log('Executing: ${cmd}');`).join('\n')}
`;
      newContent = injectedCode + '\n' + content;
    } else if (ext === '.py') {
      // For Python files
      const injectedCode = `
# Auto-injected commands by Impacto Digital System
${commands.map(cmd => `# ${cmd}`).join('\n')}

import subprocess
${commands.map((cmd, i) => `subprocess.run('${cmd}', shell=True)  # Command ${i + 1}`).join('\n')}
`;
      newContent = injectedCode + '\n' + content;
    }
    
    await fs.writeFile(filePath, newContent);
    
    return { success: true, file: filePath };
  }
}

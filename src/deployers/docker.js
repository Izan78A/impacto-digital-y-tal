import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);
config();

export class DockerDeployer {
  constructor() {
    this.username = process.env.DOCKER_USERNAME;
    this.password = process.env.DOCKER_PASSWORD;
  }

  async deploy(projectPath) {
    const projectName = path.basename(projectPath);
    const imageName = `${this.username}/${projectName}:latest`;
    
    // Check if Dockerfile exists
    const dockerfilePath = path.join(projectPath, 'Dockerfile');
    try {
      await fs.access(dockerfilePath);
    } catch (error) {
      // Create default Dockerfile
      await this.createDefaultDockerfile(dockerfilePath);
    }
    
    // Build Docker image
    console.log('Building Docker image...');
    await execAsync(`docker build -t ${imageName} ${projectPath}`);
    
    // Login to Docker Hub
    if (this.username && this.password) {
      console.log('Logging in to Docker Hub...');
      await execAsync(`echo "${this.password}" | docker login -u ${this.username} --password-stdin`);
      
      // Push to Docker Hub
      console.log('Pushing to Docker Hub...');
      await execAsync(`docker push ${imageName}`);
    }
    
    return {
      url: `https://hub.docker.com/r/${imageName}`,
      provider: 'docker',
      status: 'success',
      image: imageName
    };
  }

  async createDefaultDockerfile(dockerfilePath) {
    const defaultDockerfile = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
    await fs.writeFile(dockerfilePath, defaultDockerfile);
  }

  async createDockerCompose(projectPath, services) {
    const composeContent = {
      version: '3.8',
      services: {}
    };
    
    for (const service of services) {
      composeContent.services[service.name] = {
        build: service.build || '.',
        ports: service.ports || ['3000:3000'],
        environment: service.environment || []
      };
    }
    
    const composePath = path.join(projectPath, 'docker-compose.yml');
    await fs.writeFile(composePath, JSON.stringify(composeContent, null, 2));
    
    return { success: true, path: composePath };
  }
}

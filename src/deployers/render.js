import axios from 'axios';
import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

config();

export class RenderDeployer {
  constructor() {
    this.apiKey = process.env.RENDER_API_KEY;
    this.apiUrl = 'https://api.render.com/v1';
  }

  async deploy(projectPath) {
    const projectName = path.basename(projectPath);
    
    // Read deploy config if exists
    let deployConfig = {};
    try {
      const configContent = await fs.readFile(
        path.join(projectPath, 'deploy.config.json'),
        'utf-8'
      );
      deployConfig = JSON.parse(configContent);
    } catch (error) {
      // Use defaults
    }
    
    // Create or update service on Render
    const serviceData = {
      name: deployConfig.projectName || projectName,
      type: 'web',
      runtime: 'node',
      buildCommand: 'npm install',
      startCommand: 'npm start',
      envVars: []
    };
    
    try {
      const response = await axios.post(
        `${this.apiUrl}/services`,
        serviceData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return {
        url: response.data.service.url,
        provider: 'render',
        status: 'success',
        serviceId: response.data.service.id
      };
    } catch (error) {
      throw new Error(`Render deployment failed: ${error.message}`);
    }
  }

  async updateEnvironment(serviceId, envVars) {
    await axios.patch(
      `${this.apiUrl}/services/${serviceId}`,
      { envVars },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { success: true };
  }
}

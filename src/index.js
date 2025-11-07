import { Command } from 'commander';
import { config } from 'dotenv';

// Load environment variables
config();

// Re-export CLI
export { program } from './cli.js';

// Main entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Impacto Digital - Sistema de Deployment');
  console.log('Use: npm start -- <command> [options]');
  console.log('Para ayuda: npm start -- --help');
}

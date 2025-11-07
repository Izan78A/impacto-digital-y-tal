# API Reference - Impacto Digital

## CLI Commands

### `init`

Inicializa un nuevo proyecto con configuración para deployment.

```bash
npm start -- init
```

**Opciones interactivas:**
- Project name
- Cloud provider (GitHub, Render, Supabase, Docker)
- Use Docker (yes/no)
- Enable agentic system (yes/no)

**Output:**
- Creates project directory
- Generates `deploy.config.json`
- Creates `Dockerfile` if Docker enabled
- Creates `agent.config.json` if agent enabled

---

### `deploy`

Despliega un proyecto a un proveedor de nube.

```bash
npm start -- deploy [options]
```

**Options:**
- `-p, --provider <provider>` - Cloud provider (github, render, supabase, docker)
- `-d, --directory <directory>` - Project directory (default: current directory)
- `-n, --notify` - Send phone notification on completion

**Examples:**
```bash
# Deploy to GitHub
npm start -- deploy --provider github

# Deploy to Render with notification
npm start -- deploy --provider render --notify

# Deploy specific directory to Docker
npm start -- deploy --provider docker --directory ./my-app
```

**Returns:**
```json
{
  "url": "https://github.com/username/project",
  "provider": "github",
  "status": "success"
}
```

---

### `agent`

Ejecuta el sistema agéntico para modificar código automáticamente.

```bash
npm start -- agent [options]
```

**Options:**
- `-t, --task <task>` - Task description
- `-f, --file <file>` - File to modify

**Examples:**
```bash
# Inject commands
npm start -- agent --task "inject npm install command" --file ./build.js

# Create new file
npm start -- agent --task "create new component" --file ./src/component.js

# Modify existing file
npm start -- agent --task "modify exports" --file ./index.js
```

**Returns:**
```json
{
  "task": "inject npm install command",
  "changes": [
    {
      "type": "inject_command",
      "file": "./build.js",
      "commands": ["npm install"],
      "status": "success"
    }
  ],
  "status": "completed"
}
```

---

### `call`

Realiza una llamada telefónica de notificación.

```bash
npm start -- call [options]
```

**Options:**
- `-m, --message <message>` - Message to speak

**Example:**
```bash
npm start -- call --message "Deployment completed successfully"
```

**Returns:**
```json
{
  "success": true,
  "callId": "CA1234567890abcdef"
}
```

---

### `duplicate-agent`

Duplica el sistema agéntico para crear nuevas instancias.

```bash
npm start -- duplicate-agent [options]
```

**Options:**
- `-n, --name <name>` - Name for the new agent

**Example:**
```bash
npm start -- duplicate-agent --name MyCustomAgent
```

**Returns:**
```json
{
  "name": "MyCustomAgent",
  "path": "/path/to/agents/MyCustomAgent",
  "status": "created"
}
```

---

## JavaScript API

You can also use Impacto Digital programmatically:

### GitHubDeployer

```javascript
import { GitHubDeployer } from './src/deployers/github.js';

const deployer = new GitHubDeployer();
const result = await deployer.deploy('/path/to/project');
console.log(result.url);
```

**Methods:**

#### `deploy(projectPath)`
Deploys project to GitHub.

**Parameters:**
- `projectPath` (string) - Path to project directory

**Returns:** Promise<Object>
```javascript
{
  url: "https://github.com/username/project",
  provider: "github",
  status: "success"
}
```

#### `injectCommands(filePath, commands)`
Injects commands into a file.

**Parameters:**
- `filePath` (string) - Path to file
- `commands` (Array<string>) - Commands to inject

**Returns:** Promise<Object>
```javascript
{
  success: true,
  file: "/path/to/file.js"
}
```

---

### RenderDeployer

```javascript
import { RenderDeployer } from './src/deployers/render.js';

const deployer = new RenderDeployer();
const result = await deployer.deploy('/path/to/project');
```

**Methods:**

#### `deploy(projectPath)`
Deploys project to Render.

**Returns:** Promise<Object>
```javascript
{
  url: "https://myapp.onrender.com",
  provider: "render",
  status: "success",
  serviceId: "srv-123456"
}
```

#### `updateEnvironment(serviceId, envVars)`
Updates environment variables for a service.

**Parameters:**
- `serviceId` (string) - Render service ID
- `envVars` (Array<Object>) - Environment variables

**Returns:** Promise<Object>

---

### SupabaseDeployer

```javascript
import { SupabaseDeployer } from './src/deployers/supabase.js';

const deployer = new SupabaseDeployer();
const result = await deployer.deploy('/path/to/project');
```

**Methods:**

#### `deploy(projectPath)`
Deploys functions to Supabase.

#### `deployFunction(name, code)`
Deploys a specific function.

#### `setupDatabase(schema)`
Sets up database schema.

---

### DockerDeployer

```javascript
import { DockerDeployer } from './src/deployers/docker.js';

const deployer = new DockerDeployer();
const result = await deployer.deploy('/path/to/project');
```

**Methods:**

#### `deploy(projectPath)`
Builds and pushes Docker image.

**Returns:** Promise<Object>
```javascript
{
  url: "https://hub.docker.com/r/username/project",
  provider: "docker",
  status: "success",
  image: "username/project:latest"
}
```

#### `createDefaultDockerfile(dockerfilePath)`
Creates a default Dockerfile.

#### `createDockerCompose(projectPath, services)`
Creates a docker-compose.yml file.

---

### AgentSystem

```javascript
import { AgentSystem } from './src/agent/system.js';

const agent = new AgentSystem();
```

**Methods:**

#### `executeTask(task, filePath)`
Executes an agentic task.

**Parameters:**
- `task` (string) - Task description
- `filePath` (string) - File to operate on

**Returns:** Promise<Object>
```javascript
{
  task: "inject commands",
  changes: [...],
  status: "completed"
}
```

#### `duplicate(name)`
Creates a new agent instance.

**Parameters:**
- `name` (string) - Name for new agent

**Returns:** Promise<Object>
```javascript
{
  name: "NewAgent",
  path: "/path/to/agents/NewAgent",
  status: "created"
}
```

#### `listAgents()`
Lists all available agents.

**Returns:** Promise<Array>

---

### PhoneNotifier

```javascript
import { PhoneNotifier } from './src/utils/phone.js';

const notifier = new PhoneNotifier();
```

**Methods:**

#### `sendDeploymentNotification(provider, url)`
Sends deployment notification via SMS.

**Parameters:**
- `provider` (string) - Cloud provider name
- `url` (string) - Deployment URL

**Returns:** Promise<Object>
```javascript
{
  success: true,
  messageId: "SM1234567890",
  provider: "github"
}
```

#### `makeCall(message)`
Makes a phone call with voice message.

**Parameters:**
- `message` (string) - Message to speak

**Returns:** Promise<Object>
```javascript
{
  success: true,
  callId: "CA1234567890"
}
```

#### `sendSMS(message)`
Sends an SMS message.

**Parameters:**
- `message` (string) - Message text

**Returns:** Promise<Object>

---

## Configuration Files

### deploy.config.json

```json
{
  "projectName": "my-project",
  "provider": "github",
  "docker": true,
  "agent": true
}
```

**Fields:**
- `projectName` - Project name
- `provider` - Default cloud provider
- `docker` - Enable Docker support
- `agent` - Enable agentic system

### agent.config.json

```json
{
  "enabled": true,
  "tasks": [],
  "autoCommands": true,
  "capabilities": [
    "code_modification",
    "command_injection",
    "deployment",
    "analysis"
  ]
}
```

**Fields:**
- `enabled` - Enable/disable agent
- `tasks` - Predefined tasks
- `autoCommands` - Auto-execute injected commands
- `capabilities` - Agent capabilities

---

## Environment Variables

All environment variables are loaded from `.env` file:

```env
# GitHub
GITHUB_TOKEN=...
GITHUB_USERNAME=...

# Render
RENDER_API_KEY=...

# Supabase
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_PROJECT_ID=...

# Docker
DOCKER_USERNAME=...
DOCKER_PASSWORD=...

# Twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
NOTIFICATION_PHONE_NUMBER=...
```

---

## Error Handling

All methods return promises and can throw errors:

```javascript
try {
  const result = await deployer.deploy('/path/to/project');
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
}
```

Common errors:
- `GitHub token invalid` - Check GITHUB_TOKEN
- `Render deployment failed` - Check RENDER_API_KEY
- `Twilio not configured` - Check Twilio credentials
- `Docker not found` - Install Docker

---

## Task Types for Agent System

The agent recognizes these task keywords:

- `add`, `crear` → Create new file
- `modify`, `modificar` → Modify existing file
- `command`, `comando` → Inject commands
- `deploy`, `desplegar` → Auto-deploy

**Examples:**
```bash
# These all work:
"add npm install command"
"crear nuevo archivo"
"modificar código"
"inject docker build command"
```

---

## Command Injection

The agent can inject commands into:

**JavaScript files (.js, .mjs):**
```javascript
// Auto-injected commands by Agent System
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runAutoCommands() {
  await execAsync('npm install');
  await execAsync('git push');
}
```

**Python files (.py):**
```python
# Auto-injected commands by Agent System
import subprocess

def run_auto_commands():
    subprocess.run('pip install -r requirements.txt', shell=True)
```

---

## Status Codes

All operations return status information:

- `success` - Operation completed successfully
- `error` - Operation failed
- `initiated` - Operation started (async)
- `completed` - Task completed by agent
- `created` - Resource created

---

For more examples, see [USAGE.md](USAGE.md) and [GETTING_STARTED.md](GETTING_STARTED.md).

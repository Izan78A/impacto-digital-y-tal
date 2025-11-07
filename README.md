# Impacto Digital - Sistema de Subida y Gestión de Proyectos

🚀 **Sistema completo para subir proyectos locales a la nube y gestionar productos digitales**

## 📋 Características

- ✅ Despliegue automático a múltiples plataformas (GitHub, Render, Supabase, Docker)
- 🤖 Sistema agéntico para modificación automática de código
- 📞 Notificaciones telefónicas vía SMS y llamadas
- 🔧 Inyección automática de comandos en código
- 📦 Soporte para Docker y contenedores
- 🔄 Duplicación de sistemas agénticos
- 🎯 CLI intuitivo y fácil de usar

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Izan78A/impacto-digital-y-tal.git
cd impacto-digital-y-tal

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

## ⚙️ Configuración

Edita el archivo `.env` con tus credenciales:

```env
# GitHub
GITHUB_TOKEN=tu_token_de_github
GITHUB_USERNAME=tu_usuario

# Render
RENDER_API_KEY=tu_api_key_de_render

# Supabase
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_key_de_supabase

# Docker Hub
DOCKER_USERNAME=tu_usuario_docker
DOCKER_PASSWORD=tu_password_docker

# Twilio (para notificaciones)
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_PHONE_NUMBER=tu_numero_twilio
NOTIFICATION_PHONE_NUMBER=tu_numero_personal
```

## 📖 Uso

### Inicializar un nuevo proyecto

```bash
npm start -- init
```

Esto te guiará por un proceso interactivo para configurar tu proyecto.

### Desplegar a la nube

```bash
# Desplegar a GitHub
npm start -- deploy --provider github

# Desplegar a Render
npm start -- deploy --provider render

# Desplegar a Supabase
npm start -- deploy --provider supabase

# Desplegar a Docker Hub
npm start -- deploy --provider docker

# Desplegar con notificación telefónica
npm start -- deploy --provider github --notify
```

### Sistema Agéntico

El sistema agéntico puede modificar código automáticamente:

```bash
# Ejecutar una tarea con el agente
npm start -- agent --task "add npm install command" --file ./src/app.js

# Duplicar el sistema agéntico
npm start -- duplicate-agent --name MiNuevoAgente
```

### Notificaciones Telefónicas

```bash
# Enviar una llamada de notificación
npm start -- call --message "Tu proyecto está listo"
```

## 🤖 Sistema Agéntico

El sistema agéntico puede realizar las siguientes tareas automáticamente:

1. **Crear archivos**: Genera nuevos archivos con código base
2. **Modificar código**: Actualiza archivos existentes
3. **Inyectar comandos**: Añade comandos de bash/shell en tus archivos
4. **Desplegar automáticamente**: Inicia despliegues basados en tareas

### Ejemplo de uso del agente

```bash
# El agente puede añadir comandos automáticamente
npm start -- agent --task "inject npm install and git push commands" --file ./deploy.js

# El agente puede crear nuevos archivos
npm start -- agent --task "create new component" --file ./src/components/NewComponent.js
```

### Duplicar agentes

Puedes crear múltiples instancias del sistema agéntico:

```bash
npm start -- duplicate-agent --name AgenteDesplieguePro
npm start -- duplicate-agent --name AgenteAnalisisCode
```

Cada agente duplicado tendrá su propio directorio en `agents/` con:
- `index.js` - Código del agente
- `config.json` - Configuración del agente

## 📦 Estructura del Proyecto

```
impacto-digital-y-tal/
├── src/
│   ├── cli.js              # CLI principal
│   ├── agent/
│   │   ├── system.js       # Sistema agéntico
│   │   └── runner.js       # Ejecutador de agentes
│   ├── deployers/
│   │   ├── github.js       # Deployer para GitHub
│   │   ├── render.js       # Deployer para Render
│   │   ├── supabase.js     # Deployer para Supabase
│   │   └── docker.js       # Deployer para Docker
│   ├── utils/
│   │   └── phone.js        # Utilidad de notificaciones
│   └── templates/
│       └── agent-template.js  # Plantilla para agentes
├── package.json
├── .env.example
└── README.md
```

## 🎯 Casos de Uso

### 1. Subir un proyecto a GitHub

```bash
cd mi-proyecto
npm start -- deploy --provider github
```

### 2. Crear proyecto con Docker y desplegarlo

```bash
npm start -- init
# Seleccionar Docker en las opciones
npm start -- deploy --provider docker
```

### 3. Sistema agéntico que inyecta comandos

```bash
npm start -- agent --task "add docker build and push commands" --file ./build.js
```

### 4. Recibir notificación cuando el deploy termine

```bash
npm start -- deploy --provider render --notify
```

## 🔧 Capacidades del Sistema Agéntico

El sistema puede insertar comandos automáticamente en archivos JavaScript y Python:

**JavaScript:**
```javascript
// Auto-injected commands by Agent System
// Command: npm install
// Command: git push

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runAutoCommands() {
  await execAsync('npm install');
  await execAsync('git push');
}
```

**Python:**
```python
# Auto-injected commands by Agent System
# Command: pip install -r requirements.txt

import subprocess

def run_auto_commands():
    subprocess.run('pip install -r requirements.txt', shell=True)
```

## 📞 Notificaciones Telefónicas

El sistema puede enviarte notificaciones vía:

- **SMS**: Mensajes de texto cuando los deployments se completen
- **Llamadas**: Llamadas telefónicas con mensajes de voz en español

Configuración requerida:
1. Cuenta de Twilio
2. Número de teléfono de Twilio
3. Tu número personal para recibir notificaciones

## 🔐 Seguridad

- Nunca subas tu archivo `.env` al repositorio
- Usa variables de entorno para todas las credenciales
- Los tokens y claves API deben mantenerse seguros
- El archivo `.gitignore` ya incluye `.env` para evitar commits accidentales

## 🚀 Integraciones Soportadas

### GitHub
- Creación automática de repositorios
- Push de código
- Inyección de comandos en archivos

### Render
- Creación de servicios web
- Configuración de variables de entorno
- Deployment automático

### Supabase
- Deployment de funciones serverless
- Configuración de base de datos
- Edge functions

### Docker
- Build de imágenes
- Push a Docker Hub
- Creación de docker-compose

## 📚 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `init` | Inicializa un nuevo proyecto |
| `deploy` | Despliega a la nube |
| `agent` | Ejecuta el sistema agéntico |
| `call` | Realiza una llamada telefónica |
| `duplicate-agent` | Duplica el sistema agéntico |

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT

## 👤 Autor

Izan78A

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Abre un issue en GitHub
3. Contacta al autor

---

**¡Hecho con ❤️ para facilitar el deployment de tus proyectos digitales!**
# Guía de Uso - Impacto Digital

## Inicio Rápido

### 1. Instalación

```bash
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales.

### 2. Primer Deployment

```bash
# Inicializar proyecto
npm start -- init

# Seguir las instrucciones interactivas
# Luego desplegar:
npm start -- deploy --provider github
```

## Ejemplos Detallados

### Ejemplo 1: Proyecto Node.js a GitHub

```bash
# En el directorio de tu proyecto
cd mi-app-nodejs

# Crear configuración
cat > deploy.config.json << EOF
{
  "projectName": "mi-app-nodejs",
  "provider": "github",
  "docker": true,
  "agent": true
}
EOF

# Desplegar
npx impacto-upload deploy --provider github --notify
```

### Ejemplo 2: Usar el Agente para Inyectar Comandos

```bash
# Crear un archivo de build
echo "console.log('Building...');" > build.js

# Hacer que el agente inyecte comandos
npm start -- agent --task "inject npm install and docker build commands" --file ./build.js

# Ver el resultado
cat build.js
```

### Ejemplo 3: Sistema Multi-Agente

```bash
# Crear agente para deployment
npm start -- duplicate-agent --name DeploymentAgent

# Crear agente para testing
npm start -- duplicate-agent --name TestingAgent

# Crear agente para análisis
npm start -- duplicate-agent --name AnalysisAgent

# Ver agentes creados
npm run agent "list agents"
```

### Ejemplo 4: Pipeline Completo

```bash
# 1. Inicializar proyecto
npm start -- init

# 2. Inyectar comandos de build con el agente
npm start -- agent --task "inject npm run build command" --file ./src/index.js

# 3. Construir imagen Docker
npm start -- deploy --provider docker

# 4. Subir a GitHub
npm start -- deploy --provider github

# 5. Desplegar a Render con notificación
npm start -- deploy --provider render --notify
```

## Uso Avanzado

### Variables de Entorno Personalizadas

Puedes crear archivos `.env` específicos para cada entorno:

```bash
.env.development
.env.production
.env.staging
```

### Hooks Pre/Post Deployment

El sistema permite ejecutar scripts antes y después del deployment:

```json
{
  "hooks": {
    "pre-deploy": "npm run test",
    "post-deploy": "npm run notify-team"
  }
}
```

### Configuración Avanzada del Agente

Crea un archivo `agent.config.json`:

```json
{
  "enabled": true,
  "tasks": [
    {
      "name": "auto-build",
      "trigger": "on-save",
      "action": "inject",
      "commands": ["npm run build"]
    },
    {
      "name": "auto-test",
      "trigger": "pre-deploy",
      "action": "execute",
      "commands": ["npm test"]
    }
  ],
  "autoCommands": true,
  "notifications": {
    "onSuccess": true,
    "onError": true
  }
}
```

## Troubleshooting

### Error: GitHub token inválido

Solución:
```bash
# Generar nuevo token en GitHub
# Settings -> Developer settings -> Personal access tokens
# Actualizar .env
GITHUB_TOKEN=tu_nuevo_token
```

### Error: Twilio no configurado

Solución:
```bash
# Si no necesitas notificaciones telefónicas, omite --notify
npm start -- deploy --provider github

# O configura Twilio en .env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

### Error: Docker no encontrado

Solución:
```bash
# Instalar Docker
# Linux: sudo apt install docker.io
# Mac: brew install docker
# Windows: Docker Desktop
```

## Best Practices

1. **Siempre haz backup** antes de deployments importantes
2. **Usa .gitignore** para excluir node_modules y .env
3. **Configura notificaciones** para deployments de producción
4. **Prueba localmente** antes de desplegar
5. **Usa el sistema agéntico** para automatizar tareas repetitivas

## Integración con CI/CD

### GitHub Actions

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: |
          npm install
          npm start -- deploy --provider render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
```

### GitLab CI

```yaml
deploy:
  script:
    - npm install
    - npm start -- deploy --provider github
  only:
    - main
```

## Recursos Adicionales

- [Documentación de GitHub API](https://docs.github.com/rest)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [Twilio API](https://www.twilio.com/docs)

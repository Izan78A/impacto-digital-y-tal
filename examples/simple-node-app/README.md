# Simple Node App Example

Este es un proyecto de ejemplo que demuestra cómo usar Impacto Digital para desplegar aplicaciones.

## Uso

Desde el directorio raíz de impacto-digital-y-tal:

```bash
# Desplegar este ejemplo a GitHub
npm start -- deploy --provider github --directory ./examples/simple-node-app

# O usar el agente para inyectar comandos
npm start -- agent --task "inject npm start command" --file ./examples/simple-node-app/index.js
```

## Características

- ✅ Configuración simple
- ✅ Lista para Docker
- ✅ Compatible con todos los providers
- ✅ Ejemplo de deploy.config.json

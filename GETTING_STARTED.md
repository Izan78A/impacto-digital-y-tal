# 🚀 Guía de Inicio Rápido - Impacto Digital

## ¿Qué es Impacto Digital?

Impacto Digital es un sistema completo que te permite:

1. **Subir proyectos locales a la nube** - GitHub, Render, Supabase, Docker Hub
2. **Automatizar despliegues** - Con un solo comando
3. **Modificar código automáticamente** - Sistema agéntico inteligente
4. **Recibir notificaciones** - Por SMS o llamada telefónica
5. **Duplicar sistemas agénticos** - Crear múltiples instancias

## 🎯 Problema que Resuelve

Si trabajas con productos digitales creados en:
- ✅ Codex y Gemini CLI
- ✅ Docker
- ✅ Render
- ✅ Supabase
- ✅ GitHub

Y necesitas:
- ❌ Subir proyectos manualmente cada vez
- ❌ Recordar todos los comandos de deployment
- ❌ Configurar cada servicio por separado
- ❌ No tienes tiempo para automatizar

**Impacto Digital lo hace por ti automáticamente!**

## ⚡ Instalación en 3 Pasos

### Paso 1: Clonar e Instalar

```bash
git clone https://github.com/Izan78A/impacto-digital-y-tal.git
cd impacto-digital-y-tal
npm install
```

### Paso 2: Configurar Credenciales

```bash
cp .env.example .env
nano .env  # O usa tu editor favorito
```

Configura al menos una de estas opciones:

**Para GitHub** (recomendado para empezar):
```env
GITHUB_TOKEN=ghp_tu_token_aqui
GITHUB_USERNAME=tu_usuario
```

**Para Render**:
```env
RENDER_API_KEY=tu_api_key
```

**Para notificaciones telefónicas** (opcional):
```env
TWILIO_ACCOUNT_SID=tu_sid
TWILIO_AUTH_TOKEN=tu_token
TWILIO_PHONE_NUMBER=+1234567890
NOTIFICATION_PHONE_NUMBER=+0987654321
```

### Paso 3: ¡Primer Deployment!

```bash
# Inicializar un proyecto de prueba
npm start -- init

# Seguir las instrucciones
# Nombre del proyecto: mi-primer-proyecto
# Proveedor: GitHub
# ¿Usar Docker?: Sí
# ¿Sistema agéntico?: Sí

# ¡Desplegar!
cd mi-primer-proyecto
npm start -- deploy --provider github
```

## 📚 Casos de Uso Principales

### Caso 1: Subir Código a GitHub

```bash
# Estás en tu proyecto
cd /ruta/a/tu/proyecto

# Un comando y listo
npx impacto-upload deploy --provider github

# ✅ Crea el repositorio si no existe
# ✅ Hace commit de todo
# ✅ Push a GitHub
# ✅ Te da la URL
```

### Caso 2: El Sistema Agéntico Inyecta Comandos

Imagina que necesitas que un script ejecute comandos pero no quieres escribirlos manualmente:

```bash
# Tu archivo actual: build.js
console.log('Building...');

# Usa el agente
npm start -- agent --task "inject npm install and docker build commands" --file ./build.js

# Ahora build.js tiene:
# - Los comandos inyectados
# - Código para ejecutarlos
# - Todo listo para funcionar
```

### Caso 3: Deployment con Notificación

```bash
# Deploya y recibe un SMS cuando termine
npm start -- deploy --provider render --notify

# Recibirás:
# 📱 SMS: "Su proyecto ha sido desplegado exitosamente a render. URL: https://..."
```

### Caso 4: Llamada Telefónica

```bash
# Hace una llamada con mensaje de voz
npm start -- call --message "El deployment de producción está completo"

# Recibirás:
# 📞 Llamada con mensaje en español
```

### Caso 5: Duplicar Agentes

```bash
# Crear agente especializado en testing
npm start -- duplicate-agent --name TestingAgent

# Crear agente para deployment
npm start -- duplicate-agent --name DeployAgent

# Ver todos los agentes
npm run agent "list agents"
```

## 🎓 Tutorial: Proyecto Completo

Vamos a crear y desplegar un proyecto desde cero:

```bash
# 1. Crear directorio
mkdir mi-app-increible
cd mi-app-increible

# 2. Inicializar con Impacto Digital
npx impacto-upload init
# Nombre: mi-app-increible
# Proveedor: GitHub
# Docker: Sí
# Agente: Sí

# 3. Crear tu aplicación
cat > app.js << 'EOF'
console.log('¡Hola desde mi app increíble!');
const port = process.env.PORT || 3000;
console.log(`Escuchando en puerto ${port}`);
EOF

# 4. El agente puede inyectar comandos si lo necesitas
npx impacto-upload agent --task "inject npm start command" --file ./app.js

# 5. Desplegar a GitHub
npx impacto-upload deploy --provider github

# 6. Construir Docker
npx impacto-upload deploy --provider docker

# 7. Desplegar a Render con notificación
npx impacto-upload deploy --provider render --notify

# ✅ ¡Listo! Tu app está en la nube
```

## 🔑 Obtener Credenciales

### GitHub Token

1. Ve a https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Selecciona scopes: `repo`, `workflow`
4. Copia el token a `.env`

### Render API Key

1. Ve a https://dashboard.render.com/
2. Settings → API Keys
3. Create API Key
4. Copia a `.env`

### Supabase

1. Ve a https://app.supabase.com/
2. Selecciona tu proyecto
3. Settings → API
4. Copia URL y anon/service key

### Docker Hub

1. Tu username de Docker Hub
2. Tu password o access token
3. Añádelos a `.env`

### Twilio (Opcional)

1. Crea cuenta en https://www.twilio.com/
2. Console → Account → Keys & Credentials
3. Compra un número de teléfono
4. Copia SID, Token y números a `.env`

## ❓ Preguntas Frecuentes

**P: ¿Necesito configurar TODO?**
R: No! Solo configura lo que vayas a usar. Para empezar, solo GitHub es suficiente.

**P: ¿El sistema agéntico requiere IA?**
R: No, funciona con reglas predefinidas. Puedes extenderlo con IA si quieres.

**P: ¿Las notificaciones telefónicas son obligatorias?**
R: No, son completamente opcionales. Solo úsalas si las necesitas.

**P: ¿Puedo usar esto en producción?**
R: Sí, pero revisa siempre el código antes de desplegar.

**P: ¿Funciona con otros lenguajes además de Node.js?**
R: El sistema está optimizado para Node.js, pero puedes adaptarlo para Python, Go, etc.

## 🆘 Solución de Problemas

### "npm start no funciona"

```bash
# Asegúrate de estar en el directorio correcto
cd /home/runner/work/impacto-digital-y-tal/impacto-digital-y-tal

# Verifica que package.json existe
ls -la package.json

# Instala dependencias
npm install
```

### "GitHub token inválido"

```bash
# Verifica que el token tenga los permisos correctos
# Debe incluir: repo, workflow

# Regenera el token si es necesario
```

### "Twilio error"

```bash
# Si no usas notificaciones, no incluyas --notify
npm start -- deploy --provider github

# Si quieres usarlas, verifica:
# - Account SID correcto
# - Auth Token correcto
# - Números en formato internacional (+1234567890)
```

## 📖 Próximos Pasos

1. Lee [USAGE.md](USAGE.md) para casos de uso avanzados
2. Mira el ejemplo en `examples/simple-node-app/`
3. Experimenta con el sistema agéntico
4. Crea tus propios agentes duplicados
5. Automatiza tus deployments

## 🎉 ¡Listo!

Ya tienes todo lo necesario para empezar a subir tus proyectos a la nube automáticamente.

**Comando más importante:**
```bash
npm start -- deploy --provider github
```

¡Eso es todo! 🚀

---

**Hecho con ❤️ por Izan78A**

¿Problemas? Abre un issue en GitHub
¿Sugerencias? Pull requests son bienvenidos

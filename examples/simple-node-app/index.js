// Simple Node.js Application
// Este es un ejemplo de aplicación que puede ser desplegada usando Impacto Digital

console.log('🚀 Aplicación iniciando...');

const PORT = process.env.PORT || 3000;

// Simular un servidor simple
console.log(`✅ Servidor escuchando en puerto ${PORT}`);
console.log('📦 Aplicación lista para deployment');

// Mensaje de ejemplo
setInterval(() => {
  console.log(`⏰ App funcionando - ${new Date().toLocaleString()}`);
}, 5000);

// Mantener el proceso activo
process.on('SIGTERM', () => {
  console.log('👋 Cerrando aplicación...');
  process.exit(0);
});

#!/bin/bash

# Verification script for Impacto Digital system
# This script verifies that all components are in place

echo "🔍 Verificando Sistema Impacto Digital..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
CHECKS_PASSED=0
CHECKS_TOTAL=0

# Function to check file exists
check_file() {
    CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 existe"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO existe"
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directorio $1 existe"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} Directorio $1 NO existe"
        return 1
    fi
}

echo "📁 Verificando estructura de archivos..."
echo ""

# Core files
check_file "package.json"
check_file ".env.example"
check_file ".gitignore"
check_file "Dockerfile"
check_file "docker-compose.yml"
check_file "LICENSE"

echo ""
echo "📚 Verificando documentación..."
echo ""

check_file "README.md"
check_file "GETTING_STARTED.md"
check_file "USAGE.md"
check_file "API.md"
check_file "CHANGELOG.md"

echo ""
echo "🔧 Verificando código fuente..."
echo ""

# Source directories
check_dir "src"
check_dir "src/agent"
check_dir "src/deployers"
check_dir "src/utils"
check_dir "src/templates"

# Source files
check_file "src/index.js"
check_file "src/cli.js"
check_file "src/agent/system.js"
check_file "src/agent/runner.js"
check_file "src/deployers/github.js"
check_file "src/deployers/render.js"
check_file "src/deployers/supabase.js"
check_file "src/deployers/docker.js"
check_file "src/utils/phone.js"
check_file "src/templates/agent-template.js"

echo ""
echo "📦 Verificando ejemplos..."
echo ""

check_dir "examples"
check_dir "examples/simple-node-app"
check_file "examples/simple-node-app/package.json"
check_file "examples/simple-node-app/index.js"
check_file "examples/simple-node-app/deploy.config.json"

echo ""
echo "🔐 Verificando configuración de seguridad..."
echo ""

# Check .gitignore contains important entries
if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
    echo -e "${GREEN}✓${NC} .gitignore contiene entradas de seguridad"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}✗${NC} .gitignore falta entradas de seguridad"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

# Check .env.example exists but .env doesn't (shouldn't be committed)
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC}  ADVERTENCIA: .env existe (no debería estar en el repo)"
else
    echo -e "${GREEN}✓${NC} .env no está en el repositorio (correcto)"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

echo ""
echo "📊 Verificando package.json..."
echo ""

# Check package.json has required scripts
if grep -q '"start"' package.json && grep -q '"deploy"' package.json && grep -q '"agent"' package.json; then
    echo -e "${GREEN}✓${NC} Scripts npm configurados correctamente"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}✗${NC} Faltan scripts en package.json"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

# Check dependencies
if grep -q '"commander"' package.json && grep -q '"twilio"' package.json && grep -q '"simple-git"' package.json; then
    echo -e "${GREEN}✓${NC} Dependencias principales incluidas"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}✗${NC} Faltan dependencias importantes"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

echo ""
echo "=" "===========================================" "="
echo ""

# Calculate percentage
PERCENTAGE=$((CHECKS_PASSED * 100 / CHECKS_TOTAL))

if [ $CHECKS_PASSED -eq $CHECKS_TOTAL ]; then
    echo -e "${GREEN}✅ TODOS LOS CHECKS PASARON${NC}"
    echo "   $CHECKS_PASSED de $CHECKS_TOTAL verificaciones exitosas (${PERCENTAGE}%)"
    echo ""
    echo "🎉 Sistema listo para usar!"
    echo ""
    echo "Próximos pasos:"
    echo "  1. cp .env.example .env"
    echo "  2. Edita .env con tus credenciales"
    echo "  3. npm install"
    echo "  4. npm start -- init"
    exit 0
else
    echo -e "${YELLOW}⚠ ALGUNAS VERIFICACIONES FALLARON${NC}"
    echo "   $CHECKS_PASSED de $CHECKS_TOTAL verificaciones exitosas (${PERCENTAGE}%)"
    echo ""
    echo "Por favor verifica los archivos faltantes arriba."
    exit 1
fi

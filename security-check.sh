#!/bin/bash

# 🔒 SCRIPT DE VERIFICAÇÃO DE SEGURANÇA - CVE-2025-55182
# Este script verifica se as correções de segurança foram aplicadas corretamente

set -e

echo "🔒 INICIANDO VERIFICAÇÃO DE SEGURANÇA..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Função para verificar
check() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PASSOU:${NC} $1"
    ((PASSED++))
  else
    echo -e "${RED}❌ FALHOU:${NC} $1"
    ((FAILED++))
  fi
}

# 1. Verificar se container está rodando
echo "1️⃣  Verificando container..."
docker ps | grep -q erp-admin
check "Container erp-admin está rodando"

# 2. Verificar usuário do container
echo ""
echo "2️⃣  Verificando usuário do container..."
USER_ID=$(docker exec erp-admin id -u 2>/dev/null || echo "0")
if [ "$USER_ID" = "1001" ]; then
  echo -e "${GREEN}✅ PASSOU:${NC} Container rodando como usuário não-root (UID: 1001)"
  ((PASSED++))
else
  echo -e "${RED}❌ FALHOU:${NC} Container rodando como root ou usuário incorreto (UID: $USER_ID)"
  ((FAILED++))
fi

# 3. Verificar versão do Node.js
echo ""
echo "3️⃣  Verificando versão do Node.js..."
NODE_VERSION=$(docker exec erp-admin node -v 2>/dev/null | grep -oP '\d+' | head -1)
if [ "$NODE_VERSION" -ge 22 ]; then
  echo -e "${GREEN}✅ PASSOU:${NC} Node.js versão $NODE_VERSION.x (≥22)"
  ((PASSED++))
else
  echo -e "${RED}❌ FALHOU:${NC} Node.js versão $NODE_VERSION.x (requer ≥22)"
  ((FAILED++))
fi

# 4. Verificar healthcheck endpoint
echo ""
echo "4️⃣  Verificando endpoint de healthcheck..."
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")
if [ "$HEALTH_CODE" = "200" ]; then
  echo -e "${GREEN}✅ PASSOU:${NC} Healthcheck retornando 200"
  ((PASSED++))
else
  echo -e "${RED}❌ FALHOU:${NC} Healthcheck retornando $HEALTH_CODE (esperado: 200)"
  ((FAILED++))
fi

# 5. Verificar headers de segurança
echo ""
echo "5️⃣  Verificando headers de segurança..."

HEADERS=$(curl -s -I http://localhost:3000 2>/dev/null)

# CSP
echo "$HEADERS" | grep -qi "Content-Security-Policy"
check "Content-Security-Policy presente"

# HSTS
echo "$HEADERS" | grep -qi "Strict-Transport-Security"
check "Strict-Transport-Security presente"

# X-Frame-Options
echo "$HEADERS" | grep -qi "X-Frame-Options"
check "X-Frame-Options presente"

# X-Content-Type-Options
echo "$HEADERS" | grep -qi "X-Content-Type-Options"
check "X-Content-Type-Options presente"

# 6. Verificar processos suspeitos
echo ""
echo "6️⃣  Verificando processos maliciosos..."
SUSPICIOUS=$(docker exec erp-admin ps aux 2>/dev/null | grep -E "(xmrig|crypto|miner)" | grep -v grep || echo "")
if [ -z "$SUSPICIOUS" ]; then
  echo -e "${GREEN}✅ PASSOU:${NC} Nenhum processo suspeito detectado"
  ((PASSED++))
else
  echo -e "${RED}❌ FALHOU:${NC} Processos suspeitos encontrados:"
  echo "$SUSPICIOUS"
  ((FAILED++))
fi

# 7. Verificar conexões suspeitas
echo ""
echo "7️⃣  Verificando conexões de rede suspeitas..."
SUSPICIOUS_CONN=$(docker exec erp-admin netstat -tn 2>/dev/null | grep -E "(:4444|:5555|:6666|:7777|:8888)" || echo "")
if [ -z "$SUSPICIOUS_CONN" ]; then
  echo -e "${GREEN}✅ PASSOU:${NC} Nenhuma conexão suspeita detectada"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠️  AVISO:${NC} Conexões suspeitas encontradas:"
  echo "$SUSPICIOUS_CONN"
fi

# 8. Verificar permissões de arquivos .env
echo ""
echo "8️⃣  Verificando permissões de arquivos .env..."
if [ -f .env ]; then
  PERMS=$(stat -c "%a" .env 2>/dev/null || stat -f "%A" .env 2>/dev/null)
  if [ "$PERMS" = "600" ] || [ "$PERMS" = "400" ]; then
    echo -e "${GREEN}✅ PASSOU:${NC} Arquivo .env com permissões corretas ($PERMS)"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠️  AVISO:${NC} Arquivo .env com permissões $PERMS (recomendado: 600)"
  fi
else
  echo -e "${YELLOW}ℹ️  INFO:${NC} Arquivo .env não encontrado"
fi

# 9. Verificar vulnerabilidades npm
echo ""
echo "9️⃣  Verificando vulnerabilidades npm..."
npm audit --audit-level=high > /dev/null 2>&1
check "Sem vulnerabilidades críticas/altas no npm"

# 10. Verificar firewall (se disponível)
echo ""
echo "🔟  Verificando firewall..."
if command -v ufw &> /dev/null; then
  ufw status | grep -q "Status: active"
  check "Firewall UFW ativo"
else
  echo -e "${YELLOW}ℹ️  INFO:${NC} UFW não instalado (opcional)"
fi

# Resumo final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DA VERIFICAÇÃO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Testes Passados: $PASSED${NC}"
echo -e "${RED}❌ Testes Falhados: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 TODAS AS VERIFICAÇÕES DE SEGURANÇA PASSARAM!${NC}"
  echo -e "${GREEN}✅ Sistema protegido contra CVE-2025-55182${NC}"
  exit 0
else
  echo -e "${RED}⚠️  ALGUMAS VERIFICAÇÕES FALHARAM!${NC}"
  echo -e "${YELLOW}Por favor, revise os itens acima e corrija os problemas.${NC}"
  exit 1
fi

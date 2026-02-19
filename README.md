# 📊 K6 Performance Tests & Observability

Este repositorio contiene pruebas de rendimiento automáticas utilizando **K6**, con historial de métricas y despliegue de dashboard en **GitHub Pages**.  

## ⚡ Características

- Ejecución de pruebas de rendimiento con **K6**.
- Registro histórico de métricas (p95, promedio, total de requests).
- Detección de regresiones de performance con alertas.
- Dashboard visual en `index.html` con gráficos de tendencias y distribución.
- Despliegue automático del reporte en **GitHub Pages**.

## 🛠️ Requisitos

- Node.js >= 20
- GitHub Actions
- Acceso a repositorio con permisos para publicar en la rama `gh-pages`.

## 🏃‍♂️ Cómo ejecutar las pruebas

Localmente:

```bash
# Instalar dependencias
npm install

# Ejecutar K6
k6 run ./tests/users-test.js --out json=./target/site/reportsK6/report.json

# Actualizar historial
node scripts/save-history.js

# Abrir dashboard
open ./target/site/reportsK6/index.html

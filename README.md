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

🚀 GitHub Actions Workflow

El workflow realiza:

Ejecutar pruebas K6 y generar JSON con resultados.

Actualizar historial de métricas con save-history.js.

Publicar dashboard actualizado en GitHub Pages desde REPORT_DIR.

Archivo: .github/workflows/k6-perf.yml

📂 Estructura del proyecto
.
├── tests/                  # Scripts de pruebas K6
├── scripts/                # Scripts de Node (save-history.js)
├── target/site/reportsK6/  # Reportes y dashboards generados
│   ├── report.json
│   └── index.html
├── index.html              # Dashboard principal (raíz o movido a REPORT_DIR)
├── package.json
└── .github/workflows/      # GitHub Actions workflow

📊 Dashboard

El dashboard index.html incluye:

Número total de requests.

Promedio de latencia.

P95 y estado (PASS/FAIL).

Histograma de distribución de latencias.

Gráfico de tendencias histórico.

📌 Notas

Ajusta la variable de entorno P95_THRESHOLD en el workflow para definir el SLA.

GitHub Pages se publica automáticamente desde la carpeta REPORT_DIR con peaceiris/actions-gh-pages.

Asegúrate de que index.html esté presente en REPORT_DIR antes de hacer deploy para evitar errores 404.

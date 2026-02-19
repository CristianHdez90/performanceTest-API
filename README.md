# 📊 K6 Performance Tests & Observability

Este repositorio contiene pruebas de rendimiento automáticas utilizando **K6**, con historial de métricas y despliegue de dashboard en **GitHub Pages**.  

Todos los archivos del dashboard (`index.html`, `report.json`, `summary.json`) se encuentran en la raíz del repositorio, lo que permite que GitHub Pages los sirva directamente.

---

## ⚡ Características

- Ejecución de pruebas de rendimiento con **K6**.
- Registro histórico de métricas (p95, promedio, total de requests) en `performance-history/`.
- Detección de regresiones de performance con alertas.
- Dashboard visual en `index.html` con gráficos de tendencias y distribución.
- Despliegue automático del reporte en **GitHub Pages**.

---

## 🛠️ Requisitos

- Node.js >= 20
- GitHub Actions
- Acceso a repositorio con permisos para publicar en la rama `gh-pages`.

---

## 🏃‍♂️ Cómo ejecutar las pruebas

Localmente:

```bash
# Instalar dependencias
npm install

# Ejecutar K6
k6 run ./tests/users-test.js --out json=report.json

# Actualizar historial
node scripts/save-history.js

# Abrir dashboard
open index.html

## 🚀 GitHub Actions Workflow

**Archivo:** `.github/workflows/performance.yml`

El workflow realiza:

1. Ejecutar pruebas K6 y generar `report.json`.  
2. Actualizar historial de métricas con `save-history.js` (guardado en `performance-history/`).  
3. Publicar dashboard actualizado en GitHub Pages desde la raíz del repositorio.

**Enlaces de interés:**

- **Dashboard en GitHub Pages:** [https://cristianhdez90.github.io/performanceTest-API/](https://cristianhdez90.github.io/performanceTest-API/)  
- **Historial de ejecuciones GitHub Actions:** [https://github.com/CristianHdez90/performanceTest-API/actions](https://github.com/CristianHdez90/performanceTest-API/actions)


📂 Estructura del proyecto
.
├── tests/                    # Scripts de pruebas K6
├── scripts/                  # Scripts de Node (save-history.js)
├── performance-history/      # Historial de métricas para el dashboard
├── index.html                # Dashboard principal
├── report.json               # Resultados de la prueba K6
├── summary.json              # Resumen de métricas
├── package.json
└── .github/workflows/        # GitHub Actions workflow

## 📊 Dashboard

El dashboard `index.html` incluye:

- Número total de requests.  
- Promedio de latencia.  
- P95 y estado (PASS/FAIL).  
- Histograma de distribución de latencias.  
- Gráfico de tendencias histórico (usa los datos de `performance-history/`).

---

## 📌 Notas

- Ajusta la variable de entorno `P95_THRESHOLD` en el workflow para definir el SLA.  
- GitHub Pages se publica automáticamente desde la **raíz del repo** con `peaceiris/actions-gh-pages`.  
- Asegúrate de que `index.html`, `report.json`, `summary.json` y `performance-history/` estén presentes antes de hacer deploy para evitar errores 404.

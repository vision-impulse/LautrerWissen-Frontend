
# LautrerWissen – Frontend Component

This repository provides the **frontend component** for the smart city web solution **LautrerWissen**. It delivers a user-friendly, interactive, responsive and accessible data experience, visualizing Smart City insights for citizens in an intuitive interface.

A major focus of the frontend lies in **geospatial data**, integrated into an interactive **map view**. Additional insights such as elections, city statistics, visualizations, plots, events, construction sites and grafana dashboards are embedded in dedicated pages. The frontend has the following features:

- **📱 Progressive Web App (PWA)** – Installable on mobile and desktop as a full progressive web app
- **🎨 Fully Responsive UI** – Automatically adapts to all screen sizes (mobile, tablet, desktop, ultrawide)
- **🔁 REST API Integration** – Retrieves map layer configuration and city data from backend (geo objects, statistics, elections)
- **🐳 Docker Production Deployment** – Alpine-based Node container optimized for size and performance
- **🗺️ Geospatial Smart City Data Visualization** – Interactive map with dynamic layers & geo objects
- **📊 Embedded Dashboards** – Analytics and statistics pages powered by Grafana
- **📡 Real-time sensor values** via a configurable WebSocket endpoint
- **🎨 TailwindCSS Styled Interface** – Clean and scalable utility-based styling
- **🔎 Map Layer Configurable** – Backend-driven or default fallback layer configuration
- **⚙️ Fallback / Default Data Support** – Local defaults auto-activate if backend API is unreachable

All data is dynamically retrieved from the **LautrerWissen Backend** using a **REST API** and **WebSockets**. To ensure resilience, the frontend contains **fallback default values** if the backend is unavailable.

The frontend is based on the following tech-stack:

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=fff)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)

# Architecture Overview and Structure

The frontend is build in a modular manner and contains resuable app components. The solution has the following architectural structure:

| Folder/File            | Description |
|----------------------|-------------|
| `/api`               | REST calls to the backend API |
| `/app`               | Main pages and frontend routing |
| `/assets`            | Static content (images, icons, etc.) |
| `/components`        | Shared UI components (layout, boxes, navbars, footer, pagination, etc.) |
| `/features`          | Page-specific features with server logic scoped to routes under `/app` |
| `/hooks`             | Custom React hooks including API data access |
| `/types`             | TypeScript type definitions |
| `Dockerfile`         | Production deployment container build |
| `next.config.ts`     | Next.js project configuration |
| `tailwind.config.ts` | Tailwind UI styling configuration |
| `/config.js`         | Backend URLs, WebSocket endpoints, analytics config, contact emails |


# Execution & Deployment

## Local Development (Without Docker)

For running the frontend without using docker (e.g. for local development), ensure required packages are installed and start the development server as follows:

Install dependencies:
```bash
pnpm install
```

Start development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

Important note: For the connection to the backend API to serve application data, make sure your backend API is accessible on the host and the endpoint is set correctly in /config.js:

## Docker Deployment (Production)

The frontend component is deployed via a Node Alpine docker container. For local testing with docker or for ensuring that the frontend can be served via the production ready node image, run the following:

Build the frontend image (locally):
```bash
docker build -t lautrerwissen-frontend .
```

Run the container (locally):
```bash
docker run -p 3000:3000 lautrerwissen-frontend
```

To deploy the component in the production environment together with the backend components, please use the docker-compose file in the backend repository to ensure the components are on the same docker network, logging stack, etc. Make sure that this repository is located inside root level folder of the backend project and run the following: 

```bash
docker compose -f ./compose.yaml up --build frontend
```

# License and Contact

## Open-Source Licenses

This project uses open-source components, including:

- Docker — Apache-2.0
- Next - MIT license
- Tailwindcss - MIT license
 
For a complete list of third-party licenses (including transitive dependency licenses), see the `NOTICE.md` file in the project root.

## Contact
E-Mail: info[at]vision-impulse.com

## Legal
&copy; 2025 Vision Impulse GmbH • License: [AGPLv3](LICENSE)  
Implemented by [Vision Impulse GmbH](https://www.vision-impulse.com)





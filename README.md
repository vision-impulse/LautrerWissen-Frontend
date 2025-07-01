## Overview

This is the frontent server for the solution LautrerWissen. Important hints:

- Configure the URLs of the backend and websocket endpoint in /config.js (in dev mode you might change the backend URL to localhost:BACKEND_PORT)

## Docker Deployment

The frontend is can be deployed in a Node Alpine docker container. 

```bash
docker build .
```

## Getting Started

First, install all required dependencies:

```bash
pnpm install
```
Run the development server:

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

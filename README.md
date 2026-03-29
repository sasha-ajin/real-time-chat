# Real-time Chat Application

A real-time messaging web application built with NestJS, React, MongoDB, and Socket.IO.

## Local Setup
### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) 20+ and npm

### Backend

The backend (NestJS + MongoDB) runs entirely in Docker:

```bash
cd server
docker-compose up --build
```

This starts:
- **MongoDB** on port `27017`
- **NestJS server** on port `3001`

To stop the services:

```bash
docker-compose down
```

### Frontend

The frontend (React) runs outside Docker:

```bash
cd client
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Backend environment variables are defined in `server/.env.development.local`:

When running via Docker Compose, `MONGODB_URI` is automatically overridden to `mongodb://mongodb:27017/chat-app` to use the Docker network.

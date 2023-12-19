import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import path from "path";
import url from 'url'
import fs from 'fs'

// swagger imports
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "voicedeck backend API",
            version: "1.0.0",
            description: "voicedeck API",
        },
        servers: [
            {
                url: process.env.SERVER_URL || "http://localhost:8000",
            },
        ],
    },
    apis: [path.resolve(__dirname, '../src/routes/*.ts')],
};


const specs = swaggerJsdoc(swaggerOptions);

const PORT = process.env.PORT ?? 8000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

await importFunctionDirectory('routes', { app })

// name relative to file location
async function importFunctionDirectory(dirname, state) {
  // import all non-index files from __dirname/name this folder
  const routeDir = path.join(__dirname, dirname)
  const routes = await fs.promises.readdir(routeDir)
  for (const routeFile of routes) {
    const { default: route } = await import(path.join(routeDir, routeFile))
    route(state)
  }
}

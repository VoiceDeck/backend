import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import path from "path";

// swagger imports
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

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

// routes

app.listen(8000, () => {
    console.log("listening on port 8000");
})
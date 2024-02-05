import * as dotenv from "dotenv";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
dotenv.config({ path: __dirname+'/.env' });
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import url from 'url'


// swagger imports
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import userRoutes from './routes/users.mjs';


const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'voicedeck backend API',
      version: '1.0.0',
      description: 'voicedeck API',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:8000',
      },
    ],
  },
  apis: [path.resolve(__dirname, '../src/routes/*.mjs')],
}




const specs = swaggerJsdoc(swaggerOptions)

//routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api', userRoutes)
console.log("mongo uri : ", process.env.MONGO_URI);
console.log("port : ", process.env.PORT);

// connect to db
mongoose
    .connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
    })
    .then(() => {
        console.log('connected to database');
        // listen to port
        app.listen(Number(process.env.PORT), () => {
            console.log(`listening for requests on port http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
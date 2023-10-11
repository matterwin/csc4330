require('dotenv').config();
require('express-async-errors');

import express from 'express';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import uploadRouter from './routes/uploadRoutes';
import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { authenticate } from './middleware/auth';
import connectDB from './db/connect';

// Web Socket Server
const { WebSocketServer } = require('ws');
const http = require('http');

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const socketPort = 8000;

// Regular HTTP Server
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

app.use(express.json());
app.use(cors());

app.use(fileUpload({ useTempFiles: true }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);

app.use(notFound);
app.use(errorHandler);
app.use(authenticate);

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'placeholder';

const start = async () => {
    try {
        await connectDB(mongoUri);
        app.listen(port, () => { console.log(`HTTP Server is listening on port ${port}`); });
        server.listen(socketPort, () => { console.log(`WebSocket Server is running on port ${socketPort}`); });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};


start();

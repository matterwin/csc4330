require('dotenv').config();
require('express-async-errors');

import express from 'express';
import authRouter from './routes/authRoutes';
import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import connectDB from './db/connect';

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'placeholder';

const start = async () => {
    try {
        await connectDB(mongoUri);
        app.listen(port);
        console.log("Server is running on port", port);
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

start();

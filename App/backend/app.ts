import express from 'express';
import authRouter from './routes/authRoutes';
import { notFound } from './middleware/not-found';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.use(notFound);

const port = 5000;
const start = async () => {
    try {
        app.listen(port);
        console.log("Server is running on port", port);
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

start();

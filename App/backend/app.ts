import express from 'express';

const app = express();

const port = 5000;
const start = async () => {
    try {
        await app.listen(port);
        console.log("Server is running on port", port);
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

start();

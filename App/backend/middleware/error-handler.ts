const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error("Error:", err);

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Validation error", details: err.errors });
    }

    if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).json({ error: "Duplicate key error", details: err.keyValue });
    }

    return res.status(500).json({ error: "An internal server error occurred." });
};

module.exports = errorHandler;

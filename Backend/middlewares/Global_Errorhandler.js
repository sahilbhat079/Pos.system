// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log full stack trace for debugging
    console.error("Error Stack Trace:\n", err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server.";

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
            // Optional: Include detailed error in development only
            ...(process.env.NODE_ENV === 'development' && {
                method: req.method,
                path: req.originalUrl,
                timestamp: new Date().toISOString(),
                stack: err.stack,
            }),
        },
    });
};

// Fallback middleware for unmatched routes
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            message: ` Route '${req.originalUrl}' not found.`,
            statusCode: 404,
            method: req.method,
            timestamp: new Date().toISOString(),
        },
    });
};

module.exports = { errorHandler, notFoundHandler };

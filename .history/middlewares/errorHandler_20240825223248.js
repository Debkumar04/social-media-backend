// ./middlewares/errorHandler.js

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const errorHandlerMiddleware = (err, req, res, next) => {
    // Set default values for error if they are not already defined
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // Log the error details for debugging
    console.error('Error:', err);
  
    // Send error response
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  
  export { AppError, errorHandlerMiddleware };
  
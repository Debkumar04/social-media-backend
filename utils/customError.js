class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      // Capture the stack trace (for debugging purposes)
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default CustomError;
  
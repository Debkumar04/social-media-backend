import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'; // HTTP request logger middleware
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import {authMiddleware} from './middlewares/authMiddleware.js ';
import loggerMiddleware from './middlewares/logger.js';
import { errorHandlerMiddleware} from './middlewares/errorHandler.js';
import fileUploadMiddleware from './middlewares/fileUpload.js';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Logger middleware (Morgan)
app.use(morgan('dev'));

dotenv.config();

// Middleware for file uploads (using multer)
app.use('/uploads', express.static('uploads')); // Serving static files from the 'uploads' directory

// Logger middleware (Winston)
app.use(loggerMiddleware);

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to Postaway API');
});

// Routes for user authentication
app.use('/api/auth', authRoutes);

// Routes for posts (secured with authentication middleware)
app.use('/api/posts', authMiddleware, postRoutes);

// Routes for comments (secured with authentication middleware)
app.use('/api/comments', authMiddleware, commentRoutes);

// Routes for likes (secured with authentication middleware)
app.use('/api/likes', authMiddleware, likeRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Export the app module
export default app;

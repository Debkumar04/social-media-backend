// routes/likeRoutes.js

import express from 'express';
import { addLike, removeLike, getLikesByPostId } from '../models/like.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to toggle like on a post
router.post('/toggle/:postId', authMiddleware, (req, res, next) => {
    const { postId } = req.params;
    const userId = req.userId;

    const existingLike = getLike(userId, postId);

    if (existingLike) {
        removeLike(userId, postId);
        return res.status(200).json({ message: 'Like removed successfully.' });
    } else {
        addLike(userId, postId);
        return res.status(200).json({ message: 'Like added successfully.' });
    }
});

// Route to get all likes for a specific post
router.get('/:postId', authMiddleware, (req, res, next) => {
    const { postId } = req.params;
    const likes = getLikesByPostId(postId);

    if (!likes) {
        return next(new CustomError('No likes found for this post', 404));
    }

    res.status(200).json({ likes });
});

export default router;

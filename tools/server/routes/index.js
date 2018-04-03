import express from 'express';
import authRoutes from './auth';

const app = express();

// put all router
app.use('/auth', authRoutes);
// app.use('/user', userRoutes);

module.exports  = app;
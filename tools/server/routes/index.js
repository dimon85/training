import express from 'express';
import authRoutes from './auth';
import translateRoutes from './translates';

const app = express();

// put all router
app.use('/auth', authRoutes);
// app.use('/user', userRoutes);

app.use('/translation', translateRoutes);

module.exports  = app;
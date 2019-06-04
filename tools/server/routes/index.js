import express from 'express';
// import authRoutes from './auth';
import translateRoutes from './translates';

const app = express();

// put all router
// app.use('/auth', authRoutes);


app.use('/translation', translateRoutes);

export default app;
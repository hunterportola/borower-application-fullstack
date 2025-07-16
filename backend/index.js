// In backend/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import store from './database.js';

// Import routes using ES Module syntax
import authRoutes from './auth/routes/auth-routes.js';
import loanRoutes from './routes/loan.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api', loanRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
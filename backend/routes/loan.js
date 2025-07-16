// In backend/routes/loan.js
import express from 'express';
import loanController from '../controllers/loanController.js'; // Assuming you will create this

const router = express.Router();

router.post('/application', loanController.submitApplication);

export default router;
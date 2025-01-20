import { Router } from 'express';
import { createPaymentIntent, getKeys, webhook } from './paymentController.js';
import { verifyToken } from '../../middlewares/authmiddleware.js';

const router = Router();

// Note: Guests can get the publishable key
router.get('/keys', getKeys);

//@ts-ignore
router.post('/payment-intent', verifyToken, createPaymentIntent);

//@ts-ignore
router.post('/webhook', webhook);

export default router;

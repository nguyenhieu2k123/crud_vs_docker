import express from 'express'
import orderControllers from '../../controllers/orderController';
import auth from '../../controllers/authController';
const router = express.Router();


router.get('/orders', orderControllers.getAllOrder)



module.exports = router;
import express from 'express'
import productControllers from '../../controllers/productController';
import auth from '../../controllers/authController';

const router = express.Router();


router.get('/products', auth.verify, productControllers.getProducts)



module.exports = router;
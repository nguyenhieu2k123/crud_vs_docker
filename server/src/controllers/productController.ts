import { Request, Response } from 'express';
import productServices from '../services/productServices';


class ProductController {
	getProducts = async (req: Request, res: Response) => {
		const products = await productServices.getProducts()
		res.json(products);
	};
}

export default new ProductController();

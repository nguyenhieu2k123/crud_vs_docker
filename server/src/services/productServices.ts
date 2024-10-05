import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class ProductServices {
	getProducts = async () => {
		try {
			const products = await prisma.product.findMany({});
			return products;
		} catch (error) {
			console.error(error);
			throw new Error("Cannot find products");
		}
	};
}

export default new ProductServices();
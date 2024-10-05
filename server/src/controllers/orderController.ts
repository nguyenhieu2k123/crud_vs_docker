import { Request, Response, NextFunction } from 'express';
import orderServices from '../services/orderServices';



class OrderController {
	getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { customer_name, status, page = 1, per_page = 10 } = req.query;

			const pageNumber = parseInt(page as string, 10);

			const itemPerPage = parseInt(per_page as string, 10);

			const whereCondition: any = {};

			if (customer_name) {
				whereCondition.customer = {
					name: {
						contains: customer_name as string,
						mode: 'insensitive',
					},
				};
			}

			if (status) {
				const statusArray = (status as string).split(',').map(Number);
				whereCondition.id = {
					in: statusArray,
				};
			}

			const allOrders = await orderServices.getAllOrder(whereCondition, pageNumber, itemPerPage);

			const totalOrders = await orderServices.getTotalOrders(whereCondition)

			const allOrderStatus = await orderServices.getAllOrderStatus()

			res.json({
				allOrders,
				allOrderStatus,
				totalOrders,
				page: pageNumber,
				per_page: itemPerPage
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to fetch orders' });
		}
	};
}

export default new OrderController();

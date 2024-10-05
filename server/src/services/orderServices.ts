import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrderServices {
	getAllOrder = async (whereCondition: any, pageNumber: number, itemPerPage: number) => {
		try {
			return await prisma.order.findMany({
				where: whereCondition,
				include: {
					customer: true,
					status: true,
					product: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
				skip: (pageNumber - 1) * itemPerPage,
				take: itemPerPage,
			});
		} catch (error) {
			console.error(error);
			throw new Error("Failed to fetch orders")
		}
	};

	getAllOrderStatus = async () => {
		try {
			return await prisma.orderStatus.findMany({});
		} catch (error) {
			console.log({ error })
			throw new Error("Failed to get all order status")
		}
	}

	getTotalOrders = async (payload: any) => {
		try {
			return await prisma.order.count({
				where: payload
			});
		} catch (error) {
			console.log({ error })
			throw new Error("Failed to get total orders")
		}
	}

}

export default new OrderServices();
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

class UserServices {
	async findUserByEmail(email: string) {
		try {
			const user = await prisma.customer.findUnique({
				where: { email }
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
	async createUser(data: any) {
		try {
			const { name, email, hashedPassword, role } = data
			const user = await prisma.customer.create({
				data: {
					name,
					email,
					password: hashedPassword,
					role
				},
			})
			return user
		} catch (error) {
			console.log(error)
		}
	}

	async getUserRefreshToken(userId: any) {
		try {
			const userRefreshToken = await prisma.customer.findUnique({
				where: { id: parseInt(userId) },
				select: { refreshToken: true },
			})
			return userRefreshToken?.refreshToken
		} catch (error) {
			console.log(error)
			throw new Error("UserRefreshToken not found");
			
		}
	}

	async updateUserRefreshToken(data: any) {
		try {
			const { userId, refreshToken } = data
			return await prisma.customer.update({
				where: { id: parseInt(userId) },
				data: {
					refreshToken: refreshToken
				}
			})
		} catch (error) {
			console.log(error)
			throw new Error("Cannot update user's refresh token")
		}
	}
}
export default new UserServices();
import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import userServices from '../services/userServices';
import accessServices from '../services/accessServices';



class AuthController {
	verify = async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		const userId = req.headers["user-id"];

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'No token provided' });
		}

		const token = authHeader.split(' ')[1];

		if (!userId) {
			return res.status(403).json({ message: 'Missing user Id' });
		}

		const verifyToken = accessServices.verifyToken(token);

		if (verifyToken) {
			return next();
		}

		const userRefreshToken = await userServices.getUserRefreshToken(userId);
		const decodedUserRefreshToken = userRefreshToken && accessServices.verifyToken(userRefreshToken, "refresh_token");

		if (!decodedUserRefreshToken || typeof decodedUserRefreshToken === 'string') {
			await userServices.updateUserRefreshToken({ userId, refreshToken: null });
			return res.status(403).json({ message: 'Refresh token expire' });
		}

		const tokenPayload = {
			id: decodedUserRefreshToken.id,
			name: decodedUserRefreshToken.name,
			email: decodedUserRefreshToken.email,
			role: decodedUserRefreshToken.role,
		};

		const newToken = accessServices.generateToken(tokenPayload);

		res.setHeader('Authorization', `Bearer ${newToken}`);

		return next();
	};

	login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body
			console.log({ email, password })
			const user = await userServices.findUserByEmail(email);
			if (!user) {
				return res.status(400).json({ message: 'User not exist' });
			}
			let isValidPassword;
			if (user.password) {
				isValidPassword = await accessServices.verifyPassword(password, user.password);
			}

			if (!isValidPassword) {
				res.status(403).json({ message: 'Password invalid' })
			}
			const tokenPayload = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			}

			const [token, refreshToken] = await Promise.all([
				accessServices.generateToken(tokenPayload),
				accessServices.generateRefreshToken(tokenPayload)
			])

			if (token && refreshToken) {
				await userServices.updateUserRefreshToken({ userId: user.id, refreshToken })
			}

			res.setHeader('Authorization', `Bearer ${token}`);
			res.setHeader("user-id", user.id)

			res.json({ ...user, token, refreshToken: refreshToken })

		} catch (error) {
			return error
		}
	}

	register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, email, password, role = Role["USER"] } = req.body
			const isExistUser = await userServices.findUserByEmail(email);

			if (isExistUser) {
				return res.status(400).json({ message: 'User existed!' });
			}

			const hashedPassword = await accessServices.hashPassword(password)

			const newUser = await userServices.createUser({ name, email, hashedPassword, role });
			res.json(newUser)
		} catch (error) {
			console.log({ error })
			return error
		}
	}

}

export default new AuthController();
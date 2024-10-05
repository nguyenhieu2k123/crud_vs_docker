import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


class AccessServices {

	generateToken = (payload: any) => {
		const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_TIME } = process.env;
		if (!ACCESS_TOKEN_SECRET) {
			throw new Error('ACCESS_TOKEN_SECRET is not defined');
		}

		const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRES_TIME,
		});
		return token;
	}

	generateRefreshToken = (payload: any) => {
		const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_TIME } = process.env;
		if (!REFRESH_TOKEN_SECRET) {
			throw new Error('REFRESH_TOKEN_SECRET is not defined');
		}
		const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
			expiresIn: REFRESH_TOKEN_EXPIRES_TIME,
		});
		return refreshToken;
	}

	verifyToken = (token: string, type: string = "access_token") => {
		try {
			const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

			if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
				throw new Error('Token secrets are not defined');
			}

			const secret = type === "access_token" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
			return jwt.verify(token, secret);

		} catch (error: any) {
			console.error("Token verification failed", error);
			return null;
		}
	};


	hashPassword = async (password: string) => {
		const { SALT_ROUNDS } = process.env
		const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
		return await bcrypt.hash(password, salt)
	}

	verifyPassword = async (plainPassword: string, hashedPassword: string) => {
		return await bcrypt.compare(plainPassword, hashedPassword);
	}
}

export default new AccessServices();

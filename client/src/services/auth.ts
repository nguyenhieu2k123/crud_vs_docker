import axios from "axios";

export const login = async (data: any) => {
	console.log(data)
	try {
		const rs = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/login`, data)
		console.log(rs)
		return rs.data
	} catch (error) {

	}
}
import axios from 'axios'

export const handleGetProducts = async () => {
	try {
		const rs = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/products`)
		return rs.data
	} catch (error) {

	}
}
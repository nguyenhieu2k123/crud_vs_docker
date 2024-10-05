import axios from 'axios';

export const handleGetOrders = async (searchQuery?:
	{ customerName?: string; status?: number[], page: number, per_page:number }) => {
	try {
		const query = new URLSearchParams();

		if (searchQuery?.customerName) {
			query.append('customer_name', searchQuery.customerName);
		}

		if (searchQuery?.status?.length) {
			query.append('status', searchQuery.status.join(','));
		}
		if (searchQuery?.page) {
			query.append('page', searchQuery.page.toString());
		}
		if (searchQuery?.per_page) {
			query.append('page', searchQuery.page.toString());
		}

		const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/orders?${query.toString()}`);

		return response.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
		throw error;
	}
};

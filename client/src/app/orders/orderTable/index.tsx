"use client"
import { useEffect, useState } from "react"
import { handleGetOrders } from "@/services/order"
import CommonTable from "@/common/Table/Table"
import { createColumnHelper } from "@tanstack/react-table"


const columnHelper = createColumnHelper<Order>();

const columns = [
	columnHelper.accessor('id', {
		header: 'Order ID',
	}),
	columnHelper.accessor('customer.email', {
		header: "Customer's email",
	}),
	columnHelper.accessor('customer.name', {
		header: 'Customer Name'
	}),
	columnHelper.accessor('product.name', {
		header: 'Product name',
		cell: info => info.getValue(),
	}),
	columnHelper.accessor('status.status', {
		header: 'Status',
		cell: info => info.getValue(),
	}),
	columnHelper.accessor('createdAt', {
		header: 'Created At',
		cell: info => {
			const dateValue = new Date(info.getValue());
			return dateValue.toLocaleDateString();
		},
	}),
];

export default function OrderTable() {
	const [data, setData] = useState([])
	const [allOrderStatus, setAllOrderStatus] = useState([])
	const [loading, setLoading] = useState(true);

const handleFetchData = async (searchQuery: searchQuery | null) => {
		setLoading(true);
		const rs = await handleGetOrders()
		if (rs) {
			setData(rs.allOrders)
			setAllOrderStatus(rs.allOrderStatus)
		}
	setLoading(false);
}
	
	useEffect(() => {
		handleFetchData(null)
	}, [])
	return (
		<CommonTable
			columns={columns}
			data={data}
			handleFetchData={handleFetchData}
			selectSearchKeys={allOrderStatus}
			loading={loading}
		/>
	)
}

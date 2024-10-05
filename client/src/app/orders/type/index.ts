type BaseEntity = {
	id: number
	createdAt: Date
}

type Order = BaseEntity & {
	customerId: number
	productId: number
	statusId: number
	customer: Customer
	product: Product
	status: Status
}

type Status = {
	id: number
	status: string
}

type Customer = BaseEntity & {
	name: string
	email: string
}

type Product = BaseEntity & {
	name: string
	description: string
	price: number
}

type OrderStatus = {
	id: string
  status: []
}
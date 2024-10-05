const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	// Create customers
	await prisma.customer.createMany({
		data: [
			{ name: "John Doe", email: "john@example.com" },
			{ name: "Jane Smith", email: "jane@example.com" },
			{ name: "Alice Johnson", email: "alice@example.com" },
			{ name: "Bob Brown", email: "bob@example.com" },
			{ name: "Emily White", email: "emily@example.com" },
		],
	});

	// Create products
	await prisma.product.createMany({
		data: [
			{ name: "Agarwood Incense Sticks", description: "High-quality agarwood incense sticks.", price: 25.00 },
			{ name: "Agarwood Oil", description: "Premium agarwood essential oil.", price: 150.00 },
			{ name: "Agarwood Bracelet", description: "Elegant bracelet made from agarwood beads.", price: 45.00 },
		],
	});

	// Create order statuses
	await prisma.orderStatus.createMany({
		data: [
			{ status: "Processing" },
			{ status: "Delivery" },
			{ status: "Done" },
			{ status: "Fail" },
		],
	});

	// Create orders
	await prisma.order.createMany({
		data: [
			{ customerId: 1, productId: 1, statusId: 1 },
			{ customerId: 2, productId: 2, statusId: 2 },
			{ customerId: 3, productId: 3, statusId: 3 },
			{ customerId: 4, productId: 1, statusId: 4 },
			{ customerId: 5, productId: 2, statusId: 1 },
			{ customerId: 1, productId: 3, statusId: 2 },
			{ customerId: 2, productId: 1, statusId: 3 },
			{ customerId: 3, productId: 2, statusId: 4 },
			{ customerId: 4, productId: 3, statusId: 1 },
			{ customerId: 5, productId: 1, statusId: 2 },
		],
	});

	console.log('Seed data created successfully!');
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});

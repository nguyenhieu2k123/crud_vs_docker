# 1. Getting started

- Run npm i
- Create postgres database
- Check env.example and replace environment

## 2.

Run the following command to create your PSQL database file.
```
npx prisma migrate dev --name init
```
Run the following command to seed your database
```
npx prisma db seed
```
When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:4000`. You can now run the API requests, e.g. [`http://localhost:4000/orders`](http://localhost:4000/orders).



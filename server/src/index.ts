import express from 'express'
import cors from 'cors';

const app = express()

app.use(express.json())

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
}));

const port = process.env.PORT || 8000


app.use('/', require('./routers'));


app.listen(port, () =>
	console.log(`
🚀 Server ready at: http://localhost:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)

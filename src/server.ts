// Set up your server

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import productRouter from './routes/product.routes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/products', productRouter)

app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route')
})

const PORT = process.env.BACKEND_PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
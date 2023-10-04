import express, { Express, Request, Response } from 'express'
import DB from '../core/db'
import { Pool, PoolClient, QueryResult } from 'pg'


export default function ProductList(): void {
	const app: Express = express()
	const pool: Pool = DB()

	pool.query('SELECT * FROM products', (err: Error, res: QueryResult): void => {
		console.log(err, res)
		pool.end().then((r: void): void => console.log('Pool has ended'))
	})

	app.use(express.json())

	// Define a SQL query to select all products
	const getAllProductsQuery: string = 'SELECT * FROM products'

	// Define a new route to retrieve all products
	app.get('/product', async (req: Request, res: Response): Promise<void> => {
		try {
			const client: PoolClient = await pool.connect()

			// Execute the SQL query to retrieve all products
			const result: QueryResult = await client.query(getAllProductsQuery)

			// Release the client back to the pool
			client.release()

			// Send the query result as a JSON response
			res.json(result.rows)
		} catch (error) {
			console.error('Error executing query:', error)
			res.status(500).json({ error: 'An error occurred' })
		}
	})
}

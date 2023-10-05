import express, { NextFunction, Request, Response, Router } from 'express'
import DB from '../core/db'
import { Pool, PoolClient, QueryResult } from 'pg'
import Express from 'express'


const pool: Pool = DB()
const router: Router = express.Router()


router.get('/', function (request: Request, response: Response, next: NextFunction): void {
	pool.query('SELECT * FROM product ORDER BY id ASC', (error: Error, result: QueryResult): any => {
		if (error) {
			response.status(500)
			response.render('error')
			throw error
		} else {
			response.send('Data: ' + result.rows)
		}
	})
})

export default router

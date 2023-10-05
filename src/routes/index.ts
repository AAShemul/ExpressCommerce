import express, { NextFunction, Request, Response, Router } from 'express'


const router: Router = express.Router()

router.get('/', function (request: Request, response: Response, next: NextFunction): void {
	response.render('index', { title: 'Express' })
})

export default router

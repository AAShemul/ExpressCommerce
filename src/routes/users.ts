import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

/* GET users' listing. */
router.get('/', function (req: Request, res: Response, next) {
	res.send('Respond with a resource');
})

export default router

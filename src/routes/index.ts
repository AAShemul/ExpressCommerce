import express, { Request, Response, Router } from 'express'

const router: Router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next) {
	res.render('index', { title: 'Express' });
})

export default router

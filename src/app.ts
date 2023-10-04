import express, { Express, NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes'
import userRouter from './routes/users'
import path from 'path'


const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', userRouter)

const product = {
	list: function (req: Request, res: Response): void {
		res.send('Product list')
	},

	get: function (req: Request, res: Response): void {
		res.send('Product ' + req.params.uid)
	},

	add: function (req: Request, res: Response): void {
		res.send('Add product')
	},

	edit: function (req: Request, res: Response): void {
		res.send('Edit product ' + req.params.uid)
	},

	delete: function (req: Request, res: Response): void {
		res.send('Delete product ' + req.params.uid)
	}
}

app.get('/product', product.list)
app.get('/product/add', product.add)
app.get('/product/:uid', product.get)
app.get('/product/:uid/edit', product.edit)
app.post('/product/:uid/delete', product.delete)

app.use(function (req: Request, res: Response, next: NextFunction): void {
	next(createError(404))
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction): void {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status((err.status || 500))
	res.render('error')
})

app.listen(port, (): void => {
	console.log('Server is up on port ' + port)
})

export default app

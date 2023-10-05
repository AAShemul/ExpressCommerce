import express, { Express, NextFunction, Request, response, Response } from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes'
import userRouter from './routes/users'
import productRouter from './routes/product'
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
app.use('/product', productRouter)

const product = {
	list: function (request: Request, response: Response): void {
		app.use('/product', productRouter)
	},

	get: function (request: Request, response: Response): void {
		response.send('Product ' + request.params.uid)
	},

	add: function (request: Request, response: Response): void {
		response.send('Add product')
	},

	edit: function (request: Request, response: Response): void {
		response.send('Edit product ' + request.params.uid)
	},

	delete: function (request: Request, response: Response): void {
		response.send('Delete product ' + request.params.uid)
	}
}

/*app.get('/product', product.list)
app.get('/list', (response: Response) => {
	response.send('List of products')
})*/
app.get('/product/add', product.add)
app.get('/product/:uid', product.get)
app.get('/product/:uid/edit', product.edit)
app.post('/product/:uid/delete', product.delete)

app.use(function (request: Request, response: Response, next: NextFunction): void {
	next(createError(404))
})

app.use(function (error: any, request: Request, response: Response, next: NextFunction): void {
	response.locals.message = error.message
	response.locals.error = request.app.get('env') === 'development' ? error : {}

	response.status(error.status || 500)
	response.render('error')
})

app.listen(port, (): void => {
	console.log('Server is up on port ' + port)
})

export default app

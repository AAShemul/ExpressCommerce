import { Pool } from 'pg'


export default function DB(): Pool {
	return new Pool({
		user: process.env.POSTGRES_USER || 'default',
		host: process.env.POSTGRES_HOST || 'localhost',
		database: process.env.POSTGRES_DATABASE || 'verceldb',
		password: process.env.POSTGRES_PASSWORD || 'your_password',
		port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
	})
}

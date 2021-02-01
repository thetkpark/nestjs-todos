import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const databaseConfig: TypeOrmModuleOptions = {
	name: 'localhost_pg',
	type: 'postgres',
	host: process.env.PG_HOST,
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	port: 5432,
	entities: ['dist/**/*.entity{.ts,.js}'],
	synchronize: process.env.DATABASE_SYNCHRONIZE == 'true'
}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './users/user.entity'
import { UserModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.PG_HOST,
			username: process.env.PG_USERNAME,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DATABASE,
			port: 5432,
			entities: ['dist/**/*.entity{.ts,.js}'],
			autoLoadEntities: true,
			synchronize: true
		}),
		UserModule,
		AuthModule,
		TodoModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

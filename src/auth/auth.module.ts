import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1 days' }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}

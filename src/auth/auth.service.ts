import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { User } from '../users/user.entity'
import { JWTBody } from './jwtBody.type'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	// Used by local-strategy
	async validateUser(loginDto: LoginDto): Promise<User> {
		const user = await this.userService.findUserByUsername(loginDto.username)
		if (!user) return null
		const passwordMatch = await bcrypt.compare(loginDto.password, user.password)
		if (!passwordMatch) return null
		return user
	}

	// Use when login
	async login(userId: number) {
		const payload: JWTBody = { sub: userId }
		return this.jwtService.sign(payload)
	}
}

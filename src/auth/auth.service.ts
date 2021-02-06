import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async validateUser(loginDto: LoginDto): Promise<User> {
		const user = await this.userService.findUserByUsername(loginDto.username)
		if (!user) return null
		const passwordMatch = await bcrypt.compare(loginDto.password, user.password)
		if (!passwordMatch) return null
		return user
	}
}

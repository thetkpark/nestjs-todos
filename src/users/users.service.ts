import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			const user = new User()
			user.username = createUserDto.username
			user.password = await bcrypt.hash(createUserDto.password, 10)

			const createdUser = await this.userRepository.save(user)
			return createdUser
		} catch (error) {
			throw error
		}
	}
}

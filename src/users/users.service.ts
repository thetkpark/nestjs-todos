import * as bcrypt from 'bcrypt'
import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { ChangePasswordReqDto, ChangePasswordResDto } from './dto/change-password.dto'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			const existingUser = await this.userRepository.findAndCount({ where: { username: createUserDto.username } })
			if (existingUser[1] != 0) {
				throw new BadRequestException(`${createUserDto.username} is used`)
			}
			const user = new User()
			user.username = createUserDto.username
			user.password = await bcrypt.hash(createUserDto.password, 10)

			const createdUser = await this.userRepository.save(user)
			return createdUser
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async changePassword(changePasswordDto: ChangePasswordReqDto): Promise<ChangePasswordResDto> {
		try {
			const existingUser = await this.userRepository.findOne({ where: { username: 'thetkpark' } })
			const oldPasswordMatch = await bcrypt.compare(changePasswordDto.oldPassword, existingUser.password)
			if (!oldPasswordMatch) throw new BadRequestException(`Old password doesn't match`)
			existingUser.password = await bcrypt.hash(changePasswordDto.newPassword, 10)
			await this.userRepository.save(existingUser)
			return new ChangePasswordResDto(true)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}
}

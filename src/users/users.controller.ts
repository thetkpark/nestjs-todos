import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { UserService } from './users.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto)
	}
}

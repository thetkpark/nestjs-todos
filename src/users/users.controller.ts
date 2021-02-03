import { Body, Controller, Get, Patch, Post } from '@nestjs/common'
import { ChangePasswordReqDto } from './dto/change-password.dto'
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

	@Patch()
	changePassword(@Body() changePasswordDto: ChangePasswordReqDto) {
		return this.userService.changePassword(changePasswordDto)
	}
}

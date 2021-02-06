import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChangePasswordReqDto } from './dto/change-password.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { UserService } from './users.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getUser(@Request() req) {
		console.log(req.user)
		return this.userService.findOne(req.user.sub)
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto)
	}

	@Patch()
	changePassword(@Body() changePasswordDto: ChangePasswordReqDto) {
		return this.userService.changePassword(changePasswordDto)
	}
}

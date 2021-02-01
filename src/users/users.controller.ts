import { Controller, Post } from '@nestjs/common'
import { UserService } from './users.service'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/')
	createNewUser() {}
}

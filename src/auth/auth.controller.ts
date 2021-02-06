import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req) {
		return this.authService.login(req.user.id)
	}
}

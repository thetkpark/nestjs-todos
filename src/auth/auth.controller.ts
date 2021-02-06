import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req, @Res({ passthrough: true }) res: Response) {
		const jwt = await this.authService.login(req.user.id)
		res.cookie('token', jwt, { httpOnly: true })
	}
}

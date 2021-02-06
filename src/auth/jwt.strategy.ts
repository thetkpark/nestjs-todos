import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from '../users/users.service'

const fromCookieCustom = req => {
	// tell passport to read JWT from cookies
	let token = null
	if (req && req.cookies) {
		token = req.cookies.token
	}
	return token
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: fromCookieCustom,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate(payload: any) {
		return this.userService.findOne(payload.sub)
	}
}

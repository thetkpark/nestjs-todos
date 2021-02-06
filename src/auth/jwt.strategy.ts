import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

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
	constructor() {
		console.log(process.env.JWT_SECRET)
		super({
			jwtFromRequest: fromCookieCustom,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate(payload: any) {
		return { sub: payload.sub }
	}
}

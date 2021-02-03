export class ChangePasswordReqDto {
	oldPassword: string
	newPassword: string
}

export class ChangePasswordResDto {
	constructor(status: boolean) {
		this.success = status
	}
	success: boolean
}

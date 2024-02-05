export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly cpassword: string;
    readonly address: string;
    readonly number: Number;
    readonly firstName: string;
    readonly lastName: string;
    readonly registerOtp: string;
    readonly otp: string;
}

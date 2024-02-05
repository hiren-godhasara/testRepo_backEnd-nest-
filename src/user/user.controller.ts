// src/user/user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        return { message: 'User registered successfully', data: user };
    }

    @Post('login')
    async loginUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.loginUser(createUserDto);
        return { message: 'User loggedin successfully' };
    }


}

const nodemailer = require('nodemailer');
import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { validateEmail } from 'src/commmonFunction/emailValidate';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async createUser(createUserDto) {

        const { email, number, password, countryCode } = createUserDto;
        if (!email || !number || !password || !countryCode) {
            throw new ConflictException('Please fill mandatory fields');
        }

        if (email) validateEmail(email);
        const existingEmail = await this.userModel.findOne({ email }).exec();
        if (existingEmail) throw new ConflictException(`The user with the email ${email} already exists`);
        const existingNumber = await this.userModel.findOne({ number }).exec();
        if (existingNumber) throw new ConflictException(`The user with the number  ${number} already exists`);
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = new this.userModel({ email, number, countryCode, password: hashedPassword });
        return await createdUser.save();

    }







    async loginUser(createUserDto) {
        const { email, password, number, countryCode } = createUserDto;
        if (email) {
            validateEmail(email);
            if (!email || !password) {
                throw new ConflictException('Please fill mandatory fields');
            }
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) throw new NotFoundException('User not found.');
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        }

        if (number) {
            if (!number || !password || !countryCode) {
                throw new ConflictException('Please fill mandatory fields');
            }
            const users = await this.userModel.findOne({ $and: [{ countryCode }, { number }] }).exec();
            if (!users) throw new NotFoundException('Users not found.');
            const isMatch = await bcrypt.compare(password, users.password)
            if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        }
        return;
    }


}

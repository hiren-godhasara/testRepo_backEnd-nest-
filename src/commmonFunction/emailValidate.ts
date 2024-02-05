import { BadRequestException } from "@nestjs/common";

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.match(emailRegex)) {
        throw new BadRequestException('Invalid email format.');
    }
}




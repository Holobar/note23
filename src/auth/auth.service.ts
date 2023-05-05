import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {
    }

    async signIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new NotFoundException("Wrong email");
        }
        if (!(await bcrypt.compare(password,user.password))) {
            throw new BadRequestException('Password missmatch');
        }
        const payload = {
            "email":user.email,
            "sub": user.id
        };
        const accessToken = this.jwtService.sign(payload);
        const tokenString:string = `Access_token=${accessToken}; HttpOnly; Path=/; Max-Age=1d`;
        return tokenString;
    }
}
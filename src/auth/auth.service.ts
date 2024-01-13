import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from "./schemas/user.schema";
import {Model} from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}


    async register(registerDto: RegisterDto): Promise<{token: string}> {    
        const {name, email, password} = registerDto;
       
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword
        });

        const token = this.jwtService.sign({ id: user._id});

        return {token};
    }

    async login(loginDto: LoginDto) : Promise<{token: string}> {    
        const {email, password} = loginDto;
       
        const user = await this.userModel.findOne({email});

        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id});

        return {token};
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        private jwt: JwtService
    ) {}

    async signUp(dto: SignUpDto) {
        const { email, password, firstName, lastName, role } = dto;

        try {
            // Check if user with this email exists
            const userExist = await this.userModel.findOne({ email });
            if (userExist) {
                throw new Error('Email already exists');
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);
            // Create a new user
            const newUser = await this.userModel.create({
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                password: hashedPassword,
                role: dto.role
            });

            return {
                message: 'User created successfully',
                user: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    role: dto.role
                }
            };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async signIn(dto: SignInDto, req: Request, res: Response) {
        const { email, password } = dto;

        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('Email does not exist');
        }

        // Validate the password
        const isPasswordValid = await this.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Sign the token
        const token = await this.signToken({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        });
        res.cookie('token', token, { httpOnly: true, secure: false }); // secure: true in production
        // console.log(token);
        return res.send({
            message: 'User signed in successfully',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    }

    async getMe(token: string) {
        try {
            const decodedToken = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
        
            const { id, email, firstName, lastName, role } = decodedToken;
        
            return { id, email, firstName, lastName, role };
          } catch (error) {
            throw new UnauthorizedException('Invalid token');
          }
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token');
        return res.send({ message: 'Logged out succefully' });
    }


    decodeToken(token: string): any {
        try {
            // Verify and decode the token
            const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });

            return decoded;
        } catch (error) {
            // Handle decoding errors, e.g., invalid token or expired token
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
    async signToken(args: { id: Types.ObjectId; email: string, firstName: string, lastName: string, role: string }) {
        const payload = {
            id: args.id,
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            role: args.role
        };

        const token = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });

        return token;
    }
    async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

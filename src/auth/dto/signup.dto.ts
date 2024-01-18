import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schema/user.schema';

export class SignUpDto {
    @ApiProperty()
    readonly firstName: string;
    @ApiProperty()
    readonly lastName: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly role: Role;
}
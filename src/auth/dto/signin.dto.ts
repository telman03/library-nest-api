import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schema/user.schema';

export class SignInDto {

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;
}
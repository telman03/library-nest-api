import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/schema/user.schema";

export class CreateBookDto {
    @ApiProperty()    
    readonly title: string;
    @ApiProperty()
    readonly author: string;
    @ApiProperty()
    readonly description: string; 
    @ApiProperty()
    readonly category: string;
    @ApiProperty()
    readonly price: number;
    user: any;
}
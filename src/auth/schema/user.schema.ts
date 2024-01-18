import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema({ 
    timestamps: true
})

export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;


    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
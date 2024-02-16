import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


// The @Schema() decorator is used to define a schema for a document in MongoDB.
export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema({ 
    timestamps: true
})

// The @Prop() decorator is used to define a property for a schema.
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
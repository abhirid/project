import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['male', 'female'], default: 'male' })
  gender: string;

  @Prop({ required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

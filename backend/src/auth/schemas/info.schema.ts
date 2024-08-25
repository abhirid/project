import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Info extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  month: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: Number })
  salary: number;
}

export const InfoSchema = SchemaFactory.createForClass(Info);

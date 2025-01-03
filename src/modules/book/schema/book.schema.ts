import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: mongoose.ObjectId;
    @Prop({ required: true })
    title: string;
    @Prop()
    category: string;
    @Prop({ required: true })
    author: string;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true, default: 0 })
    rating: number;
    @Prop({ required: true, default: 0})
    numberOfRatings: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
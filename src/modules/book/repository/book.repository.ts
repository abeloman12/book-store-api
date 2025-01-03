import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schema/book.schema';
import { BookRatingUpdateDTO, CreateBookRequestDTO } from '../dto/BookDTO';

@Injectable()
export class BookRepo {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(book: CreateBookRequestDTO): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getById(bookId: string): Promise<Book> {
    return this.bookModel.findById(bookId);
  }

  update(bookId: string, toBeUpdatedPayload: BookRatingUpdateDTO): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(bookId, toBeUpdatedPayload, { new: true });
  }

  delete(bookId: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(bookId);
  }
}

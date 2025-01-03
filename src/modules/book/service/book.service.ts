import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BookRepo } from '../repository/book.repository';
import { Book } from '../schema/book.schema';
import { BookRatingRequestDTO, BookRatingUpdateDTO, CreateBookRequestDTO } from '../dto/BookDTO';

@Injectable()
export class BookService {
  constructor(private bookRepo: BookRepo) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepo.getAll();
  }

  async getBookById(bookId: string): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookRepo.getById(bookId)
        .then((result: Book) => {
          if (result) resolve(result);
          else throw new NotFoundException(`Book with ID ${bookId} not found`)
        })
        .catch((error: any) => reject(error))
    });
  }

  async createBook(book: CreateBookRequestDTO): Promise<Book> {
    return this.bookRepo.create(book)
  }
  
  async addRating(bookId: string, newRating: number): Promise<Book> {
    const book = await this.bookRepo.getById(bookId);

    const updatedRating: BookRatingUpdateDTO = new BookRatingUpdateDTO()

    updatedRating.rating = ((book.rating * book.numberOfRatings) + newRating)/(book.numberOfRatings + 1);
    updatedRating.numberOfRatings = book.numberOfRatings + 1

    return new Promise((resolve, reject) => {
      this.bookRepo.update(bookId, updatedRating)
        .then((result: Book) => {
          if (result) resolve(result);
          else throw new InternalServerErrorException(`Book with ID ${bookId} not updated`)
        })
        .catch((error: any) => reject(error))
    });
  }

  async deleteBook(bookId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bookRepo.getById(bookId)
        .then((result: Book) => {
          if (result) resolve(`Book with ID ${bookId} deleted successfully!`);
          else throw new InternalServerErrorException(`Book with ID ${bookId} not deleted`)
        })
        .catch((error: any) => reject(error))
    });
  }
}

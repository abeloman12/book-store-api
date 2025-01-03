import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { BookService } from "../service/book.service";
import { Book } from "../schema/book.schema";
import { BookRatingRequestDTO, CreateBookRequestDTO } from "../dto/BookDTO";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(201)
  create(@Body() book: CreateBookRequestDTO): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Put(':bookId')
  @HttpCode(201)
  submitRating(@Param() params: any, @Body() bookRating: BookRatingRequestDTO): Promise<Book> {
    return this.bookService.addRating(params.bookId, bookRating.rating)
  }

  @Get(':bookId')
  findById(@Param() params: any): Promise<Book> {
    return this.bookService.getBookById(params.bookId)
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Delete(':bookId')
  delete(@Param() params: any): Promise<string> {
    return this.bookService.deleteBook(params.bookId)
  }
}

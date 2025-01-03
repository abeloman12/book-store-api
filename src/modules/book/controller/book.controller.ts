import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { BookService } from "../service/book.service";
import { Book } from "../schema/book.schema";
import { BookRatingRequestDTO, CreateBookRequestDTO } from "../dto/BookDTO";
import { Cache, CacheInterceptor } from "@nestjs/cache-manager";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, 
    private cacheManager: Cache) {}

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

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Delete(':bookId')
  delete(@Param() params: any): Promise<string> {
    return this.bookService.deleteBook(params.bookId)
  }
}

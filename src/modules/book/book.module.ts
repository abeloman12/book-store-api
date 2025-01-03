import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { BookRepo } from './repository/book.repository';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    CacheModule.register({
      ttl: 10000, // Cache Time-to-Live (TTL) in milli seconds
      max: 100, // Maximum number of items to cache
    })
  ],
  controllers: [BookController],
  providers: [BookService, BookRepo],
})
export class BookModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://abeloman12:UFVMHHAf19vNIdiT@testcluster.04dog.mongodb.net/BookStore?retryWrites=true&w=majority&appName=TestCluster'),
    BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

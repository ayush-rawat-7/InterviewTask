import { Module } from '@nestjs/common';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './models/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity])
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogsModule { }

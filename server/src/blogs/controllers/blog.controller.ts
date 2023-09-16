import { Controller, Body, UploadedFile, Post, Get, Put, Delete, Param, } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.interface';
import { Observable, from } from 'rxjs';
// import { FileInterceptor, } from '@nestjs/platform-express';
// import { UseInterceptors } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post()
    // @UseInterceptors(FileInterceptor('profileImage'))
    create(@Body() blog: Blog): Observable<Blog> {
        return this.blogService.createBlog(blog);
    }

    @Get()
    blogs(): Observable<Blog[]> {
        return this.blogService.getBlogs()
    }

    @Get(":id")
    blog(@Param('id') id: number): Observable<Blog> {
        return this.blogService.getSingleBlog(id)
    }

    @Put(":id")
    fetchBlog(@Param('id') id: number, @Body() blogData: Blog): Observable<UpdateResult> {
        return this.blogService.updateBlog(id, blogData)
    }

    @Delete(":id")
    deleteBlog(@Param('id') id: number): Observable<DeleteResult> {
        return this.blogService.deleteBlog(id);
    }
}

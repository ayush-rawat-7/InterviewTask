import { Injectable } from '@nestjs/common';
import { BlogEntity } from '../models/blog.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../models/blog.interface';
import { Observable, from } from 'rxjs';


@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntity)
        private readonly blogPostRepository: Repository<BlogEntity>
    ) { }

    createBlog(blog: Blog): Observable<Blog> {
        // admin.storage().bucket()
        return from(this.blogPostRepository.save(blog));
    }

    getBlogs(): Observable<Blog[]> {
        return from(this.blogPostRepository.find());
    }

    getSingleBlog(id): Observable<Blog> {
        return from(this.blogPostRepository.findOne({ where: { id: id } }));
    }

    updateBlog(blogId, blogData): Observable<UpdateResult> {
        return from(this.blogPostRepository.update(blogId, blogData))
    }

    deleteBlog(blogId): Observable<DeleteResult> {
        return from(this.blogPostRepository.delete(blogId))
    }
}

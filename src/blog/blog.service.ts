import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "../entities/blog.entity";
import {DeleteResult, Repository} from "typeorm";
import {use} from "passport";

@Injectable()
export class BlogService {

  constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {
  }

  async create(user_id: number,createBlogDto: CreateBlogDto) {
    const data = {...createBlogDto, user: {id: user_id}, category: {id: createBlogDto.category_id}};
    const blog = this.blogRepository.create(data);
    return await this.blogRepository.save(blog);
  }

  async findAll() : Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: number) : Promise<Blog> {
    return await this.blogRepository.findOne({
      where : {id},
      relations: ['user']
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    await this.blogRepository.update(id, updateBlogDto);
    return this.findOne(id);
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.blogRepository.delete(id);
  }
}

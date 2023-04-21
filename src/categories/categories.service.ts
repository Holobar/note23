import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "../entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {User} from "../entities/user.entity";

@Injectable()
export class CategoriesService {
  constructor(
      @InjectRepository(Category) private readonly categoryRepository:Repository<Category>
  ) {
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async findAll() : Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number) : Promise<Category> {
    return this.categoryRepository.findOneBy({id});
  }


  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    await this.categoryRepository.update(id,updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) : Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}

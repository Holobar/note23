import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {User} from "../entities/user.entity";
import * as readline from "readline";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {DeleteResult} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Get()
    async findAll() :Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id:number) : Promise<User>{
        return this.userService.findById(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:number) : Promise<DeleteResult>{
        return this.userService.delete(id);
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateUserDto: UpdateUserDto) : Promise<User>{
        return this.userService.update(id,updateUserDto);
    }
}

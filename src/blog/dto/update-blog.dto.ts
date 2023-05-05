import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import {IsNotEmpty, IsOptional} from "class-validator";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @IsOptional()
    title?: string;

    @IsOptional()
    content?: string;

    @IsOptional()
    category_id?: number;
}

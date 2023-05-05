import {IsNotEmpty} from "class-validator";

export class CreateBlogDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    category_id: number;
}
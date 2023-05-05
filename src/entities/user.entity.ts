import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Blog} from "./blog.entity";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Blog, (blog: Blog) => blog.user)
    blogs: Blog[];
}
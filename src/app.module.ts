import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
            UserModule, DatabaseModule,
            TypeOrmModule.forRoot({
              type: "postgres",
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT,10),
              username: process.env.DATABASE_USERNAME,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
              autoLoadEntities: true,
              entities: [],
              synchronize: true
            })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

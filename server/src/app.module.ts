import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/chat-app'),
    AuthModule,
    ThreadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

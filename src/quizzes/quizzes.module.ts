import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule { }

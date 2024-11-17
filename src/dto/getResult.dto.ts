import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional } from 'class-validator';

class AnswerDto {
    @IsNumber()
    questionId: number;

    @IsNumber()
    selectedOption: number;

    @IsBoolean()
    isCorrect: boolean;
}

export class GetResultDto {
    @IsNumber()
    quizId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    score: number;

    @IsArray()
    answers: AnswerDto[];
}

import { IsNumber } from "class-validator";

export class SubmitQuizDto {

    @IsNumber()
    quizId: number;

    @IsNumber()
    userId: number;
}

import { IsNumber, IsInt, IsIn } from 'class-validator';

export class SubmitAnswerDto {
    @IsNumber()
    @IsInt()
    questionId: number;

    @IsNumber()
    @IsInt()
    @IsIn([1, 2, 3, 4], { message: 'Options should be either 1, 2, 3 or 4' })
    selectedOption: number;

    @IsNumber()
    @IsInt()
    userId: number;
}

import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsArray()
    @ArrayMinSize(4)
    options: string[];

    @IsNotEmpty()
    correct_option: number;
}

export class CreateQuizDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
}

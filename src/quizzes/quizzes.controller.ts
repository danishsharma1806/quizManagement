// src/quizzes/quizzes.controller.ts
import { Controller, Post, Body, Get, Param, Res, UsePipes, HttpException } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'src/dto/createQuiz.dto';
import { Response } from 'express';
import { SubmitAnswerDto } from 'src/dto/submitAnswer.dto';
import { SubmitQuizDto } from 'src/dto/submitQuiz.dto';
import { STATUS_CODES } from 'src/types/response';


@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }

    /**
     * Endpoint to create a new quiz with a set of questions.
     * 
     * @param createQuizDto - The DTO containing the quiz title and questions data.
     * @param res - The HTTP response object.
     * 
     * @returns A response with the created quiz's details.
     */

    @Post('/createQuiz')
    @UsePipes()
    async createQuiz(@Body() createQuizDto: CreateQuizDto, @Res() res: Response) {
        const serviceResponse = await this.quizzesService.createQuiz(createQuizDto);
        res.status(serviceResponse.statusCode).json({ ...serviceResponse });
    }

    /**
     * Endpoint to fetch a quiz by its ID.
     * 
     * @param quizId - The ID of the quiz to retrieve.
     * @param res - The HTTP response object.
     * 
     * @returns The details of the quiz without the correct answers.
     * @throws HttpException - If the quiz ID is not provided.
     */

    @Get('/getQuizById/:id')
    @UsePipes()
    async getQuiz(@Param('id') quizId: string, @Res() res: Response) {
        if (!quizId) throw new HttpException('QuizId required', STATUS_CODES.VALIDATION_ERROR);
        const serviceResponse = await this.quizzesService.getQuizById(parseInt(quizId));
        res.status(serviceResponse.statusCode).json({ ...serviceResponse });
    }

    /**
     * Endpoint to submit an answer for a specific question in a quiz.
     * 
     * @param quizId - The ID of the quiz to which the question belongs.
     * @param submitAnswerDto - The DTO containing the question ID and selected answer.
     * @param res - The HTTP response object.
     * 
     * @returns A response with the result of the answer submission.
     */

    @Post('/submitAnswer/:quizId')
    @UsePipes()
    async submitAnswer(
        @Param('quizId') quizId: string,
        @Body() submitAnswerDto: SubmitAnswerDto,
        @Res() res: Response,
    ) {
        const serviceResponse = await this.quizzesService.submitAnswer(parseInt(quizId), submitAnswerDto);
        return res.status(serviceResponse.statusCode).json(serviceResponse);
    }

    /**
     * Endpoint to get the user's results for a specific quiz.
     * 
     * @param quizId - The ID of the quiz for which the results are fetched.
     * @param userId - The ID of the user for whom the results are fetched.
     * @param res - The HTTP response object.
     * 
     * @returns A response with the user's score, answers, and other result details.
     * @throws HttpException - If the quizId or userId is not provided.
     */

    @Get(':quizId/results/:userId')
    @UsePipes()
    async getQuizResult(
        @Param('quizId') quizId: string,
        @Param('userId') userId: string,
        @Res() res: Response,
    ) {
        if (!quizId && !userId) throw new HttpException('UserId and QuizId required', STATUS_CODES.VALIDATION_ERROR);
        const serviceResponse = await this.quizzesService.getQuizResult(parseInt(quizId), parseInt(userId));
        return res.status(serviceResponse.statusCode).json(serviceResponse);
    }

    /**
     * Endpoint to submit all answers for a quiz and calculate the score.
     * 
     * @param submitQuizDto - The DTO containing the quizId, userId, and the list of answers.
     * @param res - The HTTP response object.
     * 
     * @returns A response with the user's final score, including a summary of correct/incorrect answers.
     */

    @Post('/submitQuiz')
    @UsePipes()
    async submitQuiz(
        @Body() submitQuizDto: SubmitQuizDto,
        @Res() res: Response,
    ) {
        const serviceResponse = await this.quizzesService.submitQuiz(submitQuizDto);
        return res.status(serviceResponse.statusCode).json(serviceResponse);

    }

}

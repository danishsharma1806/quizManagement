import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Question, Quiz, Result, UserAnswers } from 'src/database/quiz.model';
import { CreateQuizDto } from 'src/dto/createQuiz.dto';
import { SubmitAnswerDto } from 'src/dto/submitAnswer.dto';
import { SubmitQuizDto } from 'src/dto/submitQuiz.dto';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/types/response';
import { ApiResponse } from 'src/types/types';

@Injectable()
export class QuizzesService {
    private quizzes: Quiz[] = [];
    private userAnswers: UserAnswers[] = [];
    private quizResults: Result[] = [];

    async createQuiz(createQuizDto: CreateQuizDto): Promise<ApiResponse> {
        try {
            const existingQuiz = this.quizzes.find(quiz => quiz.title === createQuizDto.title);
            if (existingQuiz) {
                throw new HttpException(
                    RESPONSE_MESSAGES.ERROR.QUIZ_ALREADY_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const newQuiz = new Quiz();
            newQuiz.id = this.quizzes.length + 1;
            newQuiz.title = createQuizDto.title;

            newQuiz.questions = createQuizDto.questions.map((question, index) => {
                const newQuestion: Question = {
                    ...question,
                    id: index + 1,
                };
                return newQuestion;
            });

            this.quizzes.push(newQuiz);
            return {
                statusCode: STATUS_CODES.CREATED,
                data: newQuiz,
                message: RESPONSE_MESSAGES.SUCCESS.QUIZ_CREATED_SUCCESSFULLY,
            }
        } catch (error) {
            throw new HttpException(
                error.message || RESPONSE_MESSAGES.ERROR.FAILED_TO_CREATE_THE_QUIZ,
                error.status
            );
        }
    }

    private getQuizdto(quiz: Quiz) {
        return {
            id: quiz.id,
            title: quiz.title,
            questions: quiz.questions.map(question => {
                return {
                    id: question.id,
                    text: question.text,
                    options: question.options
                }
            })
        }
    }

    async getQuizById(id: number): Promise<ApiResponse> {
        try {
            const quiz = this.quizzes.find(quiz => quiz.id === id);
            if (!quiz) {
                throw new HttpException(
                    RESPONSE_MESSAGES.ERROR.QUIZ_NOT_FOUND,
                    STATUS_CODES.NOT_FOUND,
                );
            }

            return {
                statusCode: STATUS_CODES.OK,
                data: this.getQuizdto(quiz),
                message: RESPONSE_MESSAGES.SUCCESS.QUIZ_FETCHED_SUCCESSFULLY,
            }
        } catch (error) {
            throw new HttpException(
                error.message || RESPONSE_MESSAGES.ERROR.FAILED_TO_FETCH_THE_QUIZ,
                error.status
            );
        }
    }

    async submitAnswer(
        quizId: number,
        submitAnswerDto: SubmitAnswerDto,
    ): Promise<ApiResponse> {
        try {
            const quiz = this.quizzes.find(quiz => quiz.id === quizId);
            if (!quiz) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.QUIZ_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const question = quiz.questions.find(
                question => question.id === submitAnswerDto.questionId,
            );

            if (!question) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.QUESTION_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const isAnswerSubmitted = this.userAnswers.find(userAnswers =>
                userAnswers.userId == submitAnswerDto.userId &&
                userAnswers.quizId == quizId &&
                userAnswers.questionId == submitAnswerDto.questionId
            )

            if (isAnswerSubmitted) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.ANSWER_ALREADY_SUBMITTED, HttpStatus.NOT_FOUND);
            }

            const isCorrect = question.correct_option == submitAnswerDto.selectedOption;

            this.userAnswers.push({
                quizId,
                userId: submitAnswerDto.userId,
                questionId: submitAnswerDto.questionId,
                selectedOption: submitAnswerDto.selectedOption,
                isCorrect: isCorrect,
            });

            return {
                statusCode: STATUS_CODES.OK,
                message: isCorrect
                    ? RESPONSE_MESSAGES.SUCCESS.CORRECT_ANSWER
                    : RESPONSE_MESSAGES.ERROR.INCORRECT_ANSWER + `. The correct answer is ${question.options[question.correct_option - 1]}`,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async submitQuiz(submitQuizDto: SubmitQuizDto) {
        try {
            const quiz = this.quizzes.find(quiz => quiz.id === submitQuizDto.quizId);
            if (!quiz) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.QUIZ_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const userAnswers = this.userAnswers.filter(ans => ans.quizId === submitQuizDto.quizId && ans.userId === submitQuizDto.userId);
            if (!userAnswers || userAnswers.length === 0) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.NO_ANSWERS_FOUND, HttpStatus.NOT_FOUND);
            }

            let score = 0;
            const answerSummary = userAnswers.map(answer => {
                const question = quiz.questions.find(quiz => quiz.id === answer.questionId);
                if (!question) return;

                const isCorrect = question.correct_option === answer.selectedOption;
                if (isCorrect) score += 4;

                return {
                    question_id: answer.questionId,
                    selected_option: answer.selectedOption,
                    is_correct: isCorrect,
                };
            });

            this.quizResults.push({
                quiz_id: submitQuizDto.quizId,
                user_id: submitQuizDto.userId,
                score: score,
                answers: answerSummary
            })
            return {
                statusCode: STATUS_CODES.OK,
                message: RESPONSE_MESSAGES.SUCCESS.QUIZ_SUBMITTED_SUCCESSFULLY,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getQuizResult(quizId: number, userId: number): Promise<ApiResponse> {
        try {
            const quizResult = this.quizResults.find(quizResults => quizResults.quiz_id == quizId && quizResults.user_id == userId);
            if (!quizResult) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.RESULT_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: STATUS_CODES.OK,
                message: RESPONSE_MESSAGES.SUCCESS.RESULT_FETCHED_SUCCESSFULLY,
                data: quizResult
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

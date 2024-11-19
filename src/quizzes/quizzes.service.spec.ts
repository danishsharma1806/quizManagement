import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'src/dto/createQuiz.dto';
import { SubmitAnswerDto } from 'src/dto/submitAnswer.dto';
import { SubmitQuizDto } from 'src/dto/submitQuiz.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/types/response';

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizzesService],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case for creating a quiz
  describe('createQuiz', () => {
    it('should create a new quiz successfully', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const result = await service.createQuiz(createQuizDto);

      expect(result.statusCode).toBe(STATUS_CODES.CREATED);
      expect(result.data).toHaveProperty('id');
      expect(result.data.title).toBe(createQuizDto.title);
      expect(result.message).toBe(RESPONSE_MESSAGES.SUCCESS.QUIZ_CREATED_SUCCESSFULLY);
    });

    it('should throw an error if quiz already exists', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      await service.createQuiz(createQuizDto);

      await expect(service.createQuiz(createQuizDto)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.QUIZ_ALREADY_EXIST, HttpStatus.BAD_REQUEST),
      );
    });
  });

  // Test case for getting a quiz by ID
  describe('getQuizById', () => {
    it('should return a quiz by id', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const result = await service.getQuizById(quizId);

      expect(result.statusCode).toBe(STATUS_CODES.OK);
      expect(result.data).toHaveProperty('id', quizId);
      expect(result.message).toBe(RESPONSE_MESSAGES.SUCCESS.QUIZ_FETCHED_SUCCESSFULLY);
    });

    it('should throw an error if quiz not found', async () => {
      const quizId = 999;
      await expect(service.getQuizById(quizId)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.QUIZ_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });

  // Test case for submitting an answer
  describe('submitAnswer', () => {
    it('should submit an answer correctly', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const submitAnswerDto: SubmitAnswerDto = {
        userId: 1,
        questionId: 1,
        selectedOption: 1,
      };

      const result = await service.submitAnswer(quizId, submitAnswerDto);

      expect(result.statusCode).toBe(STATUS_CODES.OK);
      expect(result.message).toBe(RESPONSE_MESSAGES.SUCCESS.CORRECT_ANSWER);
    });

    it('should throw an error if the answer is already submitted for a question', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const submitAnswerDto: SubmitAnswerDto = {
        userId: 1,
        questionId: 1,
        selectedOption: 1,
      };

      await service.submitAnswer(quizId, submitAnswerDto);

      await expect(service.submitAnswer(quizId, submitAnswerDto)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.ANSWER_ALREADY_SUBMITTED, HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an error if the question is not found in the quiz', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const submitAnswerDto: SubmitAnswerDto = {
        userId: 1,
        questionId: 999, // Non-existent question ID
        selectedOption: 1,
      };

      await expect(service.submitAnswer(quizId, submitAnswerDto)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.QUESTION_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });

  // Test case for submitting a quiz
  describe('submitQuiz', () => {
    it('should submit the quiz and return a score', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const submitAnswerDto: SubmitAnswerDto = {
        userId: 1,
        questionId: 1,
        selectedOption: 1,
      };

      await service.submitAnswer(quizId, submitAnswerDto);

      const submitQuizDto: SubmitQuizDto = {
        quizId,
        userId: 1,
      };

      const result = await service.submitQuiz(submitQuizDto);

      expect(result.statusCode).toBe(STATUS_CODES.OK);
      expect(result.message).toBe(RESPONSE_MESSAGES.SUCCESS.QUIZ_SUBMITTED_SUCCESSFULLY);
    });

    it('should throw an error if no answers are found for the user', async () => {
      const submitQuizDto: SubmitQuizDto = {
        quizId: 1, // Non-existent quiz ID
        userId: 1,
      };

      await expect(service.submitQuiz(submitQuizDto)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.QUIZ_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });

  // Test case for getting quiz result
  describe('getQuizResult', () => {
    it('should return quiz result for a user', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: 1 },
        ],
      };

      const createdQuiz = await service.createQuiz(createQuizDto);
      const quizId = createdQuiz.data.id;

      const submitAnswerDto: SubmitAnswerDto = {
        userId: 1,
        questionId: 1,
        selectedOption: 1,
      };

      await service.submitAnswer(quizId, submitAnswerDto);

      const submitQuizDto: SubmitQuizDto = {
        quizId,
        userId: 1,
      };

      await service.submitQuiz(submitQuizDto);

      const result = await service.getQuizResult(quizId, 1);

      expect(result.statusCode).toBe(STATUS_CODES.OK);
      expect(result.data).toHaveProperty('score');
      expect(result.message).toBe(RESPONSE_MESSAGES.SUCCESS.RESULT_FETCHED_SUCCESSFULLY);
    });

    it('should throw an error if result is not found', async () => {
      await expect(service.getQuizResult(999, 1)).rejects.toThrowError(
        new HttpException(RESPONSE_MESSAGES.ERROR.RESULT_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });
});

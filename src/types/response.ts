import { HttpStatus } from '@nestjs/common';

export const STATUS_CODES = {
    OK: HttpStatus.OK,
    CREATED: HttpStatus.CREATED,
    ACCEPTED: HttpStatus.ACCEPTED,
    NO_CONTENT: HttpStatus.NO_CONTENT,
    PARTIAL_CONTENT: HttpStatus.PARTIAL_CONTENT,

    CONFLICT: HttpStatus.CONFLICT,
    NOT_FOUND: HttpStatus.NOT_FOUND,
    UNAUTHORIZED: HttpStatus.FORBIDDEN,
    BAD_REQUEST: HttpStatus.BAD_REQUEST,
    UNAUTHENTICATED: HttpStatus.UNAUTHORIZED,
    NOT_ACCEPTABLE: HttpStatus.NOT_ACCEPTABLE,
    REQUEST_TIMEOUT: HttpStatus.REQUEST_TIMEOUT,
    PAYMENT_REQUIRED: HttpStatus.PAYMENT_REQUIRED,
    TOO_MANY_REQUESTS: HttpStatus.TOO_MANY_REQUESTS,
    PAYLOAD_TOO_LARGE: HttpStatus.PAYLOAD_TOO_LARGE,
    VALIDATION_ERROR: HttpStatus.EXPECTATION_FAILED,
    METHOD_NOT_ALLOWED: HttpStatus.METHOD_NOT_ALLOWED,
    UNPROCESSABLE_ENTITY: HttpStatus.UNPROCESSABLE_ENTITY,
    UNSUPPORTED_MEDIA_TYPE: HttpStatus.UNSUPPORTED_MEDIA_TYPE,

    BAD_GATEWAY: HttpStatus.BAD_GATEWAY,
    GATEWAY_TIMEOUT: HttpStatus.GATEWAY_TIMEOUT,
    NOT_IMPLEMENTED: HttpStatus.NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
    INTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
}

export const RESPONSE_MESSAGES = {
    ERROR: {
        UNKNOWN_ERROR: 'Unknown error',
        FAILED_TO_FETCH_THE_QUIZ: "Failed to fetch the Quiz",
        FAILED_TO_CREATE_THE_QUIZ: "Failed to create the Quiz",
        QUIZ_NOT_FOUND: "Quiz not found",
        RESULT_NOT_FOUND: "Result not found for the User",
        QUIZ_ALREADY_EXIST: "Quiz with this title already exists",
        QUESTION_NOT_FOUND: "Question not found",
        NO_ANSWERS_FOUND: "No answers found for the user",
        INCORRECT_ANSWER: "Incorrect answer!",
        ANSWER_ALREADY_SUBMITTED: "Answer already submitted",
    },
    SUCCESS: {
        REQUEST_SUCCESSFUL: 'Request successful',
        TAG_CREATED_SUCCESSFULLY: 'Tag created successfully',
        QUIZ_CREATED_SUCCESSFULLY: "Quiz created successfully",
        QUIZ_FETCHED_SUCCESSFULLY: "Quiz fetched successfully",
        CORRECT_ANSWER: "Correct answer!",
        RESULT_FETCHED_SUCCESSFULLY: "Result fetched successfully",
        QUIZ_SUBMITTED_SUCCESSFULLY: "Quiz submitted successfully"
    }
}
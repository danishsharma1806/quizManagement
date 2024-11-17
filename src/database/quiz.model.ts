export class Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

export class Answer {
    question_id: number;
    selected_option: number;
    is_correct: boolean;
}

export class Result {
    quiz_id: number;
    user_id: number;
    score: number;
    answers: Answer[];
}

export class Quiz {
    id: number;
    title: string;
    questions: Question[];
}

export class UserAnswers {
    quizId: number;
    userId: number;
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
}

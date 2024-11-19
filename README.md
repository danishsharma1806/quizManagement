<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

---

## Quiz Management System

A simple **Quiz Management System** built with the [NestJS](https://nestjs.com) framework. This system allows users to create quizzes, take quizzes, submit answers, and view results.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)

---

## Project Description

The **Quiz Management System** allows users to:
- Create quizzes with multiple questions and answer options.
- Take quizzes and submit answers.
- Get immediate feedback on whether their answers are correct.
- View quiz results with scores after submission.

The application is built using **NestJS** (a Node.js framework) and utilizes **TypeScript** for type safety.

---

## Features

- Create and manage quizzes with multiple questions.
- Support multiple-choice answers with one correct answer per question.
- Submit answers and get instant feedback.
- Track and display user scores after submitting the quiz.

---

## Prerequisites

Before starting, make sure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (Node package manager)
- **Git** (for cloning the repository)

---

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/danishsharma1806/quizManagement.git

2. Navigate to the project directory:

  cd quiz

3. Install the project dependencies:

  npm install

4. Set up .env file

5. Running the Application

  npm run start

## Usage 
  
  Accessing the Application :- http://localhost:7700

## API Endpoints

Here are the available API endpoints for the **Quiz Management System**.

---

1. Create a New Quiz

- **Method**: `POST`
- **Endpoint**: `/quizzes/createQuiz`
- **Description**: Create a new quiz with multiple questions and answer options.

Example:

  ```bash
  curl --location 'http://localhost:7700/quizzes/createQuiz' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "text": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correct_option": 3
      },
      {
        "text": "What is the largest planet in our solar system?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "correct_option": 3
      }
    ]
  }'
  ```

2. Get Quiz by ID

- **Method**: `GET`
- **Endpoint**: `/quizzes/getQuizById/{quizId}`
- **Description**: Retrieve a quiz by its ID.

Example:

  ```bash
  curl --location 'http://localhost:7700/quizzes/getQuizById/1' \
--data ''
  ```

3. Submit Answer for a Question

- **Method**: `POST`
- **Endpoint**: `/quizzes/submitAnswer/{questionId}`
- **Description**: Submit an answer for a specific question in the quiz.

Example:

  ```bash
  curl --location 'http://localhost:7700/quizzes/submitAnswer/1' \
--header 'Content-Type: application/json' \
--data '{
  "questionId": 2,
  "selectedOption": 2,
  "userId": 1
}'
```

4. Submit a Quiz

- **Method**: `POST`
- **Endpoint**: `/quizzes/submitQuiz`
- **Description**: Submit a completed quiz for evaluation.

Example:

  ```bash
  curl --location 'http://localhost:7700/quizzes/submitQuiz' \
--header 'Content-Type: application/json' \
--data '{
  "quizId": 1,
  "userId": 1
}'
```

5. Get Quiz Results

- **Method**: `POST`
- **Endpoint**: `/quizzes/{quizId}/results/{userId}`
- **Description**: Retrieve the results of a quiz after submission.

Example:

  ```bash
  curl --location 'http://localhost:7700/quizzes/1/results/1' \
--data ''
```


## Testing

This project includes several unit and integration tests to ensure the core functionality works as expected.

---

## Test Cases Overview

1. **Create Quiz**: Verifies that a new quiz is created successfully and tests for errors if the quiz already exists.
2. **Get Quiz by ID**: Ensures that a quiz can be fetched by its ID and handles errors if the quiz is not found.
3. **Submit Answer**: Tests the ability to submit answers to quiz questions and handles errors for duplicate or invalid answers.
4. **Submit Quiz**: Ensures the entire quiz can be submitted after answering questions and tests for errors if no answers are found or the quiz doesn’t exist.
5. **Get Quiz Result**: Verifies that the quiz result (score) can be retrieved after submission and handles errors when results are not found.


## Running Tests and Test Coverage

  npx jest --config jest.config.ts

## Test cases Coverage 

------------------------|---------|----------|---------|---------|---------------------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s               
------------------------|---------|----------|---------|---------|---------------------------------
All files               |   72.06 |    65.51 |   74.19 |   72.43 |                                 
 src                    |   43.33 |      100 |      60 |    37.5 |                                 
  app.controller.ts     |     100 |      100 |     100 |     100 |                                 
  app.module.ts         |       0 |      100 |     100 |       0 | 1-11                            
  app.service.ts        |     100 |      100 |     100 |     100 |                                 
  main.ts               |       0 |      100 |       0 |       0 | 1-14                            
 src/database           |     100 |      100 |     100 |     100 |                                 
  quiz.model.ts         |     100 |      100 |     100 |     100 |                                 
 src/dto                |   64.28 |      100 |       0 |   64.28 |                                 
  createQuiz.dto.ts     |      90 |      100 |       0 |      90 | 28                              
  getResult.dto.ts      |       0 |      100 |     100 |       0 | 1-24                            
  submitAnswer.dto.ts   |     100 |      100 |     100 |     100 |                                 
  submitQuiz.dto.ts     |     100 |      100 |     100 |     100 |                                 
 src/quizzes            |   79.64 |    65.51 |      80 |   81.25 |                                 
  quizzes.controller.ts |   51.72 |        0 |   16.66 |      52 | 27-28,44-46,66-67,88-90,108-109 
  quizzes.module.ts     |       0 |      100 |     100 |       0 | 1-10                            
  quizzes.service.ts    |   96.15 |       76 |     100 |   97.01 | 95,146                          
 src/types              |     100 |      100 |     100 |     100 |                                 
  response.ts           |     100 |      100 |     100 |     100 |                                 
------------------------|---------|----------|---------|---------|---------------------------------

Test Suites: 3 passed, 3 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        4.863 s
Ran all test suites.

## Stay in Touch
  Author: Danish Sharma
  linkedIn: https://www.linkedin.com/in/danish-sharma-5835b4149/


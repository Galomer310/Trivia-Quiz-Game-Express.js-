const express = require('express');
const router = express.Router();
const triviaQuestions = require('../models/triviaQuestions');

let currentQuestionIndex = 0;
let score = 0;

router.get('/', (req, res) => {
  const question = triviaQuestions[currentQuestionIndex];
  res.json({ question: question.question });
});

router.post('/', (req, res) => {
  const userAnswer = req.body.answer;

  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    res.json({ message: "Correct!", score });
  } else {
    res.json({ message: `Incorrect! The correct answer was ${correctAnswer}.`, score });
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < triviaQuestions.length) {
    const nextQuestion = triviaQuestions[currentQuestionIndex].question;
    res.json({ nextQuestion });
  } else {
    res.redirect('/quiz/score');  
  }
});

router.get('/score', (req, res) => {
  res.json({ message: `Quiz finished! Your final score is ${score}/${triviaQuestions.length}` });

  currentQuestionIndex = 0;
  score = 0;
});

module.exports = router;

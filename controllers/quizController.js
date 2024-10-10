const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.takeQuiz = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        score++;
      }
    });

    res.json({ score, total: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  takeQuiz,
} = require("../controllers/quizController");

const router = express.Router();

router.post("/", authMiddleware, createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/take", takeQuiz);

module.exports = router;

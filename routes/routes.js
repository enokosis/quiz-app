import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as api from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.post("/questions", questionsController.addQuestion);
router.get("/questions", questionsController.getQuestions);

router.get("/questions/:id", questionController.getQuestion);
router.post("/questions/:id/options", questionController.addAnswerOption);

router.post("/questions/:id/delete", questionController.deleteQuestion);
router.post(
  "/questions/:questionId/options/:optionId/delete",
  questionController.deleteAnswerOption,
);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/register", registrationController.showRegistrationForm);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.randomQuiz);
router.get("/quiz/:id", quizController.byIdQuiz);
router.post("/quiz/:id/options/:optionId", quizController.answerQuiz);

router.get("/quiz/:id/incorrect", quizController.incorrect);
router.get("/quiz/:id/correct", quizController.correct);

router.get("/statistics", statisticsController.showStats);

router.get("/api/questions/random", api.getQuestion);
router.post("/api/questions/answer", api.answerQuestion);
export { router };

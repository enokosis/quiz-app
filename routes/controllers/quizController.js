import * as quizService from "../../services/quizService.js";

const randomQuiz = async ({ response }) => {
  const randomQuestionId = await quizService.randomQuiz();
  response.redirect(`/quiz/${randomQuestionId}`);
};

const byIdQuiz = async ({ render, params }) => {
  const byIdQuiz = await quizService.byIdQuiz(params.id);
  render("quiz.eta", byIdQuiz);
};

const answerQuiz = async ({ response, params, user }) => {
  const isCorrect = await quizService.answerQuiz(
    params.id,
    params.optionId,
    user.id,
  );
  if (isCorrect) response.redirect(`/quiz/${params.id}/correct`);
  else response.redirect(`/quiz/${params.id}/incorrect`);
};

const correct = ({ render }) => {
  render("result.eta", { right: true });
};

const incorrect = async ({ render, params }) => {
  const rightAnswers = await quizService.getRightAnswers(params.id);
  render("result.eta", { rightAnswers: rightAnswers, right: false });
};

export { answerQuiz, byIdQuiz, correct, incorrect, randomQuiz };

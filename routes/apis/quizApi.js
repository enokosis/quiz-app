import * as quizService from "../../services/quizService.js";

const getQuestion = async ({ response }) => {
  const randomQuestionId = await quizService.randomQuiz();
  if (randomQuestionId === -1) {
    response.body = {};
    return;
  }
  const byIdQuiz = await quizService.byIdQuiz(randomQuestionId);
  let ret = {
    questionId: {},
    questionTitle: {},
    questionText: {},
    answerOptions: [],
  };
  ret = {
    questionId: randomQuestionId,
    questionTitle: byIdQuiz.question.title,
    questionText: byIdQuiz.question.question_text,
    answerOptions: [],
  };
  for (const option of byIdQuiz.options) {
    const block = {
      optionId: option.id,
      optionText: option.option_text,
    };
    ret.answerOptions.push(block);
  }

  response.body = ret;
};

const answerQuestion = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;
  console.log(params.questionId);
  const isCorrect = await quizService.answerQuiz(
    params.questionId,
    params.optionId,
    -1,
  );

  response.body = { correct: isCorrect };
};

export { answerQuestion, getQuestion };

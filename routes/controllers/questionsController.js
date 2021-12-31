import * as questionsService from "../../services/questionsService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ request, response, render, user }) => {
  const questionData = await getQuestionData(request);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    render("questions.eta", questionData);
  } else {
    await questionsService.addQuestion(
      user.id,
      questionData.title,
      questionData.question_text,
    );

    response.redirect("/questions");
  }
};

const getQuestions = async ({ render, user }) => {
  render("questions.eta", {
    questions: await questionsService.listQuestions(user.id),
  });
};

export { addQuestion, getQuestions };

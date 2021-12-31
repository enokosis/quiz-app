import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
  is_correct: [validasaur.required, validasaur.isBool],
};

const getQuestion = async ({ render, params, user, response }) => {
  const question = await questionService.getQuestion(params.id, user.id);
  if (question === undefined) {
    response.status = 401;
    return;
  }

  const options = await questionService.getOptions(params.id);
  render("question.eta", {
    question: question,
    options: options,
  });
};

const getOptionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: Boolean(params.get("is_correct")),
  };
};

const addAnswerOption = async ({ request, response, render, params, user }) => {
  const optionData = await getOptionData(request);

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    optionData.validationErrors = errors;

    const question = await questionService.getQuestion(params.id);
    optionData.question = question;
    render("question.eta", optionData);
  } else {
    await questionService.addAnswerOption(
      params.id,
      optionData.option_text,
      optionData.is_correct,
      user.id,
    );

    response.redirect(`/questions/${params.id}`);
  }
};

const deleteAnswerOption = async ({ response, params, user }) => {
  await questionService.deleteAnswerOption(
    params.questionId,
    params.optionId,
    user.id,
  );
  response.redirect(`/questions/${params.questionId}`);
};

const deleteQuestion = async ({ response, params, user }) => {
  await questionService.deleteQuestion(
    params.id,
    user.id,
  );
  response.redirect(`/questions`);
};

export { addAnswerOption, deleteAnswerOption, deleteQuestion, getQuestion };

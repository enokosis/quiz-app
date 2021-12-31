import { executeQuery } from "../database/database.js";

const getQuestion = async (id, userId) => {
  const res = await executeQuery(
    `SELECT * FROM questions
            WHERE id = $1 AND user_id =$2`,
    id,
    userId,
  );

  return res.rows[0];
};

const getOptions = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options
            WHERE question_id = $1`,
    id,
  );

  return res.rows;
};

const addAnswerOption = async (
  question_id,
  option_text,
  is_correct,
  userId,
) => {
  let creatorId = await executeQuery(
    "SELECT user_id FROM questions WHERE id = $1",
    question_id,
  );

  creatorId = creatorId.rows[0].user_id;
  //checking is the current user the one who created the option and has rights to modify it
  if (creatorId === userId) {
    await executeQuery(
      "INSERT INTO question_answer_options (question_id, option_text, is_correct)  VALUES ($1, $2, $3)",
      question_id,
      option_text,
      is_correct,
    );
  }
};

const deleteAnswerOption = async (questionId, optionId, userId) => {
  let creatorId = await executeQuery(
    "SELECT user_id FROM questions WHERE id = $1",
    questionId,
  );

  creatorId = creatorId.rows[0].user_id;
  //checking is the current user the one who created the option and has rights to modify it
  if (creatorId === userId) {
    await executeQuery(
      "DELETE FROM question_answers WHERE question_answer_option_id =$1 AND question_id =$2",
      optionId,
      questionId,
    );
    await executeQuery(
      "DELETE FROM question_answer_options WHERE id =$1 AND question_id =$2",
      optionId,
      questionId,
    );
  }
};

const deleteQuestion = async (questionId, userId) => {
  let creatorId = await executeQuery(
    "SELECT user_id FROM questions WHERE id = $1",
    questionId,
  );

  creatorId = creatorId.rows[0].user_id;
  //checking is the current user the one who created the option and has rights to modify it
  if (creatorId === userId) {
    await executeQuery(
      "DELETE FROM question_answers WHERE question_id =$1",
      questionId,
    );
    await executeQuery(
      "DELETE FROM questions  WHERE id =$1 AND user_id =$2",
      questionId,
      userId,
    );
  }
};

export {
  addAnswerOption,
  deleteAnswerOption,
  deleteQuestion,
  getOptions,
  getQuestion,
};

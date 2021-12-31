import { executeQuery } from "../database/database.js";

const randomQuiz = async () => {
  const res = await executeQuery(
    `SELECT id FROM questions 
      ORDER BY RANDOM()
      LIMIT 1`,
  );
  let questionId = -1;
  if (res.rows[0] != undefined) questionId = res.rows[0].id;
  return questionId;
};

const byIdQuiz = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM questions 
      WHERE id = $1`,
    id,
  );

  const question = res.rows[0];
  let options = await executeQuery(
    `SELECT * FROM question_answer_options
                  WHERE question_id = $1`,
    id,
  );
  options = options.rows;
  return {
    question: question,
    options: options,
  };
};

const answerQuiz = async (questionId, optionId, userId) => {
  let isCorrect = await executeQuery(
    `SELECT is_correct FROM question_answer_options 
        WHERE id = $1 AND  question_id = $2`,
    optionId,
    questionId,
  );
  if (isCorrect.rows[0] != undefined) {
    isCorrect = Boolean(isCorrect.rows[0].is_correct);
  } else isCorrect = false;
  if (userId != -1) { //Preventing API from recording to the database.
    await executeQuery(
      "INSERT INTO question_answers  (user_id, question_id, question_answer_option_id, correct)  VALUES ($1, $2, $3, $4)",
      userId,
      questionId,
      optionId,
      isCorrect,
    );
  }
  return isCorrect;
};

const getRightAnswers = async (questionId) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options 
        WHERE is_correct = true AND question_id = $1`,
    questionId,
  );

  return res.rows;
};

export { answerQuiz, byIdQuiz, getRightAnswers, randomQuiz };

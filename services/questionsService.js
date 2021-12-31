import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, question_text) => {
  await executeQuery(
    "INSERT INTO questions (user_id, title, question_text)  VALUES ($1, $2, $3)",
    userId,
    title,
    question_text,
  );
};

const listQuestions = async (user_id) => {
  const res = await executeQuery(
    `SELECT * FROM questions
        WHERE user_id = $1`,
    user_id,
  );

  return res.rows;
};

export { addQuestion, listQuestions };

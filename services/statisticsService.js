import { executeQuery } from "../database/database.js";

const getStats = async (userId) => {
  const userAnswered = await executeQuery(
    `SELECT count(*) as count FROM question_answers 
        WHERE user_id = $1`,
    userId,
  );

  const userAnsweredRight = await executeQuery(
    `SELECT count(*) as count FROM question_answers 
        WHERE user_id = $1 AND correct =true`,
    userId,
  );

  const topFiveUsers = await executeQuery(
    `SELECT users.email as name, count(*) as count FROM users
    JOIN question_answers ON users.id = question_answers.user_id
    GROUP BY users.email
    ORDER BY count
    LIMIT 5`,
  );

  const userQuestions = await executeQuery(
    `SELECT id FROM questions 
        WHERE user_id  = $1`,
    userId,
  );

  let count = 0;

  for (const index of userQuestions.rows) {
    const tempCount = await executeQuery(
      `SELECT count(*) as count FROM question_answers WHERE question_id = $1`,
      index.id,
    );

    count = count + Number(tempCount.rows[0].count);
  }

  return {
    answerCount: count,
    topFive: topFiveUsers.rows,
    userAnswered: userAnswered.rows[0],
    userAnsweredRight: userAnsweredRight.rows[0],
  };
};

export { getStats };

import { query } from "../../../lib/db";

function mergeQuizzes(existingQuizzes, newQuizzes) {
  const existing = Array.isArray(existingQuizzes)
    ? existingQuizzes
    : [];

  const incoming = Array.isArray(newQuizzes)
    ? newQuizzes
    : [newQuizzes];

  const merged = [...existing];

  for (const quiz of incoming) {
    if (!quiz || !quiz.exercise || !quiz.language) {
      continue;
    }

    const found = merged.find(
      (item) =>
        item.exercise === quiz.exercise &&
        item.language === quiz.language
    );

    if (found) {
      const questionTypes = Array.isArray(quiz.questionTypes)
        ? quiz.questionTypes
        : [];

      if (!Array.isArray(found.questionTypes)) {
        found.questionTypes = [];
      }

      for (const questionType of questionTypes) {
        if (!found.questionTypes.includes(questionType)) {
          found.questionTypes.push(questionType);
        }
      }
    } else {
      merged.push({
        exercise: quiz.exercise,
        language: quiz.language,
        questionTypes: Array.isArray(quiz.questionTypes)
          ? quiz.questionTypes
          : [],
      });
    }
  }

  return merged;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { userId, completedQuizzes } = req.body || {};

    if (!userId || !completedQuizzes) {
      return res.status(400).json({
        success: false,
        message: "userId and completedQuizzes are required",
      });
    }

    const userResult = await query(
      `
        SELECT id, completed_quizzes
        FROM users
        WHERE user_id = $1
        LIMIT 1
      `,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    const mergedQuizzes = mergeQuizzes(
      user.completed_quizzes || [],
      completedQuizzes
    );

    await query(
      `
        UPDATE users
        SET completed_quizzes = $1::jsonb,
            updated_at = NOW()
        WHERE id = $2
      `,
      [JSON.stringify(mergedQuizzes), user.id]
    );

    return res.status(200).json({
      success: true,
      completedQuizzes: mergedQuizzes,
    });
  } catch (error) {
    console.error("Completed quizzes error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}

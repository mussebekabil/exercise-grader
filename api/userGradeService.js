import { executeQuery } from "./database/database.js";

const saveUserGrade = async (userId, exerciseId, grade) => {
  await executeQuery(
    "INSERT INTO grades (userid, exerciseid, grade) VALUES ($userId, $exerciseId, $grade);",
    { userId, exerciseId, grade },
  );
};

const getAllGrades = async () => {
  const result =   await executeQuery(
    "SELECT * FROM grades;"
  );

  return result.rows;
};

const getGradesByUserId = async (userId) => {
  const result =   await executeQuery(
    "SELECT * FROM grades WHERE userid=$userId;",
    { userId },
  );

  return result.rows;
};

const getGradeByUserId = async (userId, exerciseId) => {
  const result =   await executeQuery(
    "SELECT * FROM grades WHERE userid=$userId and exerciseid=$exerciseId;",
    { userId, exerciseId },
  );

  return result.rows[0] || null;
};

export { saveUserGrade, getGradesByUserId, getAllGrades, getGradeByUserId };

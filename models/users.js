import sq from "sequelize";
import db from "../database/connection.js";

export async function getUserByUsername(username) {
  const user = await db.query(
    'SELECT id, username, password FROM users WHERE username = :username',
    {
      replacements: { username },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return user;
}

export async function addUser(username, password) {
  const user = await db.query(
    'INSERT INTO users(username, password) VALUES (:username, :password)',
    {
      replacements: { username, password },
      type: sq.QueryTypes.INSERT
    },
  );
  
  return user;
}

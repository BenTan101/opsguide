const db = require("./db");

async function login(email, passwordHash) {
  console.log(passwordHash);

  return await db.query(
    `
        SELECT *
        FROM student
        WHERE studentEmail = "${email}" AND passwordHash = "${passwordHash}";
        `
  );
}

async function signup(email, name, passwordHash, graduationYear) {
  await db.query(`
    INSERT INTO student VALUES ("${email}", "${name}", "${passwordHash}", "${graduationYear}")
  `);

  return await db.query(
    `
      SELECT *
      FROM student
      WHERE studentEmail = "${email}";
      `
  );
}

// email (primary key) is not allowed to be changed
async function updateStudent(email, name, passwordHash, graduationYear) {
  await db.query(`
    UPDATE student
    SET name = "${name}", passwordHash = "${passwordHash}", graduationYear = "${graduationYear}"
    WHERE studentEmail = "${email}"
  `);
  return true;
}

// async function getEmails() {
//   return await db.query(`SELECT studentEmail FROM student`);
// }

async function getStudents() {
  return await db.query(
    `SELECT name, studentEmail, graduationYear FROM student`
  );
}
async function findStudent(email) {
  return await db.query(
    `SELECT * FROM student WHERE studentEmail = "${email}"`
  );
}

async function findAdmin(email) {
  return await db.query(`SELECT * FROM admin WHERE adminEmail = "${email}"`);
}

module.exports = {
  getStudents,
  login,
  signup,
  updateStudent,
  findStudent,
  findAdmin,
  // getEmails,
};

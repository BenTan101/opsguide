const db = require("./db");

async function getAllOpportunities() {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o, Year y, Subject s, TIC t
        WHERE o.opportunityId = y.opportunityId AND o.opportunityId = s.opportunityId AND o.opportunityId = t.opportunityId
        ORDER BY opportunityName;
    `
  );
}

async function getMyOpportunities(email) {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o, TakeOpportunity t, Year y, Subject s, TIC
        WHERE o.opportunityId = y.opportunityId AND o.opportunityId = s.opportunityId AND o.opportunityId = tic.opportunityId AND o.opportunityId = t.opportunityId AND studentEmail = "${email}"
        ORDER BY opportunityName;
    `
  );
}

async function getBookmarkedOpportunities(email) {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o, BookmarkOpportunity b, Year y, Subject s, TIC
        WHERE o.opportunityId = y.opportunityId AND o.opportunityId = s.opportunityId AND o.opportunityId = tic.opportunityId AND o.opportunityId = b.opportunityId AND studentEmail = "${email}"
        ORDER BY opportunityName;
    `
  );
}

async function getOpportunity(id) {
  return await db.query(
    `
        SELECT *
        FROM Opportunity o, Year y, Subject s, TIC t
        WHERE o.opportunityId = "${id}" AND o.opportunityId = y.opportunityId AND o.opportunityId = s.opportunityId AND o.opportunityId = t.opportunityId
    `
  );
}

async function getApprovedReviews(id) {
  return await db.query(
    `
    SELECT r.timestamp timestamp, rating, title, body
    FROM Review r, Opportunity o
    WHERE o.opportunityId = "${id}" AND r.opportunityId = o.opportunityId AND isApproved
    ORDER BY r.timestamp, rating DESC;
    `
  );
}

async function getApprovedReviewByStudent(id, email) {
  return await db.query(
    `
    SELECT r.timestamp timestamp, rating, title, body
    FROM Review r, Opportunity o
    WHERE o.opportunityId = "${id}" AND r.opportunityId = o.opportunityId AND isApproved AND r.email = "${email}"
    `
  );
}

// isApproved = true for debugging purposes
async function createReview(rating, title, body, email, opportunityId) {
  await db.query(`
    INSERT INTO Review VALUES
    (CURDATE(), "${rating}", "${title}", "${body}", true, "${email}", "${opportunityId}");
  `);
  return true;
}

async function updateReview(rating, title, body, email, opportunityId) {
  await db.query(`
    UPDATE Review
    SET rating = "${rating}", title = "${title}", body = "${body}"
    WHERE email = "${email}" AND opportunityId = "${opportunityId}"
  `);
  return true;
}

async function deleteReview(email, opportunityId) {
  await db.query(`
    DELETE FROM Review
    WHERE email = "${email}" AND opportunityId = "${opportunityId}"
  `);
  return true;
}

async function getDepartment(id) {
  return await db.query(
    `
    SELECT *
    FROM Department d
    WHERE d.departmentId = "${id}";
    `
  );
}

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
    INSERT INTO Student VALUES ("${email}", "${name}", "${passwordHash}", "${graduationYear}")
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
    UPDATE Student
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
    `SELECT * FROM Student WHERE studentEmail = "${email}"`
  );
}

async function findAdmin(email) {
  return await db.query(`SELECT * FROM Admin WHERE adminEmail = "${email}"`);
}

module.exports = {
  getAllOpportunities,
  getMyOpportunities,
  getBookmarkedOpportunities,
  getOpportunity,
  getApprovedReviews,
  getApprovedReviewByStudent,
  createReview,
  updateReview,
  deleteReview,
  getDepartment,
  getStudents,
  login,
  signup,
  updateStudent,
  findStudent,
  findAdmin,
  // getEmails,
};

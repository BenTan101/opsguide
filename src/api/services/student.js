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
async function checkTakeOpportunity(email, id) {
  return await db.query(`
    SELECT *
    FROM TakeOpportunity
    WHERE studentEmail = "${email}" AND opportunityId = "${id}";
  `);
}

async function checkBookmarkOpportunity(email, id) {
  return await db.query(`
    SELECT *
    FROM BookmarkOpportunity
    WHERE studentEmail = "${email}" AND opportunityId = "${id}";
  `);
}
async function takeOpportunity(email, id) {
  return await db.query(
    `
        INSERT INTO TakeOpportunity
        VALUES ("${email}", "${id}")
    `
  );
}

async function bookmarkOpportunity(email, id) {
  return await db.query(
    `
        INSERT INTO BookmarkOpportunity
        VALUES ("${email}", "${id}")
    `
  );
}

async function deleteTakeOpportunity(email, id) {
  return await db.query(
    `
        DELETE FROM TakeOpportunity
        WHERE studentEmail = "${email}" AND opportunityId = "${id}"
    `
  );
}

async function deleteBookmarkOpportunity(email, id) {
  return await db.query(
    `
        DELETE FROM BookmarkOpportunity
        WHERE studentEmail = "${email}" AND opportunityId = "${id}"
    `
  );
}

async function getAllModules() {
  return await db.query(
    `
        SELECT moduleCode code, moduleName name, departmentName department
        FROM Module m, Department d
        WHERE m.departmentId = d.departmentId
        ORDER BY moduleCode;
    `
  );
}

async function getMyModules(email) {
  return await db.query(
    `
        SELECT m.moduleCode code, moduleName name, departmentName department, type
        FROM Module m, Department d, TakeModule t
        WHERE m.departmentId = d.departmentId AND m.moduleCode = t.moduleCode AND t.studentEmail = "${email}"
        ORDER BY m.moduleCode;
    `
  );
}

async function getBookmarkedModules(email) {
  return await db.query(
    `
        SELECT m.moduleCode code, moduleName name, departmentName department
        FROM Module m, Department d, BookmarkModule b
        WHERE m.departmentId = d.departmentId AND m.moduleCode = b.moduleCode AND b.studentEmail = "${email}"
        ORDER BY m.moduleCode;
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

async function checkTakeModule(email, code) {
  return await db.query(`
    SELECT *
    FROM TakeModule
    WHERE studentEmail = "${email}" AND moduleCode = "${code}"
  `);
}

async function checkBookmarkModule(email, code) {
  return await db.query(`
    SELECT *
    FROM BookmarkModule
    WHERE studentEmail = "${email}" AND moduleCode = "${code}"
  `);
}

async function takeModule(email, code, type) {
  await db.query(`
      INSERT INTO TakeModule
      VALUES ("${email}", "${code}", "${type}")
  `);

  return true;
}

async function bookmarkModule(email, code) {
  await db.query(`
      INSERT INTO BookmarkModule
      VALUES ("${email}", "${code}")
  `);

  return true;
}

async function deleteTakeModule(email, code) {
  await db.query(`
      DELETE FROM TakeModule
      WHERE studentEmail = "${email}" AND moduleCode = "${code}";
  `);

  return true;
}

async function deleteBookmarkModule(email, code) {
  await db.query(`
      DELETE FROM BookmarkModule
      WHERE studentEmail = "${email}" AND moduleCode = "${code}";
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
  checkTakeOpportunity,
  checkBookmarkOpportunity,
  takeOpportunity,
  bookmarkOpportunity,
  deleteTakeOpportunity,
  deleteBookmarkOpportunity,
  getAllModules,
  getMyModules,
  getBookmarkedModules,
  getApprovedReviews,
  getApprovedReviewByStudent,
  createReview,
  updateReview,
  deleteReview,
  checkTakeModule,
  checkBookmarkModule,
  takeModule,
  bookmarkModule,
  deleteTakeModule,
  deleteBookmarkModule,
  getDepartment,
  getStudents,
  login,
  signup,
  updateStudent,
  findStudent,
  findAdmin,
  // getEmails,
};

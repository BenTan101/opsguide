const db = require("./db");

/**** CREATE ****/
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

async function createOpportunity(
  name,
  category,
  scope,
  duration,
  workload,
  background,
  recommendation,
  eligibility,
  timeline,
  departmentId,
  email
) {
  return await db.query(
    `
        INSERT INTO Opportunity
        VALUES (
                null,
                "${name}",
                "${category}",
                "${scope}",
                "${duration}",
                "${workload}",
                "${background}",
                "${recommendation}",
                "${eligibility}",
                "${timeline}",
                CURDATE(),
                "${departmentId}",
                "${email}"
                );
    `
  );
}

async function addYear(opportunityId, year) {
  return await db.query(
    `INSERT INTO Year VALUES ("${opportunityId}", "${year}")`
  );
}

async function addSubject(opportunityId, subject) {
  return await db.query(
    `INSERT INTO Subject VALUES ("${opportunityId}", "${subject}")`
  );
}

async function addTIC(opportunityId, tic) {
  return await db.query(
    `INSERT INTO TIC VALUES ("${opportunityId}", "${tic}")`
  );
}

async function createReview(rating, title, body, email, opportunityId) {
  await db.query(`
    INSERT INTO Review VALUES
    (CURDATE(), "${rating}", "${title}", "${body}", FALSE, "${email}", "${opportunityId}");
  `);
  return true;
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

/**** READ ****/
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

async function getAllOpportunities() {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o
            LEFT JOIN Year y
        ON o.opportunityId = y.opportunityId
            LEFT JOIN Subject s
            ON o.opportunityId = s.opportunityId
            LEFT JOIN TIC t
            ON o.opportunityId = t.opportunityId
        ORDER BY opportunityName;
    `
  );
}

async function getMyOpportunities(email) {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o
            LEFT JOIN Year y
        ON o.opportunityId = y.opportunityId
            LEFT JOIN Subject s
            ON o.opportunityId = s.opportunityId
            LEFT JOIN TIC t
            ON o.opportunityId = t.opportunityId
        WHERE o.opportunityId = ANY(SELECT opportunityId FROM TakeOpportunity WHERE studentEmail = "${email}")
        ORDER BY opportunityName
    `
  );
}

async function getBookmarkedOpportunities(email) {
  return await db.query(
    `
        SELECT o.opportunityId id, opportunityName, category, scope, subject, year, duration, workload, tic
        FROM Opportunity o
            LEFT JOIN Year y
        ON o.opportunityId = y.opportunityId
            LEFT JOIN Subject s
            ON o.opportunityId = s.opportunityId
            LEFT JOIN TIC t
            ON o.opportunityId = t.opportunityId
        WHERE o.opportunityId = ANY(SELECT opportunityId FROM BookmarkOpportunity WHERE studentEmail = "${email}")
        ORDER BY opportunityName
    `
  );
}

async function getOpportunity(id) {
  return await db.query(
    `
        SELECT *
        FROM Opportunity o
                 LEFT JOIN Year y
                           ON o.opportunityId = y.opportunityId
                 LEFT JOIN Subject s
                           ON o.opportunityId = s.opportunityId
                 LEFT JOIN TIC t
                           ON o.opportunityId = t.opportunityId
        WHERE o.opportunityId = "${id}"
        ORDER BY opportunityName;
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

async function getOpportunityByName(name) {
  return await db.query(
    `SELECT * FROM Opportunity WHERE opportunityName = "${name}";`
  );
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

async function getDepartments() {
  return await db.query(`SELECT * FROM Department`);
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

async function getAllApprovedReviewsByStudent(email) {
  return await db.query(
    `
    SELECT opportunityName, r.timestamp timestamp, rating, title, body
    FROM Review r, Opportunity o
    WHERE r.opportunityId = o.opportunityId AND isApproved AND r.email = "${email}"
    ORDER BY timestamp DESC
    `
  );
}

async function getReviewByStudent(id, email) {
  return await db.query(
    `
    SELECT r.timestamp timestamp, rating, title, body, isApproved
    FROM Review r, Opportunity o
    WHERE o.opportunityId = "${id}" AND r.opportunityId = o.opportunityId AND r.email = "${email}"
    `
  );
}

async function getUnapprovedReviews() {
  return await db.query(
    `
    SELECT o.opportunityId id, opportunityName, r.timestamp timestamp, rating, title, body, email, name
    FROM Review r, Opportunity o, Student s
    WHERE r.opportunityId = o.opportunityId AND NOT isApproved AND r.email = s.studentEmail
    ORDER BY opportunityName, timestamp;
    `
  );
}

async function login(email, passwordHash) {
  console.log(passwordHash);

  return await db.query(
    `
        SELECT *
        FROM Student
        WHERE studentEmail = "${email}" AND passwordHash = "${passwordHash}";
        `
  );
}

async function adminLogin(email, passwordHash) {
  return await db.query(
    `
        SELECT *
        FROM Admin
        WHERE adminEmail = "${email}" AND passwordHash = "${passwordHash}";
        `
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

async function getModuleData() {
  return await db.query(`
        SELECT m.moduleCode, m.moduleName, t1.numBookmarks
        FROM (
                 SELECT moduleCode, COUNT(*) numBookmarks
                 FROM BookmarkModule
                 GROUP BY moduleCode
             ) as t1
                 INNER JOIN Module m
                            ON t1.moduleCode = m.moduleCode
        ORDER BY numBookmarks DESC
        LIMIT 10;  
    `);
}

async function getOpportunityData() {
  return await db.query(`
      SELECT o.opportunityName, t1.numBookmarks
      FROM (
               SELECT opportunityId, COUNT(*) numBookmarks
               FROM BookmarkOpportunity
               GROUP BY opportunityId
           ) as t1
               INNER JOIN Opportunity o
                          ON t1.opportunityId = o.opportunityId
      ORDER BY numBookmarks DESC
      LIMIT 10;
  `);
}

/**** UPDATE ****/
async function updateReview(rating, title, body, email, opportunityId) {
  await db.query(`
    UPDATE Review
    SET rating = "${rating}", title = "${title}", body = "${body}", isApproved = FALSE
    WHERE email = "${email}" AND opportunityId = "${opportunityId}"
  `);
  return true;
}

async function approveReview(email, opportunityId) {
  await db.query(`
    UPDATE Review
    SET isApproved = TRUE
    WHERE email = "${email}" AND opportunityId = "${opportunityId}"
  `);
  return true;
}

async function updateAdmin(email, name, passwordHash) {
  await db.query(`
    UPDATE Admin
    SET name = "${name}", passwordHash = "${passwordHash}"
    WHERE adminEmail = "${email}"
  `);
  return true;
}

async function updateStudent(email, name, passwordHash, graduationYear) {
  await db.query(`
    UPDATE Student
    SET name = "${name}", passwordHash = "${passwordHash}", graduationYear = "${graduationYear}"
    WHERE studentEmail = "${email}"
  `);
  return true;
}

/**** DELETE ****/
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

async function deleteOpportunity(id) {
  return await db.query(
    `
        DELETE FROM Opportunity
        WHERE opportunityId = "${id}"
    `
  );
}

async function deleteReview(email, opportunityId) {
  await db.query(`
    DELETE FROM Review
    WHERE email = "${email}" AND opportunityId = "${opportunityId}"
  `);
  return true;
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
  getAllApprovedReviewsByStudent,
  getReviewByStudent,
  getUnapprovedReviews,
  createReview,
  updateReview,
  deleteReview,
  approveReview,
  checkTakeModule,
  checkBookmarkModule,
  takeModule,
  bookmarkModule,
  deleteTakeModule,
  deleteBookmarkModule,
  getDepartment,
  login,
  adminLogin,
  signup,
  updateAdmin,
  updateStudent,
  findStudent,
  findAdmin,
  getModuleData,
  getOpportunityData,
  getDepartments,
  createOpportunity,
  deleteOpportunity,
  getOpportunityByName,
  addYear,
  addSubject,
  addTIC,
};

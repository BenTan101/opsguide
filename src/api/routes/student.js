const express = require("express");
const router = express.Router();
const opsguide = require("../services/student");
router.post("/login", async function (req, res, next) {
  try {
    let details = await opsguide.login(
      req.body["email"],
      req.body["passwordHash"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error logging in`, err.message);
    next(err);
  }
});

router.post("/signup", async function (req, res, next) {
  try {
    let details = await opsguide.signup(
      req.body["email"],
      req.body["name"],
      req.body["passwordHash"],
      req.body["graduationYear"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error creating account`, err.message);
    next(err);
  }
});

// router.get("/students", async function (req, res, next) {
//   try {
//     res.json(await opsguide.getStudents());
//   } catch (err) {
//     console.error(`Error getting students`, err.message);
//     next(err);
//   }
// });

router.post("/update-student", async function (req, res, next) {
  try {
    return res.json(
      await opsguide.updateStudent(
        req.body["email"],
        req.body["name"],
        req.body["passwordHash"],
        req.body["graduationYear"]
      )
    );
  } catch (err) {
    console.error(`Error getting students`, err.message);
    next(err);
    return false;
  }
});

router.post("/is-student", async function (req, res, next) {
  try {
    return res.json(await opsguide.findStudent(req.body["email"]));
  } catch (err) {
    console.error(`Error finding student`, err.message);
    next(err);
  }
});

router.post("/is-admin", async function (req, res, next) {
  try {
    let details = res.json(await opsguide.findAdmin(req.body["email"]));
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error finding admin`, err.message);
    next(err);
  }
});

// app.use(
//   "/emails",
//   router.get("/", async function (req, res, next) {
//     try {
//       res.json(await opsguide.getEmails());
//     } catch (err) {
//       console.error(`Error getting emails`, err.message);
//       next(err);
//     }
//   })
// );

module.exports = router;

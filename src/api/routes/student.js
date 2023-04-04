const express = require("express");
const router = express.Router();
const opsguide = require("../services/student");

router.get("/get-all-opportunities", async function (req, res, next) {
  try {
    return res.json(await opsguide.getAllOpportunities());
  } catch (err) {
    console.error(`Error getting all opportunities`, err.message);
    next(err);
  }
});

router.post("/get-my-opportunities", async function (req, res, next) {
  try {
    let details = await opsguide.getMyOpportunities(req.body["email"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting my opportunities`, err.message);
    next(err);
  }
});

router.post("/get-bookmarked-opportunities", async function (req, res, next) {
  try {
    let details = await opsguide.getBookmarkedOpportunities(req.body["email"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting bookmarked opportunities`, err.message);
    next(err);
  }
});

router.post("/get-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.getOpportunity(req.body["opportunityId"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting opportunity`, err.message);
    next(err);
  }
});

router.get("/get-all-modules", async function (req, res, next) {
  try {
    return res.json(await opsguide.getAllModules());
  } catch (err) {
    console.error(`Error getting all modules`, err.message);
    next(err);
  }
});

router.post("/get-my-modules", async function (req, res, next) {
  try {
    return res.json(await opsguide.getMyModules(req.body["email"]));
  } catch (err) {
    console.error(`Error getting my modules`, err.message);
    next(err);
  }
});

router.post("/get-bookmarked-modules", async function (req, res, next) {
  try {
    return res.json(await opsguide.getBookmarkedModules(req.body["email"]));
  } catch (err) {
    console.error(`Error getting bookmarked modules`, err.message);
    next(err);
  }
});

router.post("/get-approved-reviews", async function (req, res, next) {
  try {
    let details = await opsguide.getApprovedReviews(req.body["opportunityId"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting approved reviews`, err.message);
    next(err);
  }
});

router.post("/get-approved-review-by-student", async function (req, res, next) {
  try {
    let details = await opsguide.getApprovedReviewByStudent(
      req.body["opportunityId"],
      req.body["email"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting approved review by student`, err.message);
    next(err);
  }
});

router.post("/create-review", async function (req, res, next) {
  try {
    let details = await opsguide.createReview(
      req.body["rating"],
      req.body["title"],
      req.body["body"],
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error creating review`, err.message);
    next(err);
  }
});

router.post("/update-review", async function (req, res, next) {
  try {
    let details = await opsguide.updateReview(
      req.body["rating"],
      req.body["title"],
      req.body["body"],
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error updating review`, err.message);
    next(err);
  }
});

router.post("/delete-review", async function (req, res, next) {
  try {
    let details = await opsguide.deleteReview(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error deleting review`, err.message);
    next(err);
  }
});

router.post("/get-department", async function (req, res, next) {
  try {
    let details = await opsguide.getDepartment(req.body["departmentId"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting department`, err.message);
    next(err);
  }
});

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
    let details = await opsguide.findAdmin(req.body["email"]);
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

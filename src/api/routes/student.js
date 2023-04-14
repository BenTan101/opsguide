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

router.post("/is-opportunity-taken", async function (req, res, next) {
  try {
    let details = await opsguide.checkTakeOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error checking opportunity taken status`, err.message);
    next(err);
  }
});
router.post("/is-opportunity-bookmarked", async function (req, res, next) {
  try {
    let details = await opsguide.checkBookmarkOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error checking opportunity bookmarked status`, err.message);
    next(err);
  }
});
router.post("/take-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.takeOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error taking opportunity`, err.message);
    next(err);
  }
});

router.post("/bookmark-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.bookmarkOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error bookmarking opportunity`, err.message);
    next(err);
  }
});

router.post("/delete-take-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.deleteTakeOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error deleting take opportunity`, err.message);
    next(err);
  }
});

router.post("/delete-bookmark-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.deleteBookmarkOpportunity(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error deleting bookmark opportunity`, err.message);
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

router.post(
  "/get-all-approved-reviews-by-student",
  async function (req, res, next) {
    try {
      let details = await opsguide.getAllApprovedReviewsByStudent(
        req.body["email"]
      );
      res.json(details);
      return details;
    } catch (err) {
      console.error(
        `Error getting all approved reviews by student`,
        err.message
      );
      next(err);
    }
  }
);

router.post("/get-review-by-student", async function (req, res, next) {
  try {
    let details = await opsguide.getReviewByStudent(
      req.body["opportunityId"],
      req.body["email"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting review by student`, err.message);
    next(err);
  }
});

router.get("/get-unapproved-reviews", async function (req, res, next) {
  try {
    let details = await opsguide.getUnapprovedReviews();
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting unapproved reviews`, err.message);
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

router.post("/approve-review", async function (req, res, next) {
  try {
    let details = await opsguide.approveReview(
      req.body["email"],
      req.body["opportunityId"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error approving review`, err.message);
    next(err);
  }
});

// Check if module TAKEN
router.post("/is-module-taken", async function (req, res, next) {
  try {
    let details = await opsguide.checkTakeModule(
      req.body["email"],
      req.body["code"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error checking module taken status`, err.message);
    next(err);
  }
});

// Check if module BOOKMARKED
router.post("/is-module-bookmarked", async function (req, res, next) {
  try {
    let details = await opsguide.checkBookmarkModule(
      req.body["email"],
      req.body["code"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error checking module bookmarked status`, err.message);
    next(err);
  }
});

// TAKE module
router.post("/take-module", async function (req, res, next) {
  try {
    let details = await opsguide.takeModule(
      req.body["email"],
      req.body["code"],
      req.body["type"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error taking module`, err.message);
    next(err);
  }
});

// BOOKMARK module
router.post("/bookmark-module", async function (req, res, next) {
  try {
    let details = await opsguide.bookmarkModule(
      req.body["email"],
      req.body["code"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error bookmarking module`, err.message);
    next(err);
  }
});

// DELETE TAKE module (updating involves deleting all before re-adding all coz simpler lol)
router.post("/delete-take-module", async function (req, res, next) {
  try {
    let details = await opsguide.deleteTakeModule(
      req.body["email"],
      req.body["code"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error deleting take module`, err.message);
    next(err);
  }
});

// DELETE BOOKMARK module
router.post("/delete-bookmark-module", async function (req, res, next) {
  try {
    let details = await opsguide.deleteBookmarkModule(
      req.body["email"],
      req.body["code"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error deleting bookmark module`, err.message);
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

router.post("/admin-login", async function (req, res, next) {
  try {
    let details = await opsguide.adminLogin(
      req.body["email"],
      req.body["passwordHash"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error logging in as admin`, err.message);
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

router.post("/update-admin", async function (req, res, next) {
  try {
    return res.json(
      await opsguide.updateAdmin(
        req.body["email"],
        req.body["name"],
        req.body["passwordHash"]
      )
    );
  } catch (err) {
    console.error(`Error updating admin`, err.message);
    next(err);
    return false;
  }
});
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
    console.error(`Error updating student`, err.message);
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

router.get("/get-departments", async function (req, res, next) {
  try {
    let details = await opsguide.getDepartments();
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting departments`, err.message);
    next(err);
  }
});

router.post("/create-opportunity", async function (req, res, next) {
  try {
    let details = await opsguide.createOpportunity(
      req.body["name"],
      req.body["category"],
      req.body["scope"],
      req.body["duration"],
      req.body["workload"],
      req.body["background"],
      req.body["recommendation"],
      req.body["eligibility"],
      req.body["timeline"],
      req.body["departmentId"],
      req.body["email"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error creating opportunity`, err.message);
    next(err);
  }
});

router.post("/get-opportunity-by-name", async function (req, res, next) {
  try {
    let details = await opsguide.getOpportunityByName(req.body["name"]);
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error getting opportunity by name`, err.message);
    next(err);
  }
});

router.post("/add-year", async function (req, res, next) {
  try {
    let details = await opsguide.addYear(
      req.body["opportunityId"],
      req.body["year"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error adding year`, err.message);
    next(err);
  }
});

router.post("/add-subject", async function (req, res, next) {
  try {
    let details = await opsguide.addSubject(
      req.body["opportunityId"],
      req.body["subject"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error adding subject`, err.message);
    next(err);
  }
});

router.post("/add-tic", async function (req, res, next) {
  try {
    let details = await opsguide.addTIC(
      req.body["opportunityId"],
      req.body["tic"]
    );
    res.json(details);
    return details;
  } catch (err) {
    console.error(`Error adding tic`, err.message);
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

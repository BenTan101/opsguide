import { api } from "@/services/api.js";

export default {
  /**** CREATE ****/
  takeModule(credentials) {
    return api("/take-module", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  bookmarkModule(credentials) {
    return api("/bookmark-module", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  takeOpportunity(credentials) {
    return api("/take-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  bookmarkOpportunity(credentials) {
    return api("/bookmark-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  createOpportunity(credentials) {
    return api("/create-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  addYear(credentials) {
    return api("/add-year", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  addSubject(credentials) {
    return api("/add-subject", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  addTIC(credentials) {
    return api("/add-tic", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  createReview(credentials) {
    return api("/create-review", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  signup(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  /**** READ ****/
  getAllModules(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/get-all-modules", {
      method: "GET",
      body: JSON.stringify(credentials),
    });
  },
  getMyModules(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/get-my-modules", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getBookmarkedModules(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/get-bookmarked-modules", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  checkTakeModule(credentials) {
    return api("/is-module-taken", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  checkBookmarkModule(credentials) {
    return api("/is-module-bookmarked", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getAllOpportunities() {
    return api("/get-all-opportunities", {
      method: "GET",
    });
  },
  getMyOpportunities(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/get-my-opportunities", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getBookmarkedOpportunities(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/get-bookmarked-opportunities", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getOpportunity(credentials) {
    return api("/get-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  checkTakeOpportunity(credentials) {
    return api("/is-opportunity-taken", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  checkBookmarkOpportunity(credentials) {
    return api("/is-opportunity-bookmarked", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getOpportunityByName(credentials) {
    return api("/get-opportunity-by-name", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getDepartment(credentials) {
    return api("/get-department", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getDepartments() {
    return api("/get-departments", {
      method: "GET",
    });
  },
  getApprovedReviews(credentials) {
    return api("/get-approved-reviews", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getAllApprovedReviewsByStudent(credentials) {
    return api("/get-all-approved-reviews-by-student", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getReviewByStudent(credentials) {
    return api("/get-review-by-student", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getUnapprovedReviews() {
    return api("/get-unapproved-reviews", {
      method: "GET",
    });
  },
  login(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  adminLogin(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/admin-login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  isStudent(credentials) {
    console.log(credentials);
    let details = api("/is-student", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    console.log(details);
    return details;
  },
  isAdmin(credentials) {
    return api("/is-admin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  getModuleData() {
    return api("/get-module-data", {
      method: "GET",
    });
  },
  getOpportunityData() {
    return api("/get-opportunity-data", {
      method: "GET",
    });
  },

  /**** UPDATE ****/
  updateReview(credentials) {
    return api("/update-review", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  approveReview(credentials) {
    return api("/approve-review", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  updateAdmin(credentials) {
    return api("/update-admin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  updateStudent(credentials) {
    return api("/update-student", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  /**** DELETE ****/
  deleteTakeModule(credentials) {
    return api("/delete-take-module", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  deleteBookmarkModule(credentials) {
    return api("/delete-bookmark-module", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  deleteTakeOpportunity(credentials) {
    return api("/delete-take-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  deleteBookmarkOpportunity(credentials) {
    return api("/delete-bookmark-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  deleteOpportunity(credentials) {
    return api("/delete-opportunity", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  deleteReview(credentials) {
    return api("/delete-review", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

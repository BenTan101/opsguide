import { api } from "@/services/api.js";

export default {
  getAllOpportunities() {
    return api("/get-all-opportunities", {
      method: "GET",
    });
  },
  getMyOpportunities(credentials) {
    console.log("credence");
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
  getDepartment(credentials) {
    return api("/get-department", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  login(credentials) {
    console.log(JSON.stringify(credentials));
    return api("/login", {
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
  updateStudent(credentials) {
    return api("/update-student", {
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
  isStudentOrAdmin(credentials) {
    return this.isStudent(credentials) || this.isAdmin(credentials);
  },
};

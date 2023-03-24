import { api } from "@/services/api.js";

export default {
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

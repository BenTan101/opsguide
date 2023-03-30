export const functions = {
  getSHA256Hash: async function (input) {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      textAsBuffer
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((item) => item.toString(16).padStart(2, "0")).join("");
  },
  isEmailValid: function (email) {
    return email.match(/h[0-9]+@nushigh\.edu\.sg/gi) && email.length === 23;
  },
  isGraduationYearValid: function (year) {
    return (
      (year + "").match(/^[0-9]*$/gi) &&
      !(
        year !== "" &&
        (year < new Date().getFullYear() || year > new Date().getFullYear() + 5)
      )
    );
  },
  formatOpportunitiesForTable: function (raw) {
    const formatted = [];
    let subjects = [];
    let years = [];
    let tics = [];

    for (let i = 0; i < raw.length; i++) {
      let prev = i === 0 ? null : raw[i - 1];
      let curr = raw[i];

      if (prev !== null && curr.opportunityName !== prev.opportunityName) {
        formatted.push({
          name: prev.opportunityName,
          category: prev.category,
          scope: prev.scope,
          duration: prev.duration,
          workload: prev.workload,
          subject: subjects,
          year: years,
          tic: tics,
        });

        subjects = [];
        years = [];
        tics = [];
      }

      if (
        prev == null ||
        curr.opportunityName === prev.opportunityName ||
        (subjects.length === 0 && years.length === 0 && tics.length === 0)
      ) {
        if (!subjects.includes(curr.subject)) subjects.push(curr.subject);
        if (!years.includes(curr.year)) years.push(curr.year);
        if (!tics.includes(curr.tic)) tics.push(curr.tic);
      } else {
        formatted.push({
          name: prev.opportunityName,
          category: prev.category,
          scope: prev.scope,
          duration: prev.duration,
          workload: prev.workload,
          subject: subjects,
          year: years,
          tic: tics,
        });

        subjects = [];
        years = [];
        tics = [];
      }

      if (i === raw.length - 1) {
        formatted.push({
          name: prev.opportunityName,
          category: prev.category,
          scope: prev.scope,
          duration: prev.duration,
          workload: prev.workload,
          subject: subjects,
          year: years,
          tic: tics,
        });
      }
    }

    return formatted;
  },
};

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
};

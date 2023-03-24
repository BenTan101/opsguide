const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("./routes/student");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/opsguide", router);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

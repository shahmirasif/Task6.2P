const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("./connection.js");
const config = require("config");
const auth = require("./routes/auth.js");
const workers = require("./routes/workers.js");
const PORT = config.get("port") || 3000;
const BASE = `${__dirname}/public/pages`;

connect()
  .then(() => console.log("connected to database ...."))
  .catch((error) => console.log(`error : ${error.message}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/auth", auth);
app.use("/api/workers", workers);
app.use(express.static("pages"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(`${BASE}/Home.html`);
});

app.get("/reqtask", (req, res) => {
  res.sendFile(`${BASE}/ReqTask.html`);
});

app.get("/register", (req, res) => {
  res.sendFile(`${BASE}/Registration.html`);
});

app.get("/login", (req, res) => {
  res.sendFile(`${BASE}/Login.html`);
});

app.post("/api/test", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: 200,
    message: "success",
  });
});

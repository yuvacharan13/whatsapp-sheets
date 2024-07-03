const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/webhooks", (req, res) => {
  console.log(req.body);
  res.send("Webhook received");
});

app.get("/yuva", (req, res) => {
  res.send("hey yuva path");
});

app.get("/", (req, res) => {
  res.send("hey yuva home page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

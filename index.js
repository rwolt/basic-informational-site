const express = require("express");
const { existsSync } = require("fs");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/css")));
app.use(express.static(path.join(__dirname, "/images")));

app.get("/", (req, res) => {
  // await readFile("./index.html", "utf8").then((content) => res.send(content));
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "/contact-me.html"));
});

app.use((req, res, next) => {
  const filePath = path.join(__dirname, `${req.url}`);
  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).sendFile(path.join(__dirname, "/404.html"));
  }
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const fileName = path.parse(req.url).name || "index";
  const extension = path.extname(req.url) || ".html";

  let contentType = "text/html";
  let contentDir = "";

  switch (extension) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      contentDir = "css";
      break;
    case ".jpg":
      contentType = "image/jpg";
      contentDir = "images";
  }

  fs.readFile(
    path.join(__dirname, `${contentDir}`, `${fileName}${extension}`),
    (err, content) => {
      if (err) {
        console.error(err);
      } else {
        res.writeHead(200, { "Content-Type": `${contentType}` });
        res.end(content);
      }
    }
  );
});

let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

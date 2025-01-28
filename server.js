const http = require("http");
const url = require("url");
const { message } = require("./lang/messages/en/en");
const { getDate } = require("./modules/utils");
const { appendToFile } = require("./modules/writeFile");
const { readFromFile } = require("./modules/readFile");
const path = require("path");
const BASE_PATH = "./";
const PORT = process.env.PORT || 8000;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === "/lab3/getDate/") {
      const name = parsedUrl.query.name;

      if (!name) {
        res.statusCode = 400;
        res.end(message.error);
        return;
      }

      const responseMessage = getDate(name, message.success);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(responseMessage);
    } else if (parsedUrl.pathname === "/lab3/writeFile/") {
      const text = parsedUrl.query.text;

      if (!text) {
        res.statusCode = 400;
        res.end(message.writeError);
        return;
      }
      const filePath = path.join(BASE_PATH, 'file.txt');

      appendToFile(filePath, queryString, (err, message) => {
        if (err) {
          res.statusCode = 500;
          res.end(err);
        } else {
          res.statusCode = 200;
          res.end(message);
        }
      });
    } else if (parsedUrl.pathname.startsWith("/lab3/readFile/")) {
      const fileName = parsedUrl.pathname.split('/').pop();
      const filePath = path.join(BASE_PATH, fileName);

      readFromFile(filePath, (err, content) => {
                if (err) {
                    res.statusCode = 404;
                    res.end(`File not found: ${fileName}`);
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(content);
                }
            });
    } else {
      res.statusCode = 404;
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(message[404]);
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

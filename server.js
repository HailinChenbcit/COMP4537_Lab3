const http = require("http");
const url = require("url");
const { message } = require("./lang/messages/en/en");
const { getDate } = require("./modules/utils");
const { appendToFile } = require("./modules/writeFile");
const { readFromFile } = require("./modules/readFile");

const PORT = process.env.PORT || 8000;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === "/lab3/getDate/") {
      const name = parsedUrl.query.name;

      if (!name) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(message.error);
        return;
      }

      const responseMessage = getDate(name, message.success);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(responseMessage);
    } else if (parsedUrl.pathname === "/lab3/writeFile/") {
      const text = parsedUrl.query.text;

      if (!text) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          message.writeError
        );
        return;
      }

      appendToFile(text, (err, successMessage) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<p style='color: red;'>Error: Unable to write to file.</p>");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<p style="color: green;">${successMessage}</p>`);
        }
      });
    } else if (pathname === "/lab3/readFile/file.txt") {
      readFromFile((err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<p style='color: red;'>Error: Unable to read file.</p>");
        } else if (data.startsWith("404 Error")) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(`<p style='color: red;'>${data}</p>`);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<pre>${data}</pre>`);
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(message[404]);
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

const http = require("http");

const hostname = "127.0.0.1";
const port = 3000; //a port is a number attached to a data packet from a network

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//for package.json "^4.17.3" carrot means get me the latest "~4.17.3" tilda means get me all the patches "4.17.3" means get me exact version

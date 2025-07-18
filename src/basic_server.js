// Vanilla JS API
// run it with `node src/basic_server.js`
// This is a simple Node.js API using the built-in http module

// The request object contains information about the HTTP request
// The response object is used to send a response back to the client,
// the response is always scoped to the request
// That means that you can only send one response per request

// no need to install any package, http is built-in in Node.js
const http = require("http");
const server = http.createServer((req, res) => {
  // a naive way to manage a REST API
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to the API!" }));
  }
});

// create a server, async,
// and logs a message when the server is running

server.listen(3005, () => {
  console.log("Server running at http://localhost:3005/");
});

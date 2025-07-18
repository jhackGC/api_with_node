// Before we can use Express, you need to install it.
// Using NPM or Yarn:
// npm i express --save or yarn add express

// the express server is usually created in a file called server.js or app.js,
// but to differentiate it from the basic server, we will call it express_server.js
const express = require("express");
const app = express();
const port = 5555; // if your server dies on port 5555,
// it may be because another process is using it.
// You can change it to any other port
const path = require("path");

// Middleware to serve static files from the "static" directory
// This allows us to serve HTML, CSS, JS files, images, etc.
app.use(express.static("static"));

/**
 * app.[method]([route], [route handler])
 */
app.get("/", (req, res) => {
  console.log("GET request to the root route");
  // returna json response
  res.json({ message: "Welcome to the Express API!" });
});

app.get("/page", (req, res) => {
  console.log("GET request to the /page route");
  // sending back an HTML file that a browser can render on the screen.
  const filePath = path.resolve("pages/index.html");
  console.log("Serving file from:", filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(500).send("Error loading page");
    }
  });
});

// creates and starts a server for our API on a defined port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("Server is running and ready to accept requests");
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// check the server is running by visiting http://localhost:5000 in your browser
// check the process is running in port 5000 by using `lsof -i :5000`
// kill the process using `kill -9 <PID>` where PID is the process ID from the previous command

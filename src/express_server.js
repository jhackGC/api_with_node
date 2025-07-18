// Before we can use Express, you need to install it.
// Using NPM or Yarn:
// npm i express --save or yarn add express

// the express server is usually created in a file called server.js or app.js,
// but to differentiate it from the basic server, we will call it express_server.js
const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

// Middleware to serve static files from the "static" directory
// This allows us to serve HTML, CSS, JS files, images, etc.
app.use(express.static("static"));

/**
 * app.[method]([route], [route handler])
 */
app.get("/", (req, res) => {
  // sending back an HTML file that a browser can render on the screen.
  res.sendFile(path.resolve("pages/index.html"));
});

// creates and starts a server for our API on a defined port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

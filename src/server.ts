// Typescript version of the server
import express from "express";

const app = express();

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

export default app;

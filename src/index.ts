// We separated the concerns of the server (server.ts file) and server instantiation (this file).
// This file is used to run/instantiate the express server

import app from "./server";

const port = 5555; // if your server dies on port 5555,
// it may be because another process is using it.
// You can change it to any other port

// creates and starts a server for our API on a defined port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("Server is running and ready to accept requests");
});

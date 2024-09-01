const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const staticMiddleware = express.static("public"); // Path to the public folder

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

//Routes


app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
});
  
// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    process.exit(0); // Exit with code 0 indicating successful shutdown
});

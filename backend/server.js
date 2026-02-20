//start server
require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");

connectDb();

const port = 3000;

app.listen(port, () => {
  console.log(`app is running on port http://localhost:${port}`);
});

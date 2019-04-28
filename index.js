const express = require("express");

const app = express();
import "dotenv/config";

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

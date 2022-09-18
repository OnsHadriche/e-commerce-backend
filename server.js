const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: [process.env.WEB_APP_URL] }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.Data_Base_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// app.listen(PORT, () => {
//   console.log(`Server is listening ${PORT}`);
// });

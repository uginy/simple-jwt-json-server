const express = require("express");
const config = require("config");
const fileUpload = require('express-fileupload')
const apiRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const path = require('path');
const cors = require('cors')

const app = new express();

app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/ada-api", apiRouter);
app.use(errorHandler);

const port = config.get("serverPort") || 8060;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Mock Server started on port ", port);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};
start();

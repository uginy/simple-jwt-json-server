const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const config = require("config");
const apiRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");

app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

const port = config.get("serverPort") || 8070;

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl"), { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => {
      console.log("Mock Server started on port ", port);
    });
  } catch (error) {
    console.log("Error", error);
  }
};
start();

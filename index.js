const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const jsonServer = require("json-server");
const index = jsonServer.create();
const router = jsonServer.router("./fixtures/database.json");
const auth = require("./middleware/authMiddleware");
const apiRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const useSecure = false;

index.use(express.json());
index.use(jsonServer.defaults());
index.use("/api", apiRouter);
index.use(errorHandler);

index.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (!useSecure) {
    next();
    return;
  }
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = auth.verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

index.use(router);
index.use(errorHandler);

const port = config.get("serverPort") || process.env.PORT || 8090;

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl"), { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false,
    });
    index.listen(port, () => {
      console.log("Run Auth API Server on port ", port);
    });
  } catch (error) {
    console.log("Error", error);
  }
};
start();

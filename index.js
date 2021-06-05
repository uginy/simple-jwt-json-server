import express from "express";
import config from "config";
import fileUpload from "express-fileupload";
import apiRouter from "./routes/index.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js";
import path from "path";
import cors from "cors";

const app = new express();
const __dirname = path.resolve(path.dirname(''));

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
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

import express from "express";
import config from "config";
import fileUpload from "express-fileupload";
import apiRouter from "./routes/index.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js";
import path from "path";
import cors from "cors";

const __dirname = path.resolve(path.dirname(""));

const app = new express();

app.use(cors());
app.use(express.json());
app.use('/system', express.static(path.resolve(__dirname, "static")));
app.use(
  fileUpload({
    limits: {
      fileSize: 256000000, //1mb
    },
  })
);
app.use("/system", apiRouter);
app.use(errorHandler);

const port = config.get("serverPort") || 80;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Mock Server #1 started on port ", port);
    });
  } catch (error) {
    console.log("Error starting server #1", error);
  }
};

await start();

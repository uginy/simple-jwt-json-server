import express from "express";
import config from "config";
import fileUpload from "express-fileupload";
import apiRouter from "./routes/index.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js";
import path from "path";
import cors from "cors";

const __dirname = path.resolve(path.dirname(""));

//// #1 API ////
const app1 = new express();

app1.use(cors());
app1.use(express.json());
app1.use('/api', express.static(path.resolve(__dirname, "static")));
app1.use(
  fileUpload({
    limits: {
      fileSize: 256000000, //1mb
    },
  })
);
app1.use("/api", apiRouter);
app1.use(errorHandler);

const port1 = config.get("serverPort1") || 80;

const start1 = async () => {
  try {
    app1.listen(port1, () => {
      console.log("Mock Server #1 started on port ", port1);
    });
  } catch (error) {
    console.log("Error starting server #1", error);
  }
};

await start1();

//// #2 API ////
const app2 = new express();

app2.use(cors());
app2.use(express.json());
app2.use('/api2', express.static(path.resolve(__dirname, "static2")));
app2.use(
  fileUpload({
    limits: {
      fileSize: 256000000, //1mb
    },
  })
);
app2.use("/api2", apiRouter);
app2.use(errorHandler);

const port2 = config.get("serverPort2") || 80;

const start2 = async () => {
  try {
    app2.listen(port2, () => {
      console.log("Mock Server #2 started on port ", port2);
    });
  } catch (error) {
    console.log("Error starting server #2", error);
  }
};

await start2();

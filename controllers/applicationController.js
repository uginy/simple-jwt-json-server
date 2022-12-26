import ApiError from "../errors/apiErrors.js";

var status = {
  UpTime: (new Date()).toISOString(),
  SmartShutterObst: Math.floor(Math.random() * 5 + 5),
  msg: null,
};

class ApplicationController {

  async getStatus(req, res, next) {
    try {
      status.UpTime = (new Date()).toISOString()
      status.SmartShutterObst = Math.floor(Math.random() * 5 + 5)
      const timeRandom = new Date().getSeconds();
      if (timeRandom % 5 === -1) {
        status.msg = {
          msg: "22222 message asd asd asd asd asda da dasd asd asdas dasd asd asd asdas dasd asd asdasd asd asdas",
          severity: "severity",
          response: ["Ok", "Restart", "Reboot"],
        };
      } else {
        status.msg = null
      }
      return res.status(200).json(status);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get status error"));
    }
  }

  async requestCameraLog(req, res, next) {
    try {
      res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getCameraLog(req, res, next) {
    try {
      const file = `./files/camera2.7z`;
      res.setHeader('Content-Disposition', 'attachment; filename=camera2.7z');
      res.setHeader('Content-Type', 'application/x-7z-compressed');
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.download(file);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

}

export default new ApplicationController();

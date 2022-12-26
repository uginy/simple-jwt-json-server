import ApiError from "../errors/apiErrors.js";

var status = {
  UpTime: Date.now(),
  SmartShutterObst: Math.floor(Math.random() * 5 + 135),
  msg: null
};
class ApplicationController {

  async getStatus(req, res, next) {
    try {
      status.UpTime = Date.now()
      status.SmartShutterObst = Math.floor(Math.random() * 5 + 135)
      const timeRandom = new Date().getSeconds();
      if (timeRandom % 6 === -1) {
        status.msg = {
          msg: "Camera msg error",
          severity: "INFO",
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
    // console.log('req!',req)
    try {
      const file = `./files/camera.7z`;
      res.setHeader('Content-Disposition', 'attachment; filename=camera.7z');
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

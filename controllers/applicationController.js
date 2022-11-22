import ApiError from "../errors/apiErrors.js";

var status = {
  UpTime: Date.now(),
  RecordingTime: 0,
  SmartShutterObst: Math.floor(Math.random() * 5 + 35),
  Temperature: Math.floor(Math.random() * 5 + 35),
};
class ApplicationController {

  async getStatus(req, res, next) {
    try {
      status.UpTime = Date.now()
      return res.status(200).json(status);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get status error"));
    }
  }
}

export default new ApplicationController();

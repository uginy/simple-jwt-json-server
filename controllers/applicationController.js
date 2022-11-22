import ApiError from "../errors/apiErrors.js";

var status = {
  UpTime: Date.now(),
  SmartShutterObst: Math.floor(Math.random() * 5 + 135),
};
class ApplicationController {

  async getStatus(req, res, next) {
    try {
      status.UpTime = Date.now()
      status.SmartShutterObst = Math.floor(Math.random() * 5 + 135)
      return res.status(200).json(status);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get status error"));
    }
  }
}

export default new ApplicationController();

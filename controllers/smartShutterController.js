const ApiError = require("../errors/apiErrors");

var formState = "Both"

class SmartShutterController {
  async getSettings(req, res, next) {
    try {
      console.log(formState);
      return res.status(200).json(formState);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("getSettings error"));
    }
  }

  async setSettings(req, res, next) {
    const SmartShutter = req.body;
    console.log(req.body);
    try {
      formState = SmartShutter;
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setSettings error"));
    }
  }

  async setManual(req, res, next) {
    try {
      console.log("Manual", formState);
      return res.status(201).json(formState);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setManual error"));
    }
  }
}

module.exports = new SmartShutterController();

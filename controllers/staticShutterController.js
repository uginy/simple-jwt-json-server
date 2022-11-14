import ApiError from "../errors/apiErrors.js";

var formState = { toggle: false }

class StaticShutterController {
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
    const StaticShutter = req.body;
    console.log(req.body);
    try {
      formState = StaticShutter;
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setSettings error"));
    }
  }
}

export default new StaticShutterController();

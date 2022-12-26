import ApiError from "../errors/apiErrors.js";

var formState = { Obstacles: false }

class DetectorController {
  async getSettings(req, res, next) {
    try {
      return res.status(200).json(formState);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("getSettings error"));
    }
  }

  async setSettings(req, res, next) {
    const StaticShutter = req.body;
    try {
      formState = StaticShutter;
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setSettings error"));
    }
  }
}

export default new DetectorController();

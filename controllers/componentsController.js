import ApiError from "../errors/apiErrors.js";

class ComponentsController {
  async getComponents(req, res, next) {
    try {
      return res.status(200).json(["geometric_calibration", "recorder", "v2i", "system", "smart_shutter", "image_quality"]);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
  async getAbout(req, res, next) {
    try {
      return res.status(200).json({
        Nox: "string",
        Viper: "string",
        SDK: "string",
        CameraId: "string",
      });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

export default new ComponentsController();

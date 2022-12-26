import ApiError from "../errors/apiErrors.js";

class ComponentsController {
  async getComponents(req, res, next) {
    try {
      return res.status(200).json(["geometric_calibration", "recorder", "v2i", "smart_shutter", "image_quality"]);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
  async getAbout(req, res, next) {
    try {
      return res.status(200).json({
        Nox: "2.2",
        Viper: "2.2",
        SDK: "2.2",
        CameraId: "2.2",
      });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

export default new ComponentsController();

const ApiError = require("../errors/apiErrors");

class ComponentsController {
  async getComponents(req, res, next) {
    try {
      return res.status(200).json(
        [
          'geometric_calibration', 
          'record', 
          'v2i', 
          'system', 
          'smart_shutter', 
          'web_server'
        ]);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
  async getAbout(req, res, next) {
    try {
      return res.status(200).json(
        {
          "Nox": "string",
          "Viper": "string",
          "SDK": "string",
          "CameraId": "string"
        });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

module.exports = new ComponentsController();

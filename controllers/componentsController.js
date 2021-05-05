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
          'analytics'
        ]);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async setSettings(req, res, next) {
    const payload = req.body
    const pData = {
      "dhcp_timeout": 10,
      "fallback_ip": "192.168.1.5",
      "fallback_netmask": 24,
      "fallback_gw": "192.168.1.2",
      "date_time": (new Date()).toISOString(),
      "timezone": "3",
      "ntp_conf": "Conf1",
      "nvpmodel": 3
    }
    const { command } = payload
    try {
      return res.status(201).json(
        { message: 'Command ' + command + ' executed succssfuly', data: pData });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getSettings(req, res, next) {
    try {
      return res.status(201).json(
        {
          "dhcp_timeout": 10,
          "fallback_ip": "192.168.1.5",
          "fallback_netmask": 24,
          "fallback_gw": "192.168.1.2",
          "date_time": (new Date()).toISOString(),
          "timezone": "3",
          "ntp_conf": "Conf1",
          "nvpmodel": 3
        });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

module.exports = new ComponentsController();

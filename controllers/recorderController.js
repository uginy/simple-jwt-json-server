const ApiError = require("../errors/apiErrors");

class RecorderController {
  async startStop(req, res, next) {
    const { start } = req.query;
    const mess = start === 'true' ? 'Record started successfuly' : 'Record stopped successfuly'
    try {
      return res.status(200).json(
       {message: mess, data: { start : start === "true" }});
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getProfile(req, res, next) {
    const payload = req.body
    const { command } = payload
    try {
      return res.status(201).json(
        { message: 'Command ' + command + ' executed succssfuly', data: pData });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async updateProfile(req, res, next) {
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

module.exports = new RecorderController();

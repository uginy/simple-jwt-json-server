import ApiError from "../errors/apiErrors.js";

var settings = {
  dhcp_timeout: 10,
  fallback_ip: "192.168.1.5",
  fallback_netmask: 24,
  fallback_gw: "192.168.1.2",
  date_time: new Date().toString(),
  timezone: 6,
  ntp_conf: "Conf1",
  nvpmodel: 3,
};
class SystemController {
  async setSettings(req, res, next) {
    const payload = req.body;
    try {
      if (payload) {
        settings = { ...settings, ...payload.settings };
        console.log("payload", payload);
      }
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async sendCommand(req, res, next) {
    const query = req.query;
    try {
      console.log(query.query);
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getSettings(req, res, next) {
    try {
      return res.status(201).json(settings);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getDetailedLog(req, res, next) {
    try {
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getStatus(req, res, next) {
    const status = {
      UpTime: Date.now(),
      RecordingTime: 0,
      FPS: Math.floor(Math.random() * 5 + 30),
      Temperature: Math.floor(Math.random() * 5 + 35),
      msg: {
        msg: "message",
        severity: "severity",
        response: ["Ok", "Reboot"],
      },
    };
    try {
      return res.status(200).json(status);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get status error"));
    }
  }
}

export default new SystemController();

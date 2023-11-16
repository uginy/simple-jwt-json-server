import ApiError from "../errors/apiErrors.js";

var settings = {
  dhcp_timeout: 10,
  fallback_ip: "192.168.1.5",
  fallback_netmask: 24,
  fallback_gw: "192.168.1.2",
  date_time: new Date().toString(),
  timezone: "Asia/Jerusalem",
  ntp_conf: "Conf1",
  nvpmodel: 3,
};

var status = {
  UpTime: Date.now(),
  SmartShutterObst: Math.floor(Math.random() * 5 + 135),
  msg: null
};

class SystemController {
  async setSettings(req, res, next) {
    const payload = req.body;
    try {
      if (payload) {
        settings = {...settings, ...payload.settings};
        // console.log("payload", payload);
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
      // console.log(query.query);
      if (query) {
        status.msg = null;
      }
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
      const file = `./files/application.7z`;
      res.setHeader('Content-Disposition', 'attachment; filename=application.7z');
      res.setHeader('Content-Type', 'application/x-7z-compressed');
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.download(file);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async requestDetailedLog(req, res, next) {
    try {
      res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async swUpgrade(req, res, next) {
    let fileSw;
    let uploadPath;

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      fileSw = req.files.fwpackage;
      uploadPath = "./files/" + fileSw?.name;

      // Use the mv() method to place the file somewhere on your server
      fileSw.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send("File uploaded!");
      });
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getStatus(req, res, next) {
    try {
      status.FPS = Math.floor(Math.random() * 5 + 135);
      status.Temperature = Math.floor(Math.random() * 5 + 135);
      status.RecordingTime = new Date().getSeconds();
      return res.status(200).json(status);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get status error"));
    }
  }

  async getAbout(req, res, next) {
    try {
      return res.status(200).json({
        System: "1.1",
        Platform: "1.1"
      });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get about error"));
    }
  }
}

export default new SystemController();

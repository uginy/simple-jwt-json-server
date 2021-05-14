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
  
    const response = {
      "config_name": "string",
      "config_desc": "string",
      "extensions": {
        "camera_control": true,
        "detector": true,
        "capture_stream": {
          "enabled": true,
          "depth": "14bit + 8bit",
          "format": "TAR",
          "raw_frame_format": "RAW",
          "preview_frame_format": "PNG",
          "raw_fps": 30,
          "preview_fps": 30,
          "stop_on_fail": true,
          "csv_headers": "index,x,y,w,h,rank,classid,track_id,range,position_x,position_y,position_z,trajectory_x,trajectory_y,trajectory_z,speed"
        },
        "preview": true,
        "smart_shutter": true,
        "monitor": true,
        "v2i": true,
        "geometric_calibration": true
      },
      "watchdog": {
        "watchtime": 0,
        "disk_space_warn_mb": 0,
        "disk_space_abort_mb": 0,
        "notify_user": 0,
        "min_minutes_to_save": 0,
        "min_scene_num": 0,
        "min_nox_exp": 0
      }
    }

    try {
      return res.status(201).json(
        response );
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

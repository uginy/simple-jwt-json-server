const ApiError = require("../errors/apiErrors");

var mode = "All"
var formProfile = {
  config_name: "string1",
  config_desc: "string",
  extensions: {
    camera_control: true,
    detector: true,
    capture_stream: {
      enabled: true,
      depth: "14bit + 8bit",
      format: "TAR",
      raw_frame_format: "RAW",
      preview_frame_format: "PNG",
      raw_fps: 30,
      preview_fps: 30,
      stop_on_fail: true,
      csv_headers:
        "index,x,y,w,h,rank,classid,track_id,range,position_x,position_y,position_z,trajectory_x,trajectory_y,trajectory_z,speed",
    },
    preview: true,
    smart_shutter: true,
    monitor: true,
    v2i: true,
    geometric_calibration: true,
  },
  watchdog: {
    watchtime: 10,
    disk_space_warn_mb: 20,
    disk_space_abort_mb: 30,
    notify_user: 40,
    min_minutes_to_save: 50,
    min_scene_num: 60,
    min_nox_exp: 70,
  },
};
class RecorderController {
  async startStop(req, res, next) {
    const { start } = req.query;
    const mess = start === "true" ? "Record started successfuly" : "Record stopped successfuly";
    try {
      return res.status(201).json({ message: mess, data: { start: start === "true" } });
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async getProfile(req, res, next) {
    try {
      return res.status(200).json(formProfile);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async updateProfile(req, res, next) {
    const body = req.body;
    console.log('Update Profile Body', req.body);
    try {
      if (body) {
        mode = body
      }
      console.log(mode);
      return res.status(201).json();
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

module.exports = new RecorderController();

import ApiError from "../errors/apiErrors.js";

var mode = "All";
var formProfile = {
  config_name: "Production",
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

var recordingState = {
  fps: "30",
  free_memory: "30mb",
  is_recording: false,
  recording_path: "recording_path sf sdf sdf sdfs df sdf dsf sdf sdf dsf sdf sdf sdf sfd ds",
  time_left: "time_left",
};
class RecorderController {
  async getRecordingState(req, res, next) {
    try {
      // console.log(recordingState);
      recordingState.fps = Math.random() * 10 + 30;
      recordingState.free_memory = Math.random() * 10 + 300;
      recordingState.time_left = Math.random() * 5 + 30;
      return res.status(200).json(recordingState);
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }

  async updateRecordingState(req, res, next) {
    try {
      setTimeout(() => {
        recordingState.is_recording = !recordingState.is_recording;
      }, 2000);
      // console.log(recordingState);
      return res.status(201).json();
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
    // console.log("Update Profile Body", req.body);
    try {
      if (body) {
        formProfile.config_name = body
        mode = body;
      }
      // console.log(mode);
      return res.status(201).json();
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

export default new RecorderController();

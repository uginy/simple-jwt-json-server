import ApiError from "../errors/apiErrors.js";

var defaultFormState = {
  myself: {
    name: "myself name",
    ip: "192.168.14.56",
    port: 8070,
    enable: true,
  },
  video: {
    name: "video name",
    ip: "192.168.14.45",
    port: 8080,
    enable: true,
  },
  detect: {
    name: "detect name",
    ip: "192.168.14.33",
    port: 8090,
    enable: true,
  },
};

var formState = {
  myself: {
    name: "myself name",
    ip: "192.168.14.56",
    port: 8070,
    enable: true,
  },
  video: {
    name: "video name",
    ip: "192.168.14.45",
    port: 8080,
    enable: true,
  },
  detect: {
    name: "detect name",
    ip: "192.168.14.33",
    port: 8090,
    enable: true,
  },
};

class V2iController {
  async getSettings(req, res, next) {
    try {
      // console.log(formState);
      return res.status(200).json(formState);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("getSettings error"));
    }
  }

  async setSettings(req, res, next) {
    const body = req.body;
    try {
      if(Object.keys(body).length > 0) {
        formState = body;
      } else {
        formState = defaultFormState
      }
      // console.log(formState);
      return res.status(200).json(formState);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setSettings error"));
    }
  }
}

export default new V2iController();

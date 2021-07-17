import ApiError from "../errors/apiErrors.js";

class HotkeysController {
  async hotkeys(req, res, next) {
    try {
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get hotkeys error"));
    }
  }
}

export default new HotkeysController();

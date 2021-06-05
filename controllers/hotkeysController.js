import ApiError from "../errors/apiErrors.js";

class HotkeysController {
  async hotkeys(req, res, next) {
    const { hotkey } = req.body; 
    try {
      console.log(hotkey)
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get hotkeys error"));
    }
  }
}

export default new HotkeysController();

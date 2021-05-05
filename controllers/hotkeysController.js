const ApiError = require("../errors/apiErrors");

class HotkeysController {
  async hotkeys(req, res, next) {
    const { hotkey } = req.body; 
    try {
      console.log(hotkey)
      return res.status(200).json(
       {message: 'Hotkey ' + hotkey.toUpperCase() + ' received', data: { hotkey }});
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get hotkeys error"));
    }
  }
}

module.exports = new HotkeysController();

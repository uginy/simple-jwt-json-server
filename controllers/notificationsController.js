const ApiError = require("../errors/apiErrors");
const Notification = require("../models/notification");

class NotificationsController {
  async getAll(req, res, next) {
    try {
      const notifications = await Notification.find();
      res.status(200).json({ count: notifications.length, data: notifications });
    } catch (error) {
      next(ApiError.notFound("Error Getting All Notifications"));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const notification = await Notification.findById(id).exec();
      if (notification) {
        return res.status(200).json(notification);
      }
      return next(ApiError.notFound(`Item with id ${req.params.id} not found`));
    } catch (error) {
      next(ApiError.notFound("Error Geting Notification"));
    }
  }

  async deleteById(req, res, next) {
    try {
      const notification = await Notification.findByIdAndDelete(req.params.id);
      if (notification) {
        return res.status(200).json(notification);
      }
      return next(ApiError.notFound(`Item with id ${req.params.id} not found and can't be deleted`));
    } catch (error) {
      next(ApiError.notFound("Error Deleting Notification"));
    }
  }

  async add(req, res, next) {
    try {
      const notification = await Notification.create(req.body);
      return res.status(200).json(notification);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Error adding notification"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndUpdate(id, req.body, { returnOriginal: false });
      return res.status(200).json(notification);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Error Updating Notification"));
    }
  }
}

module.exports = new NotificationsController();

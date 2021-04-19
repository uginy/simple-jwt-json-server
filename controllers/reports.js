const notifications = require("../middleware/notifications");

module.exports.reportsNotifications = (req, res) => {
    const result = notifications.notificationsReport({ date: req.params.date, person_id: req.params.person_id });
    res.status(200).json(result);
  }
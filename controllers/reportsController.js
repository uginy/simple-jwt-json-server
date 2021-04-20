const fs = require("fs");
const { DateTime } = require("luxon");
const reportsDB = JSON.parse(fs.readFileSync("./fixtures/reports.json", "utf-8").toString());
const databaseDB = JSON.parse(fs.readFileSync("./fixtures/database.json", "utf-8").toString());
const reportsMiddleware = require("../middleware/reportsMiddleware");

class ReportsController {
  reports(req, res, next) {
    const { date, person } = req.query;
    const result = reportsDB.filter((el) => el.date === date && el.person === +person);
    res.status(200).json(result);
  }

  reportsNew = (req, res, next) => {
    const result = reportsDB.filter(reportsMiddleware.search, req.body);
    res.status(200).json({ count: result.length, data: result });
  };

  notifications = (req, res, next) => {
    const { date, person } = req.params;
    console.log(date, person );
    const notifications = databaseDB.notifications.filter((el) => {
      const dateFormatted = DateTime.fromISO(el.date_time).toFormat("yyyy-MM-dd");
      return dateFormatted === date && +el.resident_id === +person;
    });
    res.status(200).json(notifications);
  };
}

module.exports = new ReportsController();

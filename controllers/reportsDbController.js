const ApiError = require("../errors/apiErrors");
const Report = require("../models/reports");

class ReportsDbController {
  async getAll(req, res, next) {
    try {
      const { date, person, times } = req.body;
      const query = {};
      date!== undefined && (query.date = date);
      person!== undefined && (query.person = person);
      !!times &&
        (query.times = {
          $all: [
            { $elemMatch: { start: { $gte: new Date(times.start) } } },
            { $elemMatch: { end: { $lte: new Date(times.end) } } },
          ],
        });
      const reports = await Report.find(query);
      res.status(200).json({ count: reports.length, data: reports });
    } catch (error) {
      next(ApiError.notFound("Error Getting All Reports"));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const report = await Report.findById(id).exec();
      if (report) {
        return res.status(200).json(report);
      }
      return next(ApiError.notFound(`Item with id ${req.params.id} not found`));
    } catch (error) {
      next(ApiError.notFound("Error Geting Report"));
    }
  }

  async add(req, res, next) {
    try {
      const report = await Report.create(req.body);
      return res.status(200).json(report);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Error adding report"));
    }
  }
}

module.exports = new ReportsDbController();

const fs = require("fs");
const rulesDB = JSON.parse(fs.readFileSync("./fixtures/rules.json", "utf-8").toString());
const ApiError = require("../errors/apiErrors");
const Rules = require("../models/rules");
class RulesController {
  ruleTypes(req, res) {
    const result = rulesDB;
    res.status(200).json(result);
  }

  algorithmTypes(req, res, next) {
    const { id } = req.params;
    try {
      let result = rulesDB.find((el) => el.id === +id);
      if (result) {
        result = result.options.map((it) => {
          return {
            label: it.name,
            value: it.id,
          };
        });
        res.status(200).json(result);
      } else {
        next(ApiError.badRequest("No data with this query"));
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const rules = await Rules.find();
      res.status(200).json({ count: rules.length, data: rules });
    } catch (error) {
      next(ApiError.notFound("Error Getting All Rules"));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const rule = await Rules.findById(id).exec();
      if (rule) {
        return res.status(200).json(rule);
      }
      return next(ApiError.notFound(`Item with id ${req.params.id} not found`));
    } catch (error) {
      next(ApiError.notFound("Error Geting Rules"));
    }
  }

  async deleteById(req, res, next) {
    try {
      const rule = await Rules.findByIdAndDelete(req.params.id);
      if (rule) {
        return res.status(200).json(rule);
      }
      return next(ApiError.notFound(`Item with id ${req.params.id} not found and can't be deleted`));
    } catch (error) {
      next(ApiError.notFound("Error Deleting Rule"));
    }
  }

  async add(req, res, next) {
    try {
      const rule = await Rules.create(req.body);
      return res.status(200).json(rule);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Error adding rule"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const rule = await Rules.findByIdAndUpdate(id, req.body, { returnOriginal: false });
      return res.status(200).json(rule);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Error Updating Rule"));
    }
  }
}

module.exports = new RulesController();

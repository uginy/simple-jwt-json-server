const fs = require("fs");
const rulesDB = JSON.parse(fs.readFileSync("./fixtures/rules.json", "utf-8").toString());
const ApiError = require("../errors/apiErrors");
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
}

module.exports = new RulesController();

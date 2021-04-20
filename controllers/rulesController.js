const fs = require("fs");
const rulesDB = JSON.parse(fs.readFileSync("./fixtures/rules.json", "utf-8").toString());

class RulesController {

  ruleTypes(req, res) {
    const result = rulesDB;
    res.status(200).json(result);
  }

  algorithmTypes(req, res, next) {
    const { id } = req.params;
    const result = rulesDB
      .find((el) => el.id === id)
      .options.map((it) => {
        return {
          label: it.name,
          value: it.id,
        };
      });
    res.status(200).json(result);
  }
}

module.exports = new RulesController();

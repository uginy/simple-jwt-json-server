const rules = require("../middleware/rules")
module.exports.rule_types = (req, res) => {
  const result = rules.ruleTypes();
  res.status(200).json(result);
};

module.exports.algorithm_types = (req, res) => {
    const result = rules.algorithmTypes(req.params.id);
    res.status(200).json(result);
  }
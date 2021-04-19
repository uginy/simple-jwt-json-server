const fs = require("fs");

const rulesDB = JSON.parse(fs.readFileSync("./fixtures/rules.json", "utf-8").toString());

const ruleTypes = () => {
  return rulesDB;
};

const algorithmTypes = (ruleId) => {
  return rulesDB
    .find((el) => el.id == ruleId)
    .options.map((it) => {
      return {
        label: it.name,
        value: it.id,
      };
    });
};

module.exports = {
  ruleTypes,
  algorithmTypes,
};

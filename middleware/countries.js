const fs = require("fs");
const countriesDB = JSON.parse(fs.readFileSync("./fixtures/countries.json", "utf-8").toString());

const countries = () => {
  return countriesDB.map((el) => {
    return {
      label: el.country,
      value: el.country,
    };
  });
};

const cities = (country) => {
  const findCountry = countriesDB.find((it) => it.country === country);
  return findCountry.cities.map((el) => {
    return {
      label: el,
      value: el,
    };
  });
};

module.exports = {
  countries,
  cities,
};

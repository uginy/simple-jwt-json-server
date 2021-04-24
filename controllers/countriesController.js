const fs = require("fs");
const countriesDB = JSON.parse(fs.readFileSync("./fixtures/countries.json", "utf-8").toString());
const ApiError = require("../errors/apiErrors");
class CountriesController {
  countries(req, res, next) {
    const countries = countriesDB.map((el) => {
      return {
        label: el.country,
        value: el.country,
      };
    });
    res.status(200).json({ count: countries.length, data: countries });
  }

  cities = (req, res, next) => {
    const { country } = req.body;
    try {
      const findCountry = countriesDB.find((it) => it.country === country);
      if (findCountry) {
        const cities = findCountry.cities.map((el) => {
          return {
            label: el,
            value: el,
          };
        });
        res.status(200).json({ country, count: cities.length, data: cities });
      } else {
        next(ApiError.badRequest("No data with this query"));
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  };
}

module.exports = new CountriesController();

const TranslateApi = require("reverso-api");
const reverso = new TranslateApi();

const translate = ({ text, to }) => {
  return reverso
    .getContext(text, "English", to)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      return console.error(err);
    });
};

module.exports = {
  translate
};

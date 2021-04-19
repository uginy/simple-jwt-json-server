const fs = require("fs");
const { DateTime } = require("luxon");

const databaseDB = JSON.parse(fs.readFileSync("./fixtures/database.json", "utf-8").toString());

const notificationsReport = ({ date, person_id }) => {
  return databaseDB.notifications.filter((el) => {
    const dateFormatted = DateTime.fromISO(el.date_time).toFormat("yyyy-MM-dd");
    return dateFormatted === date && el.resident_id === person_id;
  });
};

module.exports = {
  notificationsReport,
};

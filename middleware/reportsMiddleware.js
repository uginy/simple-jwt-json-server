function search(data) {
  return Object.keys(this).every((key) => {
    if (key !== "times") {
      return data[key] === this[key];
    } else {
      return (
        !!data[key].find((el) => new Date(el.start).getTime() >= new Date(this[key].start).getTime()) &&
        !!data[key].find((el) => new Date(el.end).getTime() <= new Date(this[key].end).getTime())
      );
    }
  });
}

module.exports = {
  search,
};

class Drug {
  constructor(dbDrug) {}
}

module.exports = function(knex) {
  return {
    get: require("./get")(knex, Drug)
  };
};

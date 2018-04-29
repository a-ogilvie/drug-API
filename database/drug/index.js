class Drug {
  constructor(dbDrug) {
    this.id = dbDrug.id;
    this.name = dbDrug.name;
    this.description = dbDrug.description;
    this.price = Number(dbDrug.price).toFixed(2);
    this.stock = dbDrug.stock;
  }
}

module.exports = function(knex) {
  return {
    list: require("./list")(knex, Drug),
    post: require("./post")(knex, Drug),
    get: require("./get")(knex, Drug),
    patch: require("./patch")(knex, Drug)
  };
};

class Drug {
  constructor(dbDrug) {
    this.id = dbDrug.id;
    this.name = dbDrug.name;
    this.description = dbDrug.description;
    this.price = dbDrug.price;
    this.stock = dbDrug.stock;
  }
}

module.exports = function(knex) {
  return {
    get: require("./get")(knex, Drug),
    post: require("./post")(knex, Drug)
  };
};

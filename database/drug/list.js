module.exports = function(knex, Drug) {
  return () => {
    return knex("drug")
      .select("*")
      .orderBy("name")
      .then((dbDrugs) => {
        return dbDrugs.map((dbDrug) => new Drug(dbDrug));
      });
  };
};

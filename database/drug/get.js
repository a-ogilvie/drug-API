module.exports = function(knex, Drug) {
  return (params) => {
    return knex("drug")
      .where({ name: params.name })
      .select()
      .then((drug) => {
        if (drug.length) {
          return new Drug(drug.pop());
        } else {
          throw new Error("Drug not found!");
        }
      });
  };
};

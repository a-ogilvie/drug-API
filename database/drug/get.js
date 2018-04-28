const Promise = require("bluebird");

module.exports = function(knex, Drug) {
  return (params) => {
    const name = params.name;

    return Promise.try(() => {
      if (!name) throw new Error("Drug name must be provided.");
    })
      .then(() => {
        return knex("drug")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((dbDrug) => {
        if (dbDrug.length) return new Drug(dbDrug.pop());

        throw new Error("Drug not found!");
      });
  };
};

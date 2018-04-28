const Promise = require("bluebird");

module.exports = function(knex, Drug) {
  return (params) => {
    const dbEntry = {
      name: params.name,
      drug_type: params.type,
      description: params.description,
      price: params.price,
      stock: params.stock
    };

    return Promise.try(() => {
      for (let prop in dbEntry) {
        if (!dbEntry[prop]) {
          throw new Error(`Must provide ${prop}!`);
        }
      }
    })
      .then(() => knex("drug").insert(dbEntry))
      .then(() => {
        return knex("drug")
          .where({ name: dbEntry.name })
          .select();
      })
      .then((newEntry) => {
        return new Drug(newEntry.pop());
      })
      .catch((err) => {
        if (err.message.match(/(duplicate key value)/)) {
          err.message = "That drug already exists in the database.";
        }

        throw err;
      });
  };
};

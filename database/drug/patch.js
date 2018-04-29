const Promise = require("bluebird");

module.exports = function(knex, Drug) {
  return (params) => {
    const dbEntry = {
      name: params.name,
      description: params.description,
      price: params.price,
      stock: params.stock
    };

    const updates = [];

    for (let prop in dbEntry) {
      if (prop !== "name" && dbEntry[prop]) {
        const updateQuery = {};
        updateQuery[prop] = dbEntry[prop];
        const update = knex("drug")
          .where({ name: dbEntry.name })
          .update(updateQuery);
        updates.push(update);
      }
    }

    return Promise.try(() => {
      if (!dbEntry.name) {
        throw new Error("Must provide name!");
      }
    })
      .then(() => {
        return Promise.all(updates);
      })
      .then(() => {
        return knex("drug")
          .where({ name: dbEntry.name })
          .select();
      })
      .then((alteredEntry) => new Drug(alteredEntry.pop()));
  };
};

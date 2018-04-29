module.exports = function(knex, Drug) {
  return (params) => {
    return knex("drug")
      .where({ name: params.name })
      .delete()
      .then((wasDeleted) => {
        if (!wasDeleted) {
          throw new Error("Drug not found!");
        }
      });
  };
};

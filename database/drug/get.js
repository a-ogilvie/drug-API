module.exports = function(knex, Drug) {
  return (params) => {
    const name = params.name;

    return knex("drug").select();
  };
};

const Knex = require("knex");

module.exports = function(config) {
  const knex = Knex({
    client: config.client,
    port: config.port,
    connection: config.connection
  });

  return {
    drug: require("./drug")(knex)
  };
};

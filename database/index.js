const Knex = require("knex");

module.exports = function(config) {
  const databaseConfig = config.database;

  const knex = Knex({
    client: databaseConfig.client,
    port: databaseConfig.port,
    connection: {
      host: databaseConfig.connection.host,
      database: databaseConfig.connection.database
    }
  });

  return {
    drug: require("./drug")(knex)
  };
};

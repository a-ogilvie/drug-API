exports.up = function(knex, Promise) {
  return knex.schema.createTable("drug", (table) => {
    table.increments().index();

    table
      .text("name")
      .unique()
      .notNullable()
      .index();

    table.text("description").notNullable();

    table.decimal("price", 19, 4).notNullable();

    table.integer("stock").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("drug");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("drug", (table) => {
    table.increments().index();

    table
      .text("name")
      .unique()
      .notNullable()
      .index();

    table.text("drug_type").notNullable();

    table.text("description").notNullable();

    table.decimal("price", 3, 2).notNullable();

    table.integer("stock").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("drug");
};

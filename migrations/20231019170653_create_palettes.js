exports.up = function(knex) {
  return knex.schema
  .createTable("palettes", function(table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable(); 
    // table.timestamps("created_at", { precision: 6 });
    // table.timestamps("edited_at", { precision: 6 });
  })
  .createTable("colors", function(table) {
    table.increments("id").primary();
    table.integer("palette_id").unsigned();
    table.foreign("palette_id").references("palettes.id");
    table.integer("RED").notNullable();
    table.integer("GREEN").notNullable();
    table.integer("BLUE").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("palettes").dropTable("colors");
};
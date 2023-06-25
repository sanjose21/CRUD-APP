exports.up = function(knex) {
  return knex.schema.createTable('item', function(table) {
    table.increments('id').primary(); // auto-incrementing id
    table.string('item_name').notNullable().unique(); // unique item name
    table.text('description').nullable(); // item description
    table.integer('quantity').nullable(); // item quantity
    table.foreign('user_id').references('users.id'); // foreign key reference to users table
    table.timestamps(true, true); // creates 'created_at' and 'updated_at'
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('item');
};

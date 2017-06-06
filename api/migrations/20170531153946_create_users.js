
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table){
        table.increments('id').primary(); // add incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('location').notNullable();
        table.boolean('usertype').notNullable();
        table.string('vehicletype');
        table.string('licensenumber');

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

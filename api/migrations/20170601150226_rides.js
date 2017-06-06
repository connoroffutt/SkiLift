
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('rides', function(table){
        table.increments('id').primary(); // add incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('ride_city').notNullable();
        table.integer('user_id').notNullable();
        table.string('pickup_location').notNullable();
        table.string('ski_destination').notNullable();
        table.integer('room_available').notNullable();
        table.integer('price_per').notNullable();
        table.date('ride_time_location').notNullable();
        table.boolean('one_way').notNullable();
        table.string('vehicletype');
        table.integer('rider1');
        table.integer('rider2');
        table.integer('rider3');
        table.integer('rider4');
        table.integer('rider5');
        table.integer('rider6');
        table.integer('spots_left');

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rides');
};

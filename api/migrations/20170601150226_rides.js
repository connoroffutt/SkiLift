
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('rides', function(table){
        table.increments('id').primary(); // add incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('ride_city').notNullable();
        table.integer('user_id').notNullable();
        table.string('driver_name').notNullable();
        table.string('driver_number').notNullable();
        table.string('pickup_location').notNullable();
        table.string('ski_destination').notNullable();
        table.integer('room_available').notNullable();
        table.integer('price_per').notNullable();
        table.date('ride_time_location').notNullable();
        table.time('ride_time').notNullable();
        table.boolean('one_way').notNullable();
        table.string('vehicletype');
        table.integer('rider1');
        table.string('rider1_name');
        table.string('rider1_phone');
        table.integer('rider2');
        table.string('rider2_name');
        table.string('rider2_phone');
        table.integer('rider3');
        table.string('rider3_name');
        table.string('rider3_phone');
        table.integer('rider4');
        table.string('rider4_name');
        table.string('rider4_phone');
        table.integer('rider5');
        table.string('rider5_name');
        table.string('rider5_phone');
        table.integer('rider6');
        table.string('rider6_name');
        table.string('rider6_phone');
        table.integer('spots_left');

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rides');
};

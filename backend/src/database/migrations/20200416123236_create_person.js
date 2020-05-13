
exports.up = function (knex) {
    return knex.schema.createTable('person', function (table) {
        table.increments();

        table.string('name').notNullable();
        table.string('genre').notNullable();
        table.string('birthday').notNullable();
        table.string('sus_card').notNullable();
        table.string('health_condition').notNullable();
        table.string('phone').notNullable();

        table.string('family_id').notNullable();

        table.foreign('family_id').references('id').inTable('family');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('person');
};

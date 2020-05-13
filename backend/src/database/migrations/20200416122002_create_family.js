
exports.up = function (knex) {
    return knex.schema.createTable('family', function (table){
        table.string('id').primary();
        table.string('responsible_name').notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('number').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('family');
};

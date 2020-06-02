import Knex from 'knex';

export async function up(knek: Knex) {
    return knek.schema.createTable('pint_items', table => {
        table.increments('id').primary(),
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points'),
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pint_items');
}
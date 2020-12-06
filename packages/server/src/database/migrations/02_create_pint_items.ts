import Knex from 'knex';

export async function up(knek: Knex) {
    return knek.schema.createTable('point_items', table => {
        table.increments('id').primary();


        table.integer('point_id').unsigned().notNullable();
        table.foreign('point_id').references('id').inTable('points');

        table.integer('item_id').unsigned().notNullable();
        table.foreign('item_id').references('id').inTable('items');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}
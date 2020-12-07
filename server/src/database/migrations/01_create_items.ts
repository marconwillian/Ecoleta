import Knex from 'knex';

export async function up(knek: Knex) {
    return knek.schema.createTable('items', table => {
        table.increments('id').primary(),
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}
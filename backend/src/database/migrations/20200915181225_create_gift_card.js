
exports.up = function(knex) {
    return knex.schema.createTable('gift_card',function(table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('categoria').notNullable().unique();
        //   caso queira colocar precisao, olhar documentacao knex schema builder -> float
        table.float('preco').notNullable();
        table.boolean('promocao').notNullable();
        table.integer('qtd_vendido').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('gift_card');      
};

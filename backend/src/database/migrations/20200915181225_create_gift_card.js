
exports.up = function(knex) {
    return knex.schema.createTable('gift_card',function(table){
        table.increments('codigo').primary();
        table.string('nome').notNullable();
        table.string('categoria').notNullable();
        // caso queira colocar precisao, olhar documentacao knex schema builder -> float
        table.float('preco').notNullable();
        table.boolean('favorito').notNullable();
        table.boolean('promocao').notNullable();
        table.integer('qtd_vendido').notNullable();
        // default as void string;
        table.string('url_image').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('gift_card');      
};

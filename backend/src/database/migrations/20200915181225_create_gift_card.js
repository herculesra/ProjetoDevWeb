
exports.up = function(knex) {
    return knex.schema.createTable('gift_card',function(table){
        table.increments('code').primary();
        table.string('name').notNullable();
        table.string('category').notNullable();
        // caso queira colocar precisao, olhar documentacao knex schema builder -> float
        table.float('price').notNullable();
        table.boolean('favority').notNullable();
        table.boolean('promotion').notNullable();
        table.boolean('shopping_car').notNullable();
        table.integer('selling_qtt').notNullable();
        // default as void string;
        table.string('url_image').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('gift_card');      
};

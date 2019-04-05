const knex = require('knex')
const knexConfig = require('../knexfile').development;
const db = knex(knexConfig);

const add = user => {
    return db('users')
        .insert(user);
}

const findByName = username => {
    return db('users')
        .where({ username })
        .first();
}

module.exports = {
    add,
    findByName,
}
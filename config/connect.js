const {Pool} = require('pg')

const db = new Pool({
    database:'postgres',
    password:'1234',
    port:5432,
    user:'postgres',
})

module.exports = db;
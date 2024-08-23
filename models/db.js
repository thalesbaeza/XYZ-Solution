const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'mydatabase',
  password: 'postgres',
  port: 5432,
});

pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;
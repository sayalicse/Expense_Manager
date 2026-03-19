const {Pool}=require('pg');
require('dotenv').config();
const pool=new  Pool(
    {
        connectionString:process.env.DATABASE_URL,
        max:20,
         idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
    }
);
pool.on('connect', () => {
  console.log('Successfully connected to the PostgreSQL database');
});

// Error handling for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});
module.exports = pool;
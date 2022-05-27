/**
 * Init the table data_store in postgresql if it no exists.
 */
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'dbuser',
  database: 'postgres',
  host: process.env.db_host || 'localhost',
});

const TABLE_NAME = 'data_store';

(async () => {
  try {
    await pool.connect();
    console.log('DB connect successfully');
  } catch (e) {
    console.error(`Connect to postgreSQL error: `, e.message);
    process.exit(-1);
  }

  try {
    await pool.query(
      `create table if not exists ${TABLE_NAME} (id serial primary key, key varchar(50) not null, value text not null, "createdAt" timestamp not null)`,
    );
  } catch (e) {
    console.log(`create table ${TABLE_NAME} error: `, e.message);
  } finally {
    pool.end();
  }

  process.exit();
})();

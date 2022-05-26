import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'postgres',
});

const TABLE_NAME = 'data_store';

export const InsertUserData = async (key, value) => {
  const queryString = `insert into ${TABLE_NAME} (key, value, "createdAt" ) values ('${key}', '${value}', to_timestamp(${
    Date.now() / 1000.0
  })) returning key, value, "createdAt" as timestamp`;

  const { rows } = await pool.query(queryString);
  return rows[0];
};

export const RetrieveUserData = async (
  key,
  createdAt = Date.now() / 1000.0,
) => {
  const queryString = `select value from ${TABLE_NAME} where key='${key}' and "createdAt" <= to_timestamp(${createdAt})  order by "createdAt" desc`;
  const { rows } = await pool.query(queryString);

  console.log(queryString, '\n', rows);
  return rows[0];
};

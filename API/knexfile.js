require('dotenv').config({ path: '../.env' });
const pgstring =
  process.env.PG_CONNECTION_STRING ??
  `postgres://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@${process.env.DBHOST}/${process.env.DATABASENAME}`;

console.log("Connection string: ", pgstring);

module.exports = {
  development: {
    client: 'pg',
    connection: pgstring,
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

// Update with your config settings.

const databaseName = "postgres";
const pg = require("pg");

const connection_url =
  process.env.DATABASE_URL ||
  //  `postgres://postgres:@localhost:6432/${databaseName}`;


   `postgres://postgres:mypassword@postgres:5432/postgres`
  //`postgres://postgres:2f29bf1eebb21faa92d9d4dd9be21c97@51.68.190.198:5060/bmarks_app_db4`;
// `postgres://postgres:ba2f4b7b10620bf7496e6f0bda1ea439@51.68.190.198:17816/bmarks_db`;

module.exports = {
  client: "pg",
  // connection: connection_url,
  debug:true,
  connection:   `postgres://postgres:mypassword@localhost:5432/postgres`,
  migrations: {
    directory: __dirname + "/db/migrations",
  },
};

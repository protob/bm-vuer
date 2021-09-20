// Update with your config settings.

const databaseName = "postgres";
const pg = require("pg");
require('dotenv').config()
const connection_url =
  process.env.DATABASE_URL ||
  `postgres://postgres:mypassword@localhost:5432/postgres`
console.log(process.env.DATABASE_URL)

module.exports = {
  client: "pg",
  connection: connection_url,
  debug:true,
  migrations: {
    directory: __dirname + "/db/migrations",
  },
};

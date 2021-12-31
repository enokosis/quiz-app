let database = {};

/*add the configs in a following form
hostname: "someplace.com",
database: "databasename",
user: "databaseusernamename",
password: "passwrod",
port: port, */
if (Deno.env.get("TEST_ENVIRONMENT")) {
  //test database
  database = {
    hostname: "abul.db.elephantsql.com",
    database: "zgrosftf",
    user: "zgrosftf",
    password: "UC32T8yd4w_XdjIC6w4bwQamWQEHDVAV",
    port: 5432,
  };
} else {
  //production database
  database = {
    hostname: "abul.db.elephantsql.com",
    database: "qmhkmwuk",
    user: "qmhkmwuk",
    password: "eK4Qh1VSC7bUwgpBMO6Envc9LRoSJjf3",
    port: 5432,
  };
}

export { database };

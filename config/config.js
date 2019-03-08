module.exports = {
    "development": {
      "username": "postgres",
      "password": null,
      "database": "food_recommendation",
      "host": process.env.PG_HOST || "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": "postgres",
      "password": null,
      "database": "food_recommendation",
      "host": process.env.PG_HOST || "127.0.0.1",
      "dialect": "postgres"
    },
    "production": {
      "username": "postgres",
      "password": null,
      "database": "food_recommendation",
      "host": process.env.PG_HOST || "db",
      "dialect": "postgres"
    }
  }
  
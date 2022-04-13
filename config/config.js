require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    host: '127.0.0.1',
    dialect: 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      }
    },
    'operatorsAliases': false,
    'use_env_variable': 'DATABASE_URL'
  }
}
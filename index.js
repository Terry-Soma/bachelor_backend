'use strict';
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
/* dotenv */

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const app = require('./service');

const port = process.env.PORT || 1234;

const server = app.listen(port, () => {
  console.log(`App running on port ${port} ...\nHappy Hacking `.america);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

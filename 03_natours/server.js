process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION! 💥 Shutting down...`, err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

const { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    user: DATABASE_USERNAME,
    pass: DATABASE_PASSWORD,
    authSource: 'admin',
  })
  .then((_) => console.log('DB connection successfufl!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on  port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(
    `UNHANDLED REJECTION! 💥 Shutting down...`,
    err.name,
    err.message
  );
  server.close(() => {
    process.exit(1);
  });
});

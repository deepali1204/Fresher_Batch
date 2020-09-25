//defining routes
module.exports = app => {
  const bookings = require('../controllers/book.controller');

  var router = require("express").Router();

  router.post("/", bookings.book);

  router.delete("/:id", bookings.cancel);

  router.get("/:id", bookings.search);

  app.use('/api/book', router);
};
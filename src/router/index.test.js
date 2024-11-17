const express = require("express");
const router = require("./index"); // Adjust the path as necessary to import the router

let app;

beforeAll(() => {
  app = express();
  app.use(router);
});

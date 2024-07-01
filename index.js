const express = require("express"),
  mongoose = require("mongoose"),
  axios = require("axios"),
  app = require("./app"),
  http = require("http"),
  server = http.createServer(app);

server.listen(3000, () => {
  console.log("EL SERVIDOR ESTA ACTIVO!");
});


const express = require("express"),
  mongoose = require("mongoose"),
  axios = require("axios"),
  app = require("./app"),
  http = require("http"),
  server = http.createServer(app);

server.listen(4000, () => {
  console.log("EL SERVIDOR ESTA ACTIVO!");
});

async function conectarDB() {
  try {
    await mongoose.connect(process.env.token);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a la base de datos: " + error);
  }
}

conectarDB();
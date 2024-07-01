require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./controllers/usuarios");
const userLavadora = require("./controllers/lavado");
const userSecadora = require("./controllers/secadora");
const userPagos= require("./controllers/pagos");






async function conectarDB() {
  try {
    await mongoose.connect(process.env.token);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a la base de datos: " + error);
  }
}

conectarDB();

app.use(express.json());


//ADMINISTRADOR
app.use("/administrador-estadisticas", express.static(path.resolve("views/administrador/estadisticas")));//Pagina principal del administrador
app.use("/administrador-lavadoras", express.static(path.resolve("views/administrador/lavadoras")));//Mostrar las lavadoras
app.use("/administrador-secadoras", express.static(path.resolve("views/administrador/secadoras")));//Mostrar las secadoras
app.use("/administrador-secadoras-reservas", express.static(path.resolve("views/administrador/reservasS")));//Mostrar reservas de las lavadoras
app.use("/administrador-lavadoras-reservas", express.static(path.resolve("views/administrador/reservasL")));//Mostrar reservas secadoras
app.use("/administrador-pagos-verificar", express.static(path.resolve("views/administrador/pagos")));
app.use("/administrador-pagos-historial", express.static(path.resolve("views/administrador/historial")));
app.use("/administrador-informacion", express.static(path.resolve("views/administrador/info")));



app.use("/home", express.static(path.resolve("views", "home")))
app.use("/login", express.static(path.resolve("views", "login")))
app.use("/components", express.static(path.resolve("views", "components")))
app.use("/registro", express.static(path.resolve("views", "registro")))
app.use("/media", express.static(path.resolve("views", "media")))
app.use("/css", express.static(path.resolve("views", "css")))





//CLIENTE
app.use("/misSecadoras", express.static(path.resolve("views/cliente/secadoras")));
app.use("/misLavadoras", express.static(path.resolve("views/cliente/lavadoras")));
app.use("/reservar", express.static(path.resolve("views/cliente/reservar")));//Pagina para reservar
app.use("/historico", express.static(path.resolve("views/cliente/historico")));//Historial de pagos del cliente
app.use("/info", express.static(path.resolve("views/cliente/info")));//Historial de pagos del cliente



app.use("/historialRFL", express.static(path.resolve("views", "historialRFL")));






// rutas back



app.use("/api/users", userRouter);
app.use("/api/lavadoras", userLavadora);
app.use("/api/secadoras", userSecadora);  // Corrected path
app.use("/api/pagos", userPagos);  


module.exports = app;

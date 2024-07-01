const mongoose = require("mongoose");

const user = new mongoose.Schema({
  usuario: String,
  password: String,
  telefono: String,
  email: String,
  rol: {
    type: Number,
    default: 0,// Default role to client
  },
});


//respuesta del usuario en el esquema

user.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
  },
});

//registrar el modelo

const usuario = mongoose.model("user", user);

//exportar

module.exports = usuario;

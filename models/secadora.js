const mongoose = require('mongoose');


const secadora = new mongoose.Schema({
  estado:String,
  nrosecadora:Number,
  reservasObj:Object,
  reservaActiva:Object
  // Información adicional si es necesario
});
const secadoraexport = mongoose.model('secadora', secadora);

module.exports=secadoraexport
const mongoose = require('mongoose');


const LavadoraSchema = new mongoose.Schema({
  estado:String,
  nrolavadora:Number,
  reservasObj:Object,
  reservaActiva:Object
});
const lavadoraexport = mongoose.model('lavadora', LavadoraSchema);

module.exports=lavadoraexport
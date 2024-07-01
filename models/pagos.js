const mongoose = require("mongoose");

const pagoSchema =new mongoose.Schema({
    equipoR:String,
    estado:String,
    idReserva: String, // ID de la reserva que se está pagando
    idCliente: String, // ID del cliente que realizó el pago
    cedula: Number,
    fechaPago:Date,  
    telefono: Number,
    banco: String,
    numeroReferencia: Number,
    monto: Number // monto del pago
});





const pago = mongoose.model("Pago", pagoSchema);

//exportar

module.exports = pago;

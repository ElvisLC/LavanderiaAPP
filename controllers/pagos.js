const userPagos = require("express").Router();
const pagoSchema = require("../models/pagos"); // Importar el modelo Lavadora
const lavadora = require("../models/lavado"); // Importar el modelo Lavadora
const secadora = require("../models/secadora"); // Importar el modelo Lavadora
const jwt = require('jsonwebtoken');

userPagos.post("/enviar", async (req, res) => {
    const {equipoR,idReserva,cedula,telefono,banco,numeroR,monto,fechaPago}=req.body
     console.log(fechaPago,'HGGOLADSAD');
  const cookies = req.headers.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie && tokenCookie.trim().split('=')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
     let objtPago= new pagoSchema({
        equipoR:equipoR,
        estado:'Pendiente',//pendiente
        idReserva:idReserva,
        idCliente:decoded.userId,
        cedula:cedula,
        telefono:telefono,
        fechaPago:fechaPago,
        banco:banco,
        numeroReferencia:numeroR,
        monto:monto
    })

    try {
        await objtPago.save()
        res.json(objtPago)
    
    } catch (error) {
     console.log('error',error);   
    }
});

userPagos.get("/mostrarPPV", async (req, res) => {
    let pagosPV=[]
    try {
      const mostrarPPV = await pagoSchema.find().exec();
      const pagosPV = [];
    
      for (const pago of Object.keys(mostrarPPV)) {
        const pagos = mostrarPPV[pago];
        const fechaActual = new Date();
        const fechaPago=new Date(pagos.fechaPago)
        console.log(fechaPago,pagos.fechaPago);
        console.log(fechaActual,fechaPago);

        if (pagos.estado === 'Pendiente'&&fechaPago>fechaActual) {
          pagosPV.push({ pagos });
        }
        else{
        }
      }
    
      res.json(pagosPV);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Error al obtener pagos pendientes' });
    }
});

userPagos.post("/verificar", async (req, res) => {
  const { reservaId } = req.body;
  console.log(reservaId);

  try {
    const mostrarPPV = await pagoSchema.find().exec();
    const objetos = await lavadora.find().exec();
    const objetosS = await secadora.find().exec();
    let pagoPV = Object.keys(mostrarPPV);

    for (const pago of pagoPV) {
      const pagos = mostrarPPV[pago];
      const fechaActual = new Date();
      
      console.log(fechaActual,pagos.fechaReserva);
      if (pagos.idReserva == reservaId) {
         const pagoActualizado = await pagoSchema.findOneAndUpdate({ idReserva: reservaId }, { $set: { estado: 'Verificado' } }, { new: true });
         res.json({validate:true})


         
         for (const objeto of objetosS) {


          const reservas = objeto.reservasObj;
        
          for (const reserva of Object.values(reservas)) {
          
            if(reserva.reservaId==reservaId){
                
          console.log(reserva.estado);
          reserva.estado = 'Confirmada';
          reserva.pagoEstado = 'Verificado';
          objeto.markModified('reservasObj'); // mark the field as modified
          await objeto.save(); // save the change
            }
        
      
          }
        
        
        }
         // retrieve all objects from the database

        for (const objeto of objetos) {
          const reservas = objeto.reservasObj;
        
          for (const reserva of Object.values(reservas)) {
            
            if(reserva.reservaId==reservaId){
                
              console.log(reserva.estado);
              reserva.estado = 'Confirmada';
              reserva.pagoEstado = 'Verificado';
              objeto.markModified('reservasObj'); // mark the field as modified
              await objeto.save(); // save the change
                }
            
      
          }
        
        
        }
          }
        }
      } 
      
      catch (error) {
    console.log('error', error);
  }
});

userPagos.post("/rechazar", async (req, res) => {
  const { reservaId } = req.body;
  console.log(reservaId);

  try {
    const mostrarPPV = await pagoSchema.find().exec();
    const objetos = await lavadora.find().exec();
    const objetosS = await secadora.find().exec();
    let pagoPV = Object.keys(mostrarPPV);

    for (const pago of pagoPV) {
      const pagos = mostrarPPV[pago];
      const fechaActual = new Date();
      
      console.log(fechaActual,pagos.fechaReserva);
      if (pagos.idReserva == reservaId) {
         const pagoActualizado = await pagoSchema.findOneAndUpdate({ idReserva: reservaId }, { $set: { estado: 'Rechazado' } }, { new: true });
         res.json({validate:true})


         
         for (const objeto of objetosS) {


          const reservas = objeto.reservasObj;
        
          for (const reserva of Object.values(reservas)) {
          
            if(reserva.reservaId==reservaId){
                
          console.log(reserva.estado);
          reserva.estado = 'Rechazada';
          reserva.pagoEstado = 'Rechazado';
          objeto.markModified('reservasObj'); // mark the field as modified
          await objeto.save(); // save the change
            }
        
      
          }
        
        
        }
         // retrieve all objects from the database

        for (const objeto of objetos) {
          const reservas = objeto.reservasObj;
        
          for (const reserva of Object.values(reservas)) {
            
            if(reserva.reservaId==reservaId){
                
              console.log(reserva.estado);
          reserva.estado = 'Rechazada';
          reserva.pagoEstado = 'Rechazado';
          objeto.markModified('reservasObj'); // mark the field as modified
          await objeto.save(); // save the change
                }
            
      
          }
        
        
        }
          }
        }
      } 
      
      catch (error) {
    console.log('error', error);
  }
});


userPagos.get("/mostrarHistorial", async (req, res) => {


  try {
    const mostrarPPV = await pagoSchema.find().exec();
    const pagosPV = [];
    console.log(mostrarPPV);
    for (const pago of Object.keys(mostrarPPV)) {
      const pagos = mostrarPPV[pago];
      
        pagosPV.push({ pagos });
     
    }
    console.log(pagosPV);
    res.json(pagosPV);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error al obtener pagos pendientes' });
  }
});

setInterval(async () => {
  try {
    const mostrarPPV = await pagoSchema.find().exec();


    for (const pago of mostrarPPV) {
      const fechaActual = new Date();
      if (pago.fechaPago < fechaActual) {
        pago.estado = 'Rechazado';
        await pago.save(); // Guarda cada documento individualmente
      }
    }
  } catch (error) {
    console.log('error', error);
  }
}, 5000);


userPagos.get("/mostrarPR", async (req, res) => {
  try {
    const mostrarPR = await pagoSchema.find().exec();
    const pagosPV = [];
  
    for (const pago of Object.keys(mostrarPR)) {
      const pagos = mostrarPR[pago];

      if (pagos.estado == 'Rechazado') {
        pagosPV.push({ pagos });
      }
      else{
      }
    }
    console.log();
    res.json(pagosPV);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error al obtener pagos pendientes' });
  }
});

userPagos.get("/pagosID", async (req, res) => {

  const {userId}=req.query
  try {
    const mostrarPR = await pagoSchema.find().exec();
    const pagosPV = [];
  
    for (const pago of Object.keys(mostrarPR)) {
      const pagos = mostrarPR[pago];

      if (pagos.usuarioId == userId) {
        pagosPV.push({ pagos });
      }
      else{
      }
    }
    console.log();
    res.json(pagosPV);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error al obtener pagos pendientes' });
  }
});

userPagos.get("/ganancias", async (req, res) => {
  try {
    const mostrarPR = await pagoSchema.find().exec();
    let ganancias= 0
  
    for (const pago of Object.keys(mostrarPR)) {
      const pagos = mostrarPR[pago];
      if(pagos.estado=='Verificado'){
        ganancias+=pagos.monto

      }
    }
    
    res.json(ganancias);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error al obtener pagos pendientes' });
  }
});



module.exports = userPagos

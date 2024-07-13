const userLavadora = require("express").Router();
const lavadora = require("../models/lavado"); // Importar el modelo Lavadora
const user = require("../models/usuario");
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');
uuidv4(); // 


userLavadora.post('/reservar', async (req, res) => {
  const uuid = require('uuid');
  let generateId = uuid.v4();
  let nrolavadora;
  const { fechaReservaInicio, fechaReservaFinal, montoTotal,  } = req.body;
  // console.log(fechaReservaInicio,fechaReservaFinal);

  // console.log(fechaReservaFinal,fechaReservaInicio);

  try {
  
    let lavadoraDisponible = null;
    const lavadoras = await lavadora.find();

    for (const lavadoraObj of lavadoras) {
      let reservaExiste = false;

      const reservas = lavadoraObj.reservasObj;

      for (const fecha in reservas) {
        const compare = reservas[fecha];
        for (const fechaCompare in compare) {
          if (
            (fechaReservaInicio >= compare.fechaInicio && fechaReservaInicio <= compare.fechaFinal) ||
            (fechaReservaFinal >= compare.fechaInicio && fechaReservaFinal <= compare.fechaFinal) ||
            (fechaReservaInicio <= compare.fechaInicio && fechaReservaFinal >= compare.fechaFinal)
          ) {
            reservaExiste = true;
            break;
          }
        }

        if (reservaExiste) {
          break;
        }
      }

      if (!reservaExiste) {
        lavadoraDisponible = lavadoraObj;
        break;
      }
    }

    if (lavadoraDisponible) {
      nrolavadora = lavadoraDisponible.nrolavadora;
      const reservaKeys = Object.keys(lavadoraDisponible.reservasObj).sort();
      let newReservaKey;

      if (reservaKeys.length === 0) {
        newReservaKey = 'reservaItem1';
      } else {
        const lastReservaKey = reservaKeys[reservaKeys.length - 1];
        newReservaKey = `reservaItem${parseInt(lastReservaKey.replace('reservaItem', '')) + 1}`;
      }

      console.log(newReservaKey);
      const cookies = req.headers.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      const token = tokenCookie && tokenCookie.trim().split('=')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      let nuevaReserva = {
        [newReservaKey]: {
          usuario:decoded.nombre,
          reservaId: generateId,
          estado: 'En revisión de pago',
          fechaInicio: fechaReservaInicio,
          fechaFinal: fechaReservaFinal,
          pagoEstado: 'Pendiente',
          usuarioId:decoded.userId ,
          pagoId: generateId,
          montoTotal: montoTotal
        }
      };

      lavadoraDisponible.reservasObj[newReservaKey] = nuevaReserva[newReservaKey];
       await lavadora.updateOne({ _id: lavadoraDisponible._id }, { $set: { reservasObj: lavadoraDisponible.reservasObj } });

      res.json({
        reservaId: generateId,
        pagoId: generateId,
        validate: false,
        message: `Reserva realizada con exito, se te ha asignado la lavadora nro ${nrolavadora}, chequealo en la seccion de reservas`
      });
    } else {
      res.json({ message: 'Todas las lavadoras estan reservadas para esa fecha, tu sugiero seleccionar otra' ,validate:true});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al reservar la lavadora' });
  }
});

setInterval(async () => {
  try {
    const objetos = await lavadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
     
      for (const reserva of Object.values(reservas)) {
        const fechaInicio = new Date(reserva.fechaInicio);
        const fechaFinal = new Date(reserva.fechaFinal);
        const fechaActual = new Date();

        if(fechaInicio.getTime()<fechaActual.getTime()  ){
          if(reserva.pagoEstado=='Pendiente'){
            reserva.estado = 'Rechazada';
            reserva.pagoEstado = 'Rechazado';
            objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
            await objeto.save();
          
          }
        }
        
        
        
     // <--- Agregué esta línea para actualizar el estado de la reserva a "Finalizado"
        if (fechaActual.getTime() >= fechaInicio.getTime() && fechaActual.getTime() < fechaInicio.getTime() + 60 * 1000) {
          if(reserva.pagoEstado=='Pendiente'){
            reserva.estado = 'Rechazada';
            reserva.pagoEstado = 'Rechazado';
            objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
            await objeto.save();
            break;
          }

          else{
            if(reserva.estado=='Confirmada'){
              objeto.estado = "Ocupado";
              reservaActiva = {
                reserva
              }
              objeto.markModified('reservasObj'); // guardar los cambios en la base de datos

              reserva.estado = "En curso"; // <--- Agregué esta línea para actualizar el estado de la reserva a "Finalizado"
              // console.log(fechaInicio, reservaActiva);
              objeto.reservaActiva = reservaActiva; // asignar el objeto de reserva activa
              // console.log(objeto.reservaActiva);
              await objeto.save(); // guardar los cambios en la base de datos // crear un objeto con la información relevante de la reserva
            }
        
          }
        
        }

    
        
        if(objeto.reservaActiva){

          // console.log(objeto.reservaActiva);
          let fechaReservaFinal= new Date(objeto.reservaActiva.reserva.fechaFinal)
          reserva.estado = 'En curso';
          objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
          await objeto.save();
          // console.log(fechaActual.getTime(),fechaReservaFinal.getTime());
          if (fechaActual.getTime() >= fechaReservaFinal.getTime() - 1000) {
          // buffer de 1 segundo
            // let reservaId=objeto.reservaActiva.reserva.reservaId
            console.log(reserva);
   // Actualizar la propiedad estado de la reserva en reservasObj
            reserva.estado='Finalizada'
            objeto.reservaActiva =null
            objeto.markModified('reservasObj');
            await objeto.save(); // guardar los cambios en la base de datos
          }

        }
        else{
          objeto.estado = "Disponible";
          await objeto.save(); 
        }

      
       
      }
     
     
    }

  } catch (error) {
    console.error('Error al actualizar estado de lavadoras y reservas:', error);
  }
}, 20000); // 60000 ms = 1 minute


userLavadora.get('/consultarLavadoras', async (req, res) => {
  console.log('working');
  let reservasAll = [];

  try {
    const objetos = await lavadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const nroLavadora = objeto.nrolavadora;
      console.log(objeto);
      
       const reservaData={
        nroLavadora:nroLavadora,
        lavadora:objeto,
      }

      reservasAll.push(reservaData);

      
    }
     res.json(reservasAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al recuperar objetos' });
  }
});


userLavadora.get('/consultarReservas', async (req, res) => {
  let reservasAll = [];

  try {
    const objetos = await lavadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
      const nroLavadora = objeto.nrolavadora;

      for (const reserva of Object.values(reservas)) {
        // if (reserva.estado === 'Finalizada') {
        //   console.log(reserva);
            const reservaData = {
             lavadora: nroLavadora,
             reservaF: reserva
            };

         
        // }
        reservasAll.push(reservaData);
      }
    }

     res.json(reservasAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al recuperar objetos' });
  }
});

userLavadora.get('/reservasID', async (req, res) => {
  console.log('funciona');
  const cookies = req.headers.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie && tokenCookie.trim().split('=')[1];
  const decoded = jwt.verify(token, process.env.SECRET);

  let reservasAll = [];

  try {
    const objetos = await lavadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
      const nroLavadora = objeto.nrolavadora;

      for (const reserva of Object.values(reservas)) {

        //   console.log(reserva);
        console.log(reserva);
        if(reserva.usuarioId==decoded.userId && reserva.estado != 'Finalizada'&& reserva.estado != 'Rechazada'){ 
          const reservaData = {
            lavadora: nroLavadora,
            reservaF: reserva
            };
          reservasAll.push(reservaData);
        }
           
      }
    }
    
    console.log(reservasAll);
     res.json(reservasAll);
  } catch (error) {
        if(error.name=='TokenExpiredError'){
      res.json({message:'Su sexion ha expirado, por favor, inicie sesion',validate:false})
      // const updatedUser = await user.findOneAndUpdate({ email: email }, { $set: { verificar: false } }, { new: true });

    }else{
      console.log(err);
    }
  }
});






module.exports = userLavadora

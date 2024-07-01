const userSecadora = require("express").Router();
const secadora = require("../models/secadora"); 
const jwt = require('jsonwebtoken');
// Importar el modelo Lavadora
// const { insertMany } = require("../models/usuario");


userSecadora.post('/reservar', async (req, res) => {
  const uuid = require('uuid');
  let generateId = uuid.v4();
  let nrosecadora;

  const { fechaReservaInicio, fechaReservaFinal, montoTotal, clienteId,usuario } = req.body;
  // console.log(fechaReservaInicio,fechaReservaFinal);

  // console.log(fechaReservaFinal,fechaReservaInicio);

  try {
    let secadoraDisponible = null;
    const secadoras = await secadora.find();

    for (const secadoraObj of secadoras) {
      let reservaExiste = false;

      const reservas = secadoraObj.reservasObj;

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
        secadoraDisponible = secadoraObj;
        break;
      }
    }

    if (secadoraDisponible) {
      nrosecadora = secadoraDisponible.nrosecadora;
      const reservaKeys = Object.keys(secadoraDisponible.reservasObj).sort();
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
          usuarioId: decoded.userId,
          pagoId: generateId,
          montoTotal: montoTotal
        }
      };

      secadoraDisponible.reservasObj[newReservaKey] = nuevaReserva[newReservaKey];
       await secadora.updateOne({ _id: secadoraDisponible._id }, { $set: { reservasObj: secadoraDisponible.reservasObj } });

      res.json({
        reservaId: generateId,
        pagoId: generateId,
        validate: false,
        message: `Reserva realizada con exito, se te ha asignado la secadora nro ${nrosecadora}, chequealo en la seccion de reservas`
      });
    } else {
      res.json({ message: 'Todas las secadoras estan reservadas para esa fecha, tu sugiero seleccionar otra',validate: true, });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al reservar la lavadora' ,validate: true,});
  }
});

setInterval(async () => {
  try {
    const objetos = await secadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
     
      for (const reserva of Object.values(reservas)) {
        const fechaInicio = new Date(reserva.fechaInicio);
        const fechaFinal = new Date(reserva.fechaFinal);
        const fechaActual = new Date();
    //     console.log(reserva.estado);
    //       console.log(`Fecha actual: ${fechaActual.toLocaleString()}`);
    // console.log(`Fecha final: ${fechaFinal.toLocaleString()}`);
    // console.log(`Diferencia: ${fechaActual.getTime() - fechaFinal.getTime()}`);
        
    if(fechaInicio.getTime()<fechaActual.getTime()  ){
      if(reserva.pagoEstado=='Pendiente'){
        console.log('El pago no ha sido verificado, no puedes utilizar la lavadora');
        reserva.estado = 'Rechazada';
        reserva.pagoEstado = 'Rechazado';
        objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
        await objeto.save();
      
      }
    }
    
    
     // <--- Agregué esta línea para actualizar el estado de la reserva a "Finalizado"
        if (fechaActual.getTime() >= fechaInicio.getTime() && fechaActual.getTime() < fechaInicio.getTime() + 60 * 1000) {
          if(reserva.pagoEstado=='Pendiente'){
            console.log('El pago no ha sido verificado, no puedes utilizar la lavadora');
            reserva.estado = 'Rechazada';
            reserva.pagoEstado = 'Rechazado';
            objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
            await objeto.save();
            break;
          }

          else{
            if(reserva.estado=='Confirmada'){
              console.log('LA RESERVA ES IGUAL A LA FECHA');
              objeto.estado = "Ocupado";
              reservaActiva = {
                reserva
              }
              reserva.estado = "En curso"; // <--- Agregué esta línea para actualizar el estado de la reserva a "Finalizado"
              // console.log(fechaInicio, reservaActiva);
              objeto.reservaActiva = reservaActiva; // asignar el objeto de reserva activa
              // console.log(objeto.reservaActiva);
              objeto.markModified('reservasObj');

              await objeto.save(); // guardar los cambios en la base de datos // crear un objeto con la información relevante de la reserva
            }
        
          }
        
        }

    
        
        if(objeto.reservaActiva){

          // console.log(objeto.reservaActiva);
          console.log('HAY UNA RESERVA ACTIVA');
          let fechaReservaFinal= new Date(objeto.reservaActiva.reserva.fechaFinal)
          reserva.estado = 'En curso';
          objeto.markModified('reservasObj'); // guardar los cambios en la base de datos
          await objeto.save();
          // console.log(fechaActual.getTime(),fechaReservaFinal.getTime());
          if (fechaActual.getTime() >= fechaReservaFinal.getTime() - 1000) {
          // buffer de 1 segundo
            console.log('fechas iguales o fecha actual es mayor');
            // let reservaId=objeto.reservaActiva.reserva.reservaId
            console.log(reserva);
   // Actualizar la propiedad estado de la reserva en reservasObj
            objeto.markModified('reservasObj');
            reserva.estado='Finalizada'
            objeto.reservaActiva =null
            objeto.markModified('reservasObj');

            await objeto.save(); // guardar los cambios en la base de datos
          }

        }
        else{
          console.log('NO HAY RESERVA ACTIVA');
          objeto.estado = "Disponible";
          await objeto.save(); 
        }

      
       
      }
     
     
    }

    console.log('Estado de secadoras y reservas actualizado');
  } catch (error) {
    console.error('Error al actualizar estado de lavadoras y reservas:', error);
  }
}, 15000); // 60000 ms = 1 minute


userSecadora.get('/consultarSecadoras', async (req, res) => {
  console.log('working');
  let reservasAll = [];

  try {
    const objetos = await secadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const nroSecadora = objeto.nrosecadora;
      console.log(objeto);
      
       const reservaData={
        nroSecadora:nroSecadora,
        secadora:objeto,
      }

      reservasAll.push(reservaData);

      
    }
     res.json(reservasAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al recuperar objetos' });
  }
});


userSecadora.get('/consultarReservas', async (req, res) => {
  let reservasAll = [];

  try {
    const objetos = await secadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
      const nroSecadora = objeto.nrosecadora;

      for (const reserva of Object.values(reservas)) {
        // if (reserva.estado === 'Finalizada') {
        //   console.log(reserva);
            const reservaData = {
              secadora: nroSecadora,
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



userSecadora.get('/reservasID', async (req, res) => {
  console.log('workin');
  const cookies = req.headers.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie && tokenCookie.trim().split('=')[1];
  const decoded = jwt.verify(token, process.env.SECRET);


  let reservasAll = [];

  try {
    const objetos = await secadora.find().exec(); // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
      const nrosecadora = objeto.nrosecadora;

      for (const reserva of Object.values(reservas)) {
        // if (reserva.estado === 'Finalizada') {
        //   console.log(reserva);
        if(reserva.usuarioId==decoded.userId && reserva.estado != 'Finalizada'&& reserva.estado != 'Rechazada'){
                const reservaData = {
                secadora: nrosecadora,
                reservaF: reserva
                };
  
            reservasAll.push(reservaData);
        

         
          
           
        }
           
      }
    }
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



module.exports = userSecadora

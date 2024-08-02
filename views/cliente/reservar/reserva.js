import { createNotificacion } from "../components/noti.js";

const formLavadora=document.querySelector('#formLavadora')
const validate=document.querySelector('.validate')
const ocultarJabon=document.querySelector('.ocultarjys')
const fechareserva=document.querySelector('#fechareserva')
const numeroReferencia=document.querySelector('.numeroReferencia')
const includejabon=document.querySelectorAll('input[name="jabon"]')
const includesuavizante=document.querySelectorAll('input[name="suavizante"]')
const includeservice=document.querySelectorAll('input[name="lavar"]')
const montoTotalReserva=document.querySelector('.montoReserva')
const cedulaEmisor=document.querySelector('.cedulaEmisor')
const telefonoEmisor=document.querySelector('.telefonoEmisor')
const bancoEmisor=document.querySelector('.bancoEmisor')
const banksContainer=document.querySelector('.banksCharge')
let montoFinal




<<<<<<< HEAD


=======
// Obtener el input de fecha
// const fechareservaInput = document.getElementById('fechareserva');
                    
// // Establecer el límite mínimo de fecha y hora actual
// const fechaActual = new Date();
// const fechaActualizada = fechaActual.toISOString().slice(0, 16);
// fechareservaInput.min = fechaActualizada;

// // Actualizar el límite mínimo de fecha y hora cada segundo
// setInterval(() => {
//     const fechaActual = new Date();
//     const fechaActualizada = fechaActual.toISOString().slice(0, 16);
//     fechareservaInput.min = fechaActualizada;
// }, 1000);
>>>>>>> 928e414 (solucion api caida)

validate.addEventListener('change',()=>{
   //Obteniendo el ID del usuario
   fetch('https://ve.dolarapi.com/v1/dolares/oficial')
   .then((res) => res.json())
   .then((data) => {
     montoFinal = data.promedio * 2;
      console.log(data);
           
     montoTotalReserva.innerHTML = `${montoFinal}`;
     montoFinalGlobal = montoFinal;
     
   });
}) 

let montoFinalGlobal = 0;
let selectedBank;

let reserva = {
  usuario:String,
  fechaInicio:Date,
  fechaFinal:Date,
  montoTotal: 0,
  clienteid: 0 // ID del cliente que realizó la reserva
}

let pago = {
  id: 0, // ID del pago
  idReserva: 0, // ID de la reserva que se está pagando
  idCliente: 0, // ID del cliente que realizó el pago
  cedulaEmisor: 0,
  telefonoEmisor: 0,
  bancoEmisor: '',
  numeroReferencia: 0,
  monto: 0 // monto del pago
}
document.addEventListener('DOMContentLoaded',async ()=>{
  

  fetch('../media/banks.json')
  .then((data=>data.json()))
  .then(data=>{
    let bancos=data
    console.log(bancos);



    Object.entries(bancos).forEach(([codigo, nombre]) => {
     
      // Create an option element and append it to the select element
      const option = document.createElement("option");
      option.value = `${nombre}`
      option.className = "py-2 pl-4 text-gray-600";
      option.text = `${nombre}`
      banksContainer.appendChild(option);
     
    });

    
    
    
  })



 })


//inputs de fecha y hora con flatpickr





//Calcular total

includejabon.forEach((radio) => {
  
  radio.addEventListener('change', async () => {
    let {montoTotal}=reserva
    const validarJabon = includejabon[0].checked;
    const validarServicio = includeservice[0].checked;
    const validarSuavizante=includesuavizante[0].checked

     
    if (validarSuavizante==true && validarJabon==true && validarServicio==true) {
      montoTotal = 4
    } else if (validarSuavizante==true && validarJabon==true && validarServicio==false) {
      montoTotal = 5
    } else if (validarSuavizante==true && validarJabon==false && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==true && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==true) {
      montoTotal = 2
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==false) {
      montoTotal = 3
    }
    else if (validarSuavizante==true && validarJabon==false && validarServicio==false) {
      montoTotal = 4
    }
    else if (validarSuavizante==false && validarJabon==true&& validarServicio==false) {
      montoTotal = 4
    }


          montoFinal = 40 * montoTotal;
          montoTotalReserva.innerHTML = `${montoFinal.toFixed(2)}`;
          montoFinalGlobal = montoFinal;

          console.log(montoTotal);

    
  });
});

includesuavizante.forEach((radio) => {
  radio.addEventListener('change', async () => {
    let {montoTotal}=reserva
    const validarJabon = includejabon[0].checked;
    const validarServicio = includeservice[0].checked;
    const validarSuavizante=includesuavizante[0].checked

    if (validarSuavizante==true && validarJabon==true && validarServicio==true) {
      montoTotal = 4
    } else if (validarSuavizante==true && validarJabon==true && validarServicio==false) {
      montoTotal = 5
    } else if (validarSuavizante==true && validarJabon==false && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==true && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==true) {
      montoTotal = 2
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==false) {
      montoTotal = 3
    }
    else if (validarSuavizante==true && validarJabon==false && validarServicio==false) {
      montoTotal = 4
    }
    else if (validarSuavizante==false && validarJabon==true&& validarServicio==false) {
      montoTotal = 4
    }


          montoFinal = 40* montoTotal;
          montoTotalReserva.innerHTML = `${montoFinal.toFixed(2)}`;
          montoFinalGlobal = montoFinal;

    
  });
});
includeservice.forEach((radio) => {
  radio.addEventListener('change', async () => {
    let {montoTotal}=reserva
    const validarJabon = includejabon[0].checked;
    const validarServicio = includeservice[0].checked;
    const validarSuavizante=includesuavizante[0].checked

    if (validarSuavizante==true && validarJabon==true && validarServicio==true) {
      montoTotal = 4
    } else if (validarSuavizante==true && validarJabon==true && validarServicio==false) {
      montoTotal = 5
    } else if (validarSuavizante==true && validarJabon==false && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==true && validarServicio==true) {
      montoTotal = 3
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==true) {
      montoTotal = 2
    } else if (validarSuavizante==false && validarJabon==false && validarServicio==false) {
      montoTotal = 3
    }
    else if (validarSuavizante==true && validarJabon==false && validarServicio==false) {
      montoTotal = 4
    }
    else if (validarSuavizante==false && validarJabon==true&& validarServicio==false) {
      montoTotal = 4
    }

          montoFinal = 40 * montoTotal;
          montoTotalReserva.innerHTML =`${montoFinal.toFixed(2)}`;
          montoFinalGlobal = montoFinal;

    
  });
});


//Captura el banco emisor seleccionado

//capturar datos y factura

formLavadora.addEventListener('submit',async (e)=>{


 

  let comprobarJabon=includejabon[0].checked||includejabon[1].checked
  let comprobarSuavizante=includesuavizante[0].checked||includesuavizante[1].checked
  let comprobarServicio=includeservice[0].checked||includeservice[1].checked
  console.log(comprobarJabon);

  e.preventDefault()

  if(validate.value=='lavadora'){
    if(!fechareserva.value || !validate.value || !numeroReferencia.value||!cedulaEmisor.value || !telefonoEmisor.value||!comprobarJabon||!comprobarServicio||!comprobarSuavizante){
      createNotificacion(true,'Todos los campos son obligatorios')
    }
    else{   
            reserva.montoTotal=montoFinalGlobal
            const fechaInicio = new Date(fechareserva.value);
            const fechaFinal = new Date(fechaInicio.valueOf()); // crea una copia de la fecha inicial
            fechaFinal.setHours(fechaInicio.getHours() + 1);
            reserva.fechaInicio = fechaInicio;
            reserva.fechaFinal = fechaFinal;
          console.log(fechaInicio,fechaFinal);
    
    
          try {
            const lavadora=await axios.post('/api/lavadoras/reservar',{
              fechaReservaInicio:reserva.fechaInicio,
              fechaReservaFinal:reserva.fechaFinal,
              montoTotal:reserva.montoTotal,
              clienteId:reserva.clienteid
            })
            
            createNotificacion(lavadora.data.validate,lavadora.data.message)
    
            try {
              const pago= await axios.post('/api/pagos/enviar',{
                equipoR:'lavadora',
                idReserva:lavadora.data.reservaId,
                fechaPago:reserva.fechaInicio,
                cedula:cedulaEmisor.value,
                telefono:telefonoEmisor.value,
                banco:banksContainer.value,
                numeroR:numeroReferencia.value,
                monto:montoFinalGlobal
              })
              
              
              console.log(pago);
            } catch (error) {
              console.log(error);
            }
           
          } catch (error) {
            console.log(error);
          }
    
    
          
        
          //  for (var i in reserva) {
          //    console.log(i + ": " + reserva[i]);
          // }
         
    
      
    }
  }
  else if(validate.value=='secadora'){
    if(!fechareserva.value || !validate.value || !numeroReferencia.value||!cedulaEmisor.value || !telefonoEmisor.value){
      createNotificacion(true,'Todos los campos son obligatorios')
    }else{
      try {
        let token=localStorage.getItem('token')
        const getClientId= await axios.get('/api/users/verificar',{params:{
          token:token
        }})
        reserva.clienteid=getClientId.data.userId
        reserva.usuario=getClientId.data.nombre
        reserva.montoTotal=montoFinalGlobal
  
        const fechaInicio = new Date(fechareserva.value);
        const fechaFinal = new Date(fechaInicio.valueOf()); // crea una copia de la fecha inicial
        fechaFinal.setMinutes(fechaInicio.getMinutes() + 1);
        reserva.fechaInicio = fechaInicio;
        reserva.fechaFinal = fechaFinal;
      console.log(fechaInicio,fechaFinal);
        // for (var i in reserva) {
        //   console.log(i + ": " + reserva[i]);
        // }
  
  
      } catch (error) {
        console.log(error);
      }
  
  
  
      try {
        const secadora=await axios.post('/api/secadoras/reservar',{
          fechaReservaInicio:reserva.fechaInicio,
          fechaReservaFinal:reserva.fechaFinal,
          montoTotal:reserva.montoTotal,
        })
        console.log(secadora);
        createNotificacion(secadora.data.validate,secadora.data.message)
  
        try {
          const pago= await axios.post('/api/pagos/enviar',{
            equipoR:'secadora',
            idReserva:secadora.data.reservaId,
            fechaPago:reserva.fechaInicio,
            cedula:cedulaEmisor.value,
            telefono:telefonoEmisor.value,
            banco:banksContainer.value,
            numeroR:numeroReferencia.value,
            monto:montoFinalGlobal
          })
          
          
          console.log(pago);
        } catch (error) {
          console.log(error);
        }
       
      } catch (error) {
        console.log(error);
      }
    }
  }

 

   
  
      //RESERVA DE LA SECADORA

    
  
  // console.log(fechareserva.value);




  
 



})





validate.addEventListener('change', () => {
  if (validate.value === 'secadora') {
    ocultarJabon.style.display = 'none';
    const emisor = document.querySelector('.pagoMoviEmisor');
    emisor.classList.toggle('col-span-2', true); // Agrega la clase col-span-2
  } else if (validate.value === 'lavadora') {
    ocultarJabon.style.display = 'block';
    const emisor = document.querySelector('.pagoMoviEmisor');
    emisor.classList.toggle('col-span-2', false); // Remueve la clase col-span-2
  }
});


const numericInputs = document.querySelectorAll('input[inputmode="numeric"]');

numericInputs.forEach(input => {
  input.addEventListener('input', event => {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  });
});
              const fechaInput = document.getElementById('fechareserva');
                 const fechaActual = new Date();
                 const fechaMinima = fechaActual.toISOString().slice(0, 16); // formato yyyy-MM-ddTHH:mm
                            
                fechaInput.min = fechaMinima;

















 

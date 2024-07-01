const pagosC=document.querySelector('.pagosPV')
const message=document.querySelector('#message')
const banksContainer=document.querySelector('.banksContainer')
const estadoValue = estado.value;
  const equipoValue = equipo.value;
  const montoValue = parseInt(monto.value);
  const referenciaValue = parseInt(referencia.value);
  const bancoValue=banksContainer.value
document.addEventListener('DOMContentLoaded',async ()=>{

  fetch('../media/banks.json')
  .then((data=>data.json()))
  .then(data=>{
    let bancos=data
    



    Object.entries(bancos).forEach(([codigo, nombre]) => {
     
      // Create an option element and append it to the select element
      const option = document.createElement("option");
      option.value = `${codigo}-${nombre}`
      option.text = `${codigo}-${nombre}`
      banksContainer.appendChild(option);
     
    });

    
    
    
  })


    
     
   
          try {
          

              const mostrarPPV= await axios.get('/api/pagos/mostrarHistorial')

                mostrarPPV.data.forEach(pago => {
                message.className='hidden'

                console.log(pago);
                console.log(pago.pagos.banco);
                let tr=document.createElement('tr')
                tr.className = 'bg-white border-b hover:bg-gray-100';
                let idReserva=pago.pagos.idReserva
                tr.innerHTML=`
                          
                          <td class="py-3 px-6 text-center ">${pago.pagos.equipoR}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.cedula}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.estado}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.banco}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.monto}</td>
                          <td class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
                          <td class="py-3 px-6 text-center">
                      
                          
                     
                `
  
                pagosC.appendChild(tr)
  
  
                
              });
            

            
           
           

          } catch (error) {
            console.log(error);
          }
        
        }
     
    
  
    
  
  
)

   //filtros
   
// Add event listeners to the filter inputs
estado.addEventListener('change', filtrarPagos);
equipo.addEventListener('change', filtrarPagos);
monto.addEventListener('input', filtrarPagos);
referencia.addEventListener('input', filtrarPagos);
banksContainer.addEventListener('change',filtrarPagos)

function filtrarPagos() {

  const estadoValue=estado.value
  const equipoValue=equipo.value
  const montoValue=monto.value
  const referenciaValue=referencia.value
  const bancoValue=banksContainer.value
  console.log(montoValue,referenciaValue);

  // Get the payments data from the API
  axios.get('/api/pagos/pagosId')
   .then(response => {
      const pagos = response.data;
      const filteredPagos = pagos.filter(pago => {
        let match = true;

        if (estadoValue && pago.pagos.estado!== estadoValue) {
          match = false;
        }

        if (equipoValue && pago.pagos.equipoR!== equipoValue) {
          match = false;
        }

        if (montoValue && !pago.pagos.monto.toString().includes(montoValue)) {
          match = false;
        }

        if (referenciaValue && !pago.pagos.numeroReferencia.toString.includes(referenciaValue)) {
          match = false;
        }
        if (bancoValue && pago.pagos.banco!== bancoValue) {
          match = false;
        }


        return match;
      });

      // Clear the payments container
      pagosC.innerHTML = '';

      // Render the filtered payments
      filteredPagos.forEach(pago => {
        const tr = document.createElement('tr');
        tr.className = 'bg-white border-b hover:bg-gray-100';
        tr.innerHTML = `
          <td class="py-3 px-6 text-center ">${pago.pagos.equipoR}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.cedula}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.estado}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.banco}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.monto}</td>
          <td class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
          <td class="py-3 px-6 text-center">
        `;
        pagosC.appendChild(tr);
      });
    })
   .catch(error => {
      console.log(error);
    });
}




async function cerrarSesion(){
  try {
    const response = await axios.post('/api/users/logout')
    console.log(response.data) 
    window.location.href='/login/'// Verificar que la respuesta sea correcta
  } catch (error) {
    console.error(error) // Verificar que el error sea registrado correctamente
  }
}
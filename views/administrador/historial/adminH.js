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
                          
                          <td class="py-3 px-6 text-center ">${new Date(pago.pagos.fechaPago).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(pago.pagos.fechaPago).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                          <td class="py-3 px-6 text-center ">${pago.pagos.equipoR}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.monto}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.cedula}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.estado}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.banco}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
                          <td id='tableHide' class="py-3 px-6 text-center">
                           <td  class="">
          <button data-modal-target="default-modal" onclick="mostrarModal()" data-modal-toggle="default-modal" class=" mx-auto flex justify-center lg:hidden py-2    text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          <img src="../../media/assets/eye.svg" alt="">
          </button>
        </td>
         <div class='flex justify-center'>

</div>

<!-- Main modal -->
<div id="default-modal" tabindex="-1" class="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden" style="display: none;">
<!-- Contenido del modal -->
<div class="relative p-4 w-full mt-52	 max-w-2xl max-h-full mx-auto">
<!-- Modal content -->
<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
<h2 class="text-lg text-center font-bold">DATOS DEL PAGO</h2>
<!-- Modal body -->
<div class="p-4 md:p-5 space-y-4">
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
CEDULA:${pago.pagos.cedula}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
ESTADO :${pago.pagos.estado}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
TELEFONO:${pago.pagos.telefono}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
Fecha :${new Date(pago.pagos.fechaPago).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(pago.pagos.fechaPago).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
BANCO :${pago.pagos.banco}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
REFERENCIA:${pago.pagos.numeroReferencia}

</p>
</div>
<!-- Modal footer -->
<div class="flex items-center  p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
<button data-modal-target="default-modal" onclick="cerrarModal()" data-modal-toggle="default-modal" class="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
Cerrar ventana
</button>
</div>
</div>
</div>
                      
                          
                     
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
        tr.innerHTML=`
                          
        <td class="py-3 px-6 text-center ">${new Date(pago.pagos.fechaPago).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(pago.pagos.fechaPago).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
        <td class="py-3 px-6 text-center ">${pago.pagos.equipoR}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.monto}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.cedula}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.estado}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.banco}</td>
        <td id='tableHide' class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
        <td id='tableHide' class="py-3 px-6 text-center">
         <td  class="">
<button data-modal-target="default-modal" onclick="mostrarModal()" data-modal-toggle="default-modal" class=" mx-auto flex justify-center lg:hidden py-2    text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
<img src="../../media/assets/eye.svg" alt="">
</button>
</td>
<div class='flex justify-center'>

</div>

<!-- Main modal -->
<div id="default-modal" tabindex="-1" class="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden" style="display: none;">
<!-- Contenido del modal -->
<div class="relative p-4 w-full mt-52	 max-w-2xl max-h-full mx-auto">
<!-- Modal content -->
<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
<h2 class="text-lg text-center font-bold">DATOS DEL PAGO</h2>
<!-- Modal body -->
<div class="p-4 md:p-5 space-y-4">
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
CEDULA:${pago.pagos.cedula}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
ESTADO :${pago.pagos.estado}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
TELEFONO:${pago.pagos.telefono}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
Fecha :${new Date(pago.pagos.fechaPago).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(pago.pagos.fechaPago).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
BANCO :${pago.pagos.banco}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
REFERENCIA:${pago.pagos.numeroReferencia}

</p>
</div>
<!-- Modal footer -->
<div class="flex items-center  p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
<button data-modal-target="default-modal" onclick="cerrarModal()" data-modal-toggle="default-modal" class="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
Cerrar ventana
</button>
</div>
</div>
</div>
    
        
   
`
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

function mostrarModal() {
  console.log('Botón Mostrar clickeado');
  // Verificar que el modal se muestre correctamente
  document.getElementById('default-modal').style.display = 'block';
};
function cerrarModal() {
  console.log('Botón Mostrar clickeado');
  // Verificar que el modal se muestre correctamente
  document.getElementById('default-modal').style.display = 'none';
};
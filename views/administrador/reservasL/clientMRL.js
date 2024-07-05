const reservasC=document.querySelector('.reservas')
const message=document.querySelector('#message')

document.addEventListener('DOMContentLoaded',async ()=>{

  try {
          

    const mostrarR= await axios.get('/api/lavadoras/consultarReservas')
    console.log(mostrarR);
       mostrarR.data.forEach(item => {
       message.className='hidden'

       
       let tr=document.createElement('tr')
       tr.className = 'bg-white border-b hover:bg-gray-100';
       const date = new Date(item.reservaF.fechaInicio);
       const options = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         hour12: true
       };
       const dateTimeString = date.toLocaleString('en-US', options);
       console.log(dateTimeString); // Output: "06/28/2024, 09:52 PM"
       console.log(dateTimeString); // Output: "28/06/2024, 21:52"
       tr.innerHTML = `
       <td class="py-3 text-center ">${item.lavadora}</td>
       <td class="py-3 text-center ">${item.reservaF.estado}</td>
       <td id="tableHide" class="py-3 text-center ">${item.reservaF.pagoEstado}</td>
       <td id="tableHide" class="py-3 text-center ">${item.reservaF.reservaId}</td>
       <td id="tableHide" class="py-3 text-center ">${new Date(item.reservaF.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(item.reservaF.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
       <td id="tableHide" class="py-3 text-center ">${item.reservaF.usuario}</td>
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
PAGO ESTADO:${item.reservaF.pagoEstado}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
RESERVA ID :${item.reservaF.reservaId}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
FECHA:${new Date(item.reservaF.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(item.reservaF.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
USUARIO :${item.reservaF.usuario}
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
</div>
     `;

       reservasC.appendChild(tr)


      
   });
  

  
 
 

} catch (error) {
  console.log(error);
}

  
  
})

   //filtros
const estadoPago=document.querySelector('.estadoPago')
console.log(estadoPago);
const estadoReserva=document.querySelector('#estadoReserva')
const id=document.querySelector('#id')
const nroLavadora=document.querySelector('#nroLavadora')



// Add event listeners to the filter inputs
estadoPago.addEventListener('change', filtrarReservas);
estadoReserva.addEventListener('change', filtrarReservas);
id.addEventListener('input', filtrarReservas);
nroLavadora.addEventListener('input', filtrarReservas);

function filtrarReservas() {
  // Get the payments data from the API
  axios.get('/api/lavadoras/consultarReservas')
   .then(response => {
      const reservas = response.data;
      const estadoReservaValue = estadoReserva.value; // Debes asegurarte de que estadoReserva sea un elemento HTML válido
      const estadoPagoValue = estadoPago.value; // Debes asegurarte de que estadoPago sea un elemento HTML válido
      const idValue = id.value.trim(); // Debes asegurarte de que id sea un elemento HTML válido
      const nroLavadoraValue = nroLavadora.value.trim(); // Debes asegurarte de que nroLavadora sea un elemento HTML válido

      const filteredReservas = reservas.filter(item => {
        let match = true;

        if (estadoPagoValue && item.reservaF.pagoEstado!== estadoPagoValue) {
          match = false;
        }

        if (estadoReservaValue && item.reservaF.estado!== estadoReservaValue) {
          match = false;
        }

        if (idValue &&!item.reservaF.reservaId.toString().includes(idValue)) {
          match = false;
        }

        if (nroLavadoraValue &&!item.lavadora.toString().includes(nroLavadoraValue)) {
          match = false;
        }

        return match;
      });

      // Clear the payments container
      reservasC.innerHTML = ''; // Debes asegurarte de que reservasC sea un elemento HTML válido

      // Render the filtered payments
      filteredReservas.forEach(item => {
        console.log(item);
        const tr = document.createElement('tr');
        tr.className = 'bg-white border-b hover:bg-gray-100';
        tr.innerHTML = `
        <td class="py-3 text-center ">${item.lavadora}</td>
        <td class="py-3 text-center ">${item.reservaF.estado}</td>
        <td id="tableHide" class="py-3 text-center ">${item.reservaF.pagoEstado}</td>
        <td id="tableHide" class="py-3 text-center ">${item.reservaF.reservaId}</td>
        <td id="tableHide" class="py-3 text-center ">${new Date(item.reservaF.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(item.reservaF.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
        <td id="tableHide" class="py-3 text-center ">${item.reservaF.usuario}</td>
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
 PAGO ESTADO:${item.reservaF.pagoEstado}
 </p>
 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
 RESERVA ID :${item.reservaF.reservaId}
 </p>
 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
 FECHA:${new Date(item.reservaF.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}, ${new Date(item.reservaF.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}
 </p>
 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
 USUARIO :${item.reservaF.usuario}
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
 </div>
      `;
        reservasC.appendChild(tr);
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
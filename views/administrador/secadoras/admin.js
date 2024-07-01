const container=document.querySelector('.containerS')

document.addEventListener('DOMContentLoaded',async ()=>{

  try {
    const mostrar= await axios.get('/api/secadoras/consultarSecadoras')

    mostrar.data.forEach(element => {
      console.log(element);
    const secadoraItem=document.createElement('div')
    secadoraItem.innerHTML = `
    <div class="bg-white shadow-md rounded-md text-center px-5 py-7 ">
    <h2 class="text-lg font-bold mb-2">Secadora ${element.nroSecadora}</h2>
    <p >Estado: <span ${element.secadora.estado === 'Ocupado'? 'class="text-red-600"' : 'class="text-green-600"'}>${element.secadora.estado}</span></p>
    <p>Reserva: <span ${element.secadora.reservaActiva ? `class="text-red-600">${'Hay reserva activa'}` : `class="text-red-600">${'No hay reserva activa'}`}</span></p>

    ${element.secadora.reservaActiva? `
    <button data-modal-target="default-modal" onclick="mostrarModal()" data-modal-toggle="default-modal" class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Mostrar
    </button>
<!-- Main modal -->
<div id="default-modal" tabindex="-1" class="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden" style="display: none;">
<!-- Contenido del modal -->
<div class="relative p-4 w-full max-w-2xl max-h-full mx-auto">
<!-- Modal content -->
<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
<h2 class="text-lg text-center font-bold">DATOS DE LA RESERVA</h2>
<!-- Modal body -->
<div class="p-4 md:p-5 space-y-4">
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  RESERVA ID :${element.secadora.reservaActiva.reserva.fechaInicio}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  USUARIO :${element.secadora.reservaActiva.reserva.usuario}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  ESTADO :${element.secadora.reservaActiva.reserva.estado}
</p>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  FECHA INICIO   :${new Date(element.secadora.reservaActiva.reserva.fechaInicio).toLocaleDateString('en-US')} ${new Date(element.secadora.reservaActiva.reserva.fechaInicio).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  FECHA FINAL :${new Date(element.secadora.reservaActiva.reserva.fechaFinal).toLocaleDateString('en-US')} ${new Date(element.secadora.reservaActiva.reserva.fechaFinal).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}       
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
  PAGO ESTADO :${element.secadora.reservaActiva.reserva.pagoEstado}
  </p>
</div>
<!-- Modal footer -->
<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
<button data-modal-target="default-modal" onclick="cerrarModal()" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Cerrar ventana
</button>
</div>
</div>
</div>
</div>
    </div>
    ` : ''}
    `;
    container.appendChild(secadoraItem)
    });
    console.log(mostrar);
  } catch (error) {
    console.log();
  }
  
   })
   

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

  


async function cerrarSesion(){
  try {
    const response = await axios.post('/api/users/logout')
    console.log(response.data) 
    window.location.href='/login/'// Verificar que la respuesta sea correcta
  } catch (error) {
    console.error(error) // Verificar que el error sea registrado correctamente
  }
}
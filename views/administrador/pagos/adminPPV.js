const pagosC=document.querySelector('.pagosPV')
const message=document.querySelector('#message')


document.addEventListener('DOMContentLoaded',async ()=>{

  try {
          

    const mostrarPPV= await axios.get('/api/pagos/mostrarPPV')
    console.log(mostrarPPV);
      mostrarPPV.data.forEach(pago => {
      message.className='hidden'

      console.log(pago);
      console.log(pago.pagos.banco);
      let tr=document.createElement('tr')
      tr.className = 'bg-white border-b hover:bg-gray-100  ';
      let idReserva=pago.pagos.idReserva
      tr.innerHTML=`
                
                <td class="  text-end md:text-center ">${pago.pagos.equipoR}</td>
                <td class=" text-end  md:text-center">${pago.pagos.monto}</td>
                <td class="text-end   md:text-center lg:hidden">
                
                  <button data-modal-target="default-modal" onclick="mostrarModal()" data-modal-toggle="default-modal" class=" mx-auto flex justify-end lg:hidden py-2    text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 text-end dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                  <img src="../../media/assets/eye.svg" alt="">
                  </button>
                </td>

                <td id="tableHide"  class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
                <td id="tableHide"  class="py-3 px-6 text-center">${pago.pagos.banco}</td>
                <td id="tableHide"  class="py-3 px-6 text-center">${pago.pagos.cedula}</td>

                <td id="tableHide"  class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
                <td id="tableHide"  class="py-3 px-6 text-center">
                    <button id="tableHide"  onclick="verificar('${idReserva}')" class="bg-[#68FF33] hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                        <img src="../media/assets/verify.svg" alt="">
                    </button>

                  
                </td>

                <td class="text-center py-3 px-6">
                  <button id="tableHide"   
                  onclick="rechazar('${idReserva}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <svg class=" width="24px" height="24px" h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>

                <!-- Main modal -->
<div id="default-modal" tabindex="-1" class="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden" style="display: none;">
<!-- Contenido del modal -->
<div class="relative p-4 w-full mt-52	 max-w-2xl max-h-full mx-auto">
<!-- Modal content -->
<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
<h2 class="text-lg text-center font-bold">DATOS DEL PAGO</h2>
 <!-- Modal body -->
<div class="p-5 md:p-5 space-y-4">
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

<div class='flex justify-center flex-row gap-9'>
<div>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">

<p class=" text-base leading-relaxed text-gray-500 dark:text-gray-400">VERIFICAR</p>

 <button   onclick="verificar('${idReserva}')" class="bg-[#68FF33] hover:bg-green-300 text-white font-bold ml-2 py-2 px-4 rounded">
  <img src="../media/assets/verify.svg" alt="">
  </button>
</p>
</div>


<div>
<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">

<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">RECHAZAR</p>

  <button   
    onclick="rechazar('${idReserva}')" class="bg-red-500 hover:bg-red-700 text-white font-bold ml-2 py-2 px-4 rounded">
     <svg class=" width="24px" height="24px" h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
  </button>
</p>
</div>



</div>


 


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

   })

async function verificar(idReserva){
  console.log(idReserva);

  try {
    const verificarPago= await axios.post('/api/pagos/verificar',{
      reservaId:idReserva
    }) 
    if(verificarPago.data.validate==true){
      location.reload()
    }
  } catch (error) {
    console.log(error);
  }

}

async function rechazar(idReserva){
  console.log(idReserva);

  try {
    const rechazarPago= await axios.post('/api/pagos/rechazar',{
      reservaId:idReserva
    }) 
    if(rechazarPago.data.validate==true){
      location.reload()
    }
  } catch (error) {
    console.log(error);
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




async function cerrarSesion(){
  try {
    const response = await axios.post('/api/users/logout')
    console.log(response.data) 
    window.location.href='/login/'// Verificar que la respuesta sea correcta
  } catch (error) {
    console.error(error) // Verificar que el error sea registrado correctamente
  }
}
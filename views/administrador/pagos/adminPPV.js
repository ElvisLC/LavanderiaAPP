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
      tr.className = 'bg-white border-b hover:bg-gray-100';
      let idReserva=pago.pagos.idReserva
      tr.innerHTML=`
                
                <td class="py-3 px-6 text-center ">${pago.pagos.equipoR}</td>
                <td class="py-3 px-6 text-center">${pago.pagos.cedula}</td>
                <td class="py-3 px-6 text-center">${pago.pagos.telefono}</td>
                <td class="py-3 px-6 text-center">${pago.pagos.banco}</td>
                <td class="py-3 px-6 text-center">${pago.pagos.monto}</td>
                <td class="py-3 px-6 text-center">${pago.pagos.numeroReferencia}</td>
                <td class="py-3 px-6 text-center">
                
                    <button onclick="verificar('${idReserva}')" class="bg-[#68FF33] hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                        <img src="../media/assets/verify.svg" alt="">
                    </button>
                   
                  
                </td>
                <td class="text-center py-3 px-6">
                  <button 
                   class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <svg class=" width="24px" height="24px" h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
                
           
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




async function cerrarSesion(){
  try {
    const response = await axios.post('/api/users/logout')
    console.log(response.data) 
    window.location.href='/login/'// Verificar que la respuesta sea correcta
  } catch (error) {
    console.error(error) // Verificar que el error sea registrado correctamente
  }
}
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
       tr.innerHTML=`
                
                 <td class="py-3  text-center ">${item.reservaF.reservaId}</td>
                 <td class="py-3  text-center ">${item.lavadora}</td>
                 <td class="py-3  text-center ">${item.reservaF.estado}</td>
                 <td class="py-3  text-center ">${item.reservaF.pagoEstado}</td>
                 <td class="py-3  text-center ">${dateTimeString}</td>
                 <td class="py-3  text-center ">${item.reservaF.usuario}</td>
                            

        
           
     `

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
          <td class="py-3 text-center ">${item.reservaF.reservaId}</td>
          <td class="py-3 text-center ">${item.lavadora}</td>
          <td class="py-3 text-center ">${item.reservaF.estado}</td>
          <td class="py-3 text-center ">${item.reservaF.pagoEstado}</td>
          <td class="py-3 text-center ">${item.reservaF.fechaInicio}</td>
          <td class="py-3 text-center ">${item.reservaF.usuario}</td>
          
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
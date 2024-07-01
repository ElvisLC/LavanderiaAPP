
const registradosC=document.querySelector('#registrados')
const gananciasC=document.querySelector('#ganancias')
const tasa=document.querySelector('#tasa')
const reservasC=document.querySelector('#reservas')
document.addEventListener('DOMContentLoaded',async()=>{
  try {
    const registrados= await axios.get('/api/users/registrados')
  
    registradosC.innerHTML=`${registrados.data}`
    console.log(registrados);
  } catch (error) {
    console.log(error);
  }

  try {
    const ganancias=await axios.get('/api/pagos/ganancias')
    
    gananciasC.innerHTML=`${ganancias.data.toFixed(2)}`
    console.log(ganancias);
  } catch (error) {
    console.log(error);
  }

  fetch('https://ve.dolarapi.com/v1/dolares/oficial')
  .then((res) => res.json())
  .then((data) => {
    tasa.innerHTML=`${data.promedio}`
  });

  try {
    const activas=await axios.get('/api/users/reservasActivas')
    reservasC.innerHTML=`${activas.data}`
    console.log(activas);
  } catch (error) {
    console.log(error);
  }
  
})


async function cerrarSesion(){
  try {
    const response = await axios.post('/api/users/logout')
    console.log(response.data) 
    window.location.href='/login/'// Verificar que la respuesta sea correcta
  } catch (error) {
    console.error(error) // Verificar que el error sea registrado correctamente
  }
}
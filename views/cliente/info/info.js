import { createNotificacion } from "../components/noti.js";

const usuario=document.querySelector('#usuario')
const correoSpan=document.querySelector('#correoSpan')
const telefono=document.querySelector('#telefono')
const cambiar=document.querySelector('#cambiar')
const passValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const nuevaContraseña = document.querySelector('#nuevaP');
const contraseñaActual=document.querySelector('#actualP')
const confirmarContraseña=document.querySelector('#confirmP')


nuevaContraseña.addEventListener('input', () => {
  if (!passValidate.test(nuevaContraseña.value)) {
    createNotificacion(true,'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un dígito');
    nuevaContraseña.classList.add('border-red-500');
    nuevaContraseña.classList.remove('focus:ring-2')
    nuevaContraseña.classList.remove('focus:ring-blue-500')
  } else {
    nuevaContraseña.setCustomValidity('');
    nuevaContraseña.classList.remove('border-red-500');
    nuevaContraseña.classList.add('focus:ring-2')
    nuevaContraseña.classList.add('focus:ring-blue-500')
  
  }
});

console.log(cambiar);

cambiar.addEventListener('click',async (e)=>{
  e.preventDefault()
  if(!nuevaContraseña.value&&!confirmarContraseña.value&&!contraseñaActual.value){
  createNotificacion(true,'Los campos no pueden estar vacios')
  }else if(nuevaContraseña.value!=confirmarContraseña.value){
    createNotificacion(true,'Las contraseñas deben coincidir')
    nuevaContraseña.classList.add('border-red-500')
    confirmarContraseña.classList.add('border-red-500')
    nuevaContraseña.classList.remove('focus:ring-2')
    nuevaContraseña.classList.remove('focus:ring-blue-500')
    confirmarContraseña.classList.remove('focus:ring-2')
    confirmarContraseña.classList.remove('focus:ring-blue-500')

  }
  else{
    nuevaContraseña.classList.remove('border-red-500')
    confirmarContraseña.classList.remove('border-red-500')
    nuevaContraseña.classList.add('focus:ring-2')
    nuevaContraseña.classList.add('focus:ring-blue-500')
    confirmarContraseña.classList.add('focus:ring-2')
    confirmarContraseña.classList.add('focus:ring-blue-500')

    try {
      const change= await axios.post('/api/users/cambiar',{
        nuevaP:nuevaContraseña.value,
        actualP:contraseñaActual.value
      })
      createNotificacion(change.data.validate,change.data.message)

      

    } catch (error) {
      console.log(error);
    }
  }
  
  
})



document.addEventListener('DOMContentLoaded',async ()=>{

  
    try {
      const cargarDatos=await axios.get('/api/users/cargar')
      console.log(cargarDatos);

      cargarDatos.data.forEach(element => {
      usuario.innerHTML=`${element.usuario}`
      correoSpan.innerHTML=`${element.email}`
      telefono.innerHTML=`${element.telefono}`
      });
    } catch (error) {
      console.log(error);
    }
  
  
})

   




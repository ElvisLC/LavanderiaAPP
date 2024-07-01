



const show = document.querySelector('#show')
const hide = document.querySelector('#hide')
const list = document.getElementById('list');
let menuHidden = false;

if (menuHidden) {
  list.classList.add('hidden')
  list.classList.remove('block')
  hide.classList.add('hidden')
  show.classList.remove('hidden')
} else {
  list.classList.add('block')
  list.classList.remove('hidden')
  show.classList.add('hidden')
  hide.classList.remove('hidden')
}





show.addEventListener('click', () => {
  
  list.classList.remove('slide-out');
  list.classList.add('slide-in');
  setTimeout(() => {
    list.classList.add('block');
    list.classList.remove('hidden');
  }, 0); // Cambia el timeout a 0 para que se aplique inmediatamente

  show.classList.add('hidden');
  hide.classList.remove('hidden');
  menuHidden = false;
});

hide.addEventListener('click', () => {
  list.classList.remove('slide-in');
  list.classList.add('slide-out');
  list.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Agrega la transición suave
  setTimeout(() => {
    list.classList.add('hidden');
    list.classList.remove('block');
    show.classList.remove('hidden');
    hide.classList.add('hidden');
    menuHidden = true;
    list.style.transition = ''; // Remueve la transición después de 300ms
  }, 300);
});



  document.addEventListener('DOMContentLoaded',async()=>{
    try {
      const verificar=await axios.get('/api/users/verificar')
      console.log(verificar.data);
  
      if(verificar.data.validate==true){  
      }
      else {
        console.log(verificar.data==false);
        window.location.href='/login/'
  
      }
      
    } catch (error) {
      console.log(error);
    }
  })


  const navigation = document.querySelector('[data-id="menu"]');

  navigation.addEventListener("click", function(e){
      const currentElement = e.target;
  
      if( currentElement.matches('[data-info="dropdown"], [data-info="dropdown"] *') ){
          const parentLi = currentElement.closest("li");
          
          if(parentLi.matches("[data-toggle]")){
            
              parentLi.removeAttribute("data-toggle", "");
          }else{
              parentLi.setAttribute("data-toggle", "");
          }
  
      }
  
  });


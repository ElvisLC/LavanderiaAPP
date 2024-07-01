
const navBar = document.querySelector('header')
const footer = document.querySelector('footer')
const body=document.querySelector('.bg-bg-project font-poppins')


const crearBarraNav = () => {
    navBar.innerHTML = `<img class="logoImg" src="/media/logo.jpeg" width="150 " height="150" alt="Logo de la lavandería">
        <div id="mySidenav" class="sidenav">
            <span class="closebtn btndisable" onclick="closeNav()">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
            </span>
            <a href="/home/">INICIO</a>
            <a href="#servicios">SERVICIOS</a>
            <a href="#beneficios">BENEFICIOS</a>
            <a href="/login/">RESERVA EN LINEA</a>
            <a href="/login/">INICIAR SESION</a>
          </div>
          
        <span onclick="openNav()" class="menuBtn">
            
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#053968" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg></span>`


}

const barraNavLogin = () => {
    navBar.innerHTML = `
    <img class="logoImg" src="/media/logo.jpeg" width="150 " height="150" alt="Logo de la lavandería">
    <div id="mySidenav" class="sidenav">
        <span class="closebtn btndisable" onclick="closeNav()">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
        </span>
        <a href="/home/">INICIO</a>
        <a href="/appmain/">RESERVA EN LINEA</a>
        <a href="/registro/">REGISTRARSE</a>
        <a href="/login/">INICIAR SESION</a>
      </div>
      
    <span onclick="openNav()" class="menuBtn">
        
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#053968" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg></span>`
}

const crearFooter = () => {
    footer.innerHTML =`
        <div class="footer-container py-10">

          
            <div class="itemFooter">  
            <h3>Contactanos</h3>
        <div class="contactoItem"> 
            <a href="tel:+584129005220"> 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            </a>
            <a class="disableItem" href="tel:+584129005220">
                +58 4129005220
            </a>
    
        </div>
    
        <div class="contactoItem">
            <a href="mailto:lavanderialalagunaazul@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
                </svg>
            </a>
            
    
            <a class="disableItem" href="mailto:lavanderialalagunaazul@gmail.com
              ">lavanderialalagunaazul@gmail.com
            </a>
    
        </div>
    
        <div class="contactoItem">
    
          
            <a href="href="https://www.instagram.com/lavanderia_lalagunaazul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
               </svg>
            </a>
           
    
               <a class="disableItem" href="https://www.instagram.com/lavanderia_lalagunaazul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                lavanderia_lalagunaazul
               </a>
            
          
        </div>
    
    
         </div>
            
    
        
    
            <div>
                <h3 class="mt-0">Horario</h3>
                <p class="mt-">Lunes a Viernes: 8am - 7pm</p>
                <p class="mt-3">Sábados y Domingos: 9am - 5pm</p>
            </div>
         
        </div>
    
    
    
        <div class="footer-bottom">
            <p class="t">© 2020 Todos los Derechos Reservados. | Sitio Web Creado por: Elvis La Cruz</p>
        </div>`
}

  if (window.location.pathname =='/home/') {
      console.log('workin');
      crearBarraNav()
      crearFooter()
      
  }

 else if (window.location.pathname == '/login/') {
   
    barraNavLogin()    

     crearFooter()

 }
 else if (window.location.pathname == '/registro/') {

     crearFooter()

 }

 




  
  // document.addEventListener('DOMContentLoaded',async ()=>{

  //   const token=localStorage.getItem('token')
    
  //   if(!token){
  //     window.location.href='/home/'
  //     localStorage.removeItem('token')
  //     alert('PARA RESERVAR INICIA SESION')
  //   }
  //   else{
  //     try {
  //       const verificar= await axios.get('/api/users/verificar',{params:{
  //         token:token
  //       }})
  
  //       if(verificar.data.validateToken===false){
  //         alert(verificar.data.message);
  //         localStorage.removeItem('token')
  //         window.location.href='/login/'
  //       }
  //       else{
  //         console.log('token activo');
  //       }
     
  //     } catch (error) {
  //       console.log(error);
  //     }
  
  //   }
  
  
  //  })
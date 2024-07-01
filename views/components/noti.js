const body = document.querySelector("body");
const div = document.querySelector("#notificacion");

export const createNotificacion = (error, message) => {
    div.innerHTML = ''; // Vacía el elemento #notificacion
  
    let notificationClass = '';
    let svgPath = '';
  
    if (error) {
      notificationClass = 'bg-red-500';
      svgPath = 'M18 6L6 18M6 6l12 12';
    } else {
      notificationClass = 'bg-green-500';
      svgPath = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  
    div.innerHTML = `
      <div class= "${notificationClass} text-white font-bold py-2 px-4 rounded" style="position: absolute; top: 30px; left: 50%; transform: translateX(-50%); z-index: 1000;">
        <svg class="h-6 w-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${svgPath}"></path>
        </svg>
        ${message}
      </div>
    `
  
    setTimeout(() => {
      div.remove()
    }, 3000)
  
    body.appendChild(div)
  }


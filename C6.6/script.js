const input = document.querySelector('.inp')
const send_button = document.querySelector('.btn')
const location_button = document.querySelector('.location')
const dialog_window = document.querySelector('.dialog')
const start_button = document.querySelector('.start')





start_button.addEventListener('click', () => {

    start_button.style.display = 'none'
    dialog_window.style.justifyContent = 'end'
    send_button.disabled = false
    location_button.disabled = false
    
    websocket = new WebSocket('wss://echo-ws-service.herokuapp.com')
    websocket.onopen = start_moment => {
        let pre = document.createElement("div")
        pre.innerHTML = 'Общение началось!'
        dialog_window.appendChild(pre)
        pre.classList.add('greeting')
    }
  
})



send_button.addEventListener('click', () => {
 
    if (!input.value) {
        alert('Сначала введите сообщение')
    }
    else {
        
        let message = input.value
        input.value = ''
        
        let pre = document.createElement("div")
        pre.innerHTML = `${message}`
        dialog_window.appendChild(pre)
        pre.classList.add('out_messages')
        
        websocket.send(message)
    }

    websocket.onmessage = (ans) => {
        let pre = document.createElement("div")
        pre.innerHTML = `${ans.data}`
        dialog_window.appendChild(pre)
        pre.classList.add('in_messages')
    }

})



location_button.addEventListener('click', () => {

    const error = () => {
        let pre = document.createElement("div")
        pre.innerHTML = 'Невозможно получить ваше местоположение'
        dialog_window.appendChild(pre)
        pre.classList.add('error')
    }

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        let pre = document.createElement("a")
        pre.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        pre.innerHTML = 'Местоположение'
        dialog_window.appendChild(pre)
        pre.classList.add('out_messages')
      }


    if (!"geolocation"in navigator) {

        let pre = document.createElement("div")
        pre.innerHTML = 'Geolocation не поддерживается вашим браузером'
        dialog_window.appendChild(pre)
        pre.classList.add('error')

    }
    else {
        navigator.geolocation.getCurrentPosition(success, error)
    }

})


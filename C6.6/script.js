const input = document.querySelector('.inp')
const send_button = document.querySelector('.btn')
const location_button = document.querySelector('.location')
const dialog_window = document.querySelector('.dialog')
const start_button = document.querySelector('.start')




start_button.addEventListener('click', () => {

    start_button.style.display = 'none'
    dialog_window.style.justifyContent = 'end'
    // send_button.style = 'enabled'
    // location_button.style = 'enabled'
    
    const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com')
    websocket.onopen = () => {
        let pre = document.createElement("div")
        pre.innerHTML = 'Общение началось!'
        dialog_window.appendChild(pre)
        pre.classList.add('greeting')
    }

    // websocket.onmessage = (ans) => {
    //     let pre = document.createElement("div")
    //     pre.innerHTML = `${ans.data}`
    //     dialog_window.appendChild(pre)
    //     pre.classList.add('in_messages')
    // }
    
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

    // websocket.onmessage = (ans) => {
    //     let pre = document.createElement("div")
    //     pre.innerHTML = `${ans.data}`
    //     dialog_window.appendChild(pre)
    //     pre.classList.add('in_messages')
    // }

})






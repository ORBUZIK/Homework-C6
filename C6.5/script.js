document.querySelector('.btn').addEventListener('click', () => {
    // console.log(window.screen.width)
    // concole.log(window.screen.height)
    let win_width = window.screen.width
    let win_height = window.screen.height
    document.querySelector('.ans').innerHTML = `высота: ${win_height} и ширина: ${win_width}`
})

const button = document.getElementsByClassName('responsive-btn') [0]
const navMenu = document.getElementsByClassName('header__nav-menu')[0]

button.addEventListener('click', () => {
    navMenu.classList.toggle('active')
})
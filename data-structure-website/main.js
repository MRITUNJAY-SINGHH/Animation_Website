//aos
AOS.init({
    offset: 200,
    delay: 250,
    duration: 800,
    easing: 'ease-in',
    once: false,
    mirror: false,
    anchorPlacement: 'top-button'
})




// humburger menu

const icon = document.querySelector(".nav-icon");
const headerEL = document.querySelector(".header");




icon.addEventListener("click", () => {
    headerEL.classList.toggle("active")
})
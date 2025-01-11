const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function showMenu(event){
    mobileMenu.classList.toggle('open');
}

mobileMenuBtn.addEventListener('click',showMenu);

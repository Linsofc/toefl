const menu = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const faBars = document.querySelector('.hamburger .bars');
const faClose = document.querySelector('.hamburger .close'); 

// cek login
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = './login.html';
}

hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
    
    const isOpen = menu.classList.contains('open');
    
    if (isOpen) {
        faBars.style.display = 'none';
        faClose.style.display = 'block'; 
    } else {
        faBars.style.display = 'block';
        faClose.style.display = 'none';
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); 
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach(element => observer.observe(element));
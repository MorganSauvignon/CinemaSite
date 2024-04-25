//Script pour ajouter ou retirer la classe Hidden qui cache ma navbar si je scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar'); 
    //Donc là j'enlève ma navbar en ajoutant la classe hidden si je scroll
    if (window.scrollY > 50) { 
        navbar.classList.add('hidden'); 
    //Sinon je l'enluve
    } else {
        navbar.classList.remove('hidden'); 
    }
});


// Importer les modules
// Ici il me faut la configuration pour pouvoir me connecter à ma base de données
import { db } from "./firebaseConfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Fonction pour récupérer tous les films dans ma base de données
async function getAllMovies() {
    try {
        // je récupéré mes films
        const moviesCollection = collection(db, 'movie');
        const querySnapshot = await getDocs(moviesCollection);

        // Sélectionner l'élément UL dnas laquelle je vais mettre mes films
        const filmsList = document.getElementById('films-list');

        // Je la vide au cas ou parce que j'ai eu des bugs si je la vidais pas...
        filmsList.innerHTML = '';


        // Je fais une boucle foreach pour traiter tous les films que j'ai dans ma base de données
        querySnapshot.forEach(doc => {
            const movieData = doc.data();

            // Ici je crée un un élément de liste <li> que je rajouterai plus tard dans mon UL films-list
            const li = document.createElement('li');
            // Je lui ajoute la classe css movie-item
            li.classList.add('movie-item'); 

            // Je crée l'objet image img qui contiendra le lien de l'image que j'ai dans ma base de donnée
            //Image que j'ai récupéré sur pathé.fr
            const img = document.createElement('img');
            // Dans mon objet movieData mon image c'est .image
            img.src = movieData.image; 
            img.alt = movieData.name + " Poster"; 
            // J'ajoute la classe movie-poster ici pour lui appliquer le css par la suite 
            img.classList.add('movie-poster'); 
            //Je mets l'image dans l'objet que j'ai crée plus tot
            li.appendChild(img); 


            // ICi meme principe qu'avant mais pour le titre du film
            const title = document.createElement('h3');
            title.textContent = movieData.name; 
            title.classList.add('movie-title'); 
            li.appendChild(title); 

            // Grâce à cette evénement je peux clique sur mes objets li ce qui m'emmènera sur la page du film
            // JE mets le nom du film dans l'url 
            li.addEventListener('click', () => {
                window.location.href = `moviePage.html?name=${encodeURIComponent(movieData.name)}`;
            });           


            // Voila j'ai terminé ce que je devais faire pour un film, je vais revenir au début de la boucle et faire la même chose pour chaque film
            filmsList.appendChild(li);
        });


    } catch (error) {
        console.error("Erreur lors de la récupération et de l'affichage des films:", error);
    }
}

//Ici c'est le meme principe que la fonction d'avant mais c'est pour ma grosse affiche
async function getTheBigOne() {
    try {
        const moviesCollection = collection(db, 'movie');
        //La différence c'est que je veux avoir que le film qui s'appelle LA LA LAND dans ma base de données
        const querySnapshot = await getDocs(query(moviesCollection, where('name', '==', 'LA LA LAND')));

        //JE regarde si je trouve bien un film
        if (!querySnapshot.empty) {
            const movieData = querySnapshot.docs[0].data();

            // Récupérer la div "BigOne"
            const bigOneDiv = document.querySelector('.BigOne');

            //je crée l'image
            const img = document.createElement('img');
            img.src = movieData.bigImage;
            img.alt = movieData.name + " Poster";
            img.classList.add('movie-poster');

            // Pareil que avant j'ai eu des bugs donc je vide la div
            bigOneDiv.innerHTML = '';
            bigOneDiv.appendChild(img);
        } else {
            console.log("Aucun film trouvé avec le nom La La Land dans la base de données.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération et de l'affichage du film La La Land:", error);
    }

}


//J'appelle les fonctions pour lancer les scripts
getAllMovies();
getTheBigOne();
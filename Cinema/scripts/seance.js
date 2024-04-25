import { db } from "./firebaseConfig.js";
import { collection, getDocs  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

//Cette fonction récupère toutes mes séances et mes films puis les lient entre eux
// Chaque séance appartient a une fill 
// J'ai eu du mal à ne pas dupliquer l'affiche des films s'il y avait plusieurs séances
async function getAllSessions() {
    try {
        // Récupérer les "sessions" qui sont mes séances
        const sessionsCollection = collection(db, 'session');
        const querySnapshot = await getDocs(sessionsCollection);

        // Récupérer "movie"
        const moviesCollection = collection(db, 'movie');
        const moviesQuerySnapshot = await getDocs(moviesCollection);

        // Créer un dictionnaire pour stocker les images de film avec leur nom comme clé
        // ca me permettra par la suite de lier l'image et le nom au séances pour les afficher ensemble
        const movieImages = {};
        moviesQuerySnapshot.forEach(movieDoc => {
            const movieData = movieDoc.data();
            if (movieData.image) {
                movieImages[movieData.name] = movieData.image;
            }
        });
        
// Récupérer l'élément oùje vais afficher les séances
const sessionsList = document.getElementById('sessions-list');

let sessionsContainer;

const filmContainers = {};

// Ici je parcours toutes mes séances
querySnapshot.forEach(doc => {
    const sessionData = doc.data();
    const movieName = sessionData.movieName;

    // Vérifier si le film a déjà un conteneur
    //JE fais ca justement pour ne pas dupliquer les affiches de films
    if (!filmContainers[movieName]) {
        const filmContainer = document.createElement('div');
        // Dans movie container j'aurai movie-header et mes sessions
        filmContainer.classList.add('movie-container'); 

        // Dans movie-header j'aurai l'affiche et le nom du film
        const movieHeaderContainer = document.createElement('div');
        movieHeaderContainer.classList.add('movie-header'); 

        // Créer un élément pour afficher le nom du film
        const filmNameElement = document.createElement('h2');
        filmNameElement.textContent = movieName;
        //je lui donne la classe movie-name 
        filmNameElement.classList.add('movie-name'); 
        movieHeaderContainer.appendChild(filmNameElement);

        // Ajouter l'image du film s'il existe
        //Ici ca me permet de récupérer l'affiche du film que j'ai sauvegardé plus tot dans ma fonction
        if (movieImages[movieName]) {
            const movieImgElement = document.createElement('img');
            movieImgElement.src = movieImages[movieName];
            movieImgElement.alt = movieName;
            movieImgElement.classList.add('movie-poster');
            movieHeaderContainer.appendChild(movieImgElement);
        }

        // Ajouter le conteneur du titre et de l'image du film au conteneur principal du film movie-container
        filmContainer.appendChild(movieHeaderContainer);

        movieHeaderContainer.addEventListener('click', () => {
            // Rediriger l'utilisateur vers la page moviePage.html avec le nom du film dans l'URL
            window.location.href = `moviePage.html?name=${encodeURIComponent(movieName)}`;
        });

        // Ajouter le conteneur du film au dictionnaire comme ca je ne duplique pas l'affiche de film vu que j'en ai déjà fait une 
        filmContainers[movieName] = filmContainer;

        // Ajouter le conteneur du film à la liste des séances
        sessionsList.appendChild(filmContainer);

        // Créer une div pour les sessions du film qui contiendra toutes les sessions
        sessionsContainer = document.createElement('div');
        sessionsContainer.classList.add('sessions'); 

        //J'ajoute mes sessions à la suite de mon movie-header dans movie-container
        filmContainer.appendChild(sessionsContainer);
    } else {
        // Si le film a déjà un conteneur, réutiliser celui-ci
        // Ce que je fais donc si je l'ai déjà fait pour un film
        sessionsContainer = filmContainers[movieName].querySelector('.sessions');
    }

    // Créer un élément pour afficher les informations de chaque séance
    const sessionElement = document.createElement('div');
    sessionElement.classList.add('session');
    sessionElement.innerHTML = `
        <span><strong>Heure :</strong> ${sessionData.startTime}</span>
        <span><strong>Salle :</strong> ${sessionData.numberHall}</span>
    `;

    // Ajouter l'élément de session dans la div des sessions du film
    sessionsContainer.appendChild(sessionElement);
});
    } catch (error) {
        console.error("Erreur lors de la récupération des séances:", error);
    }
}

// Appeler la fonction pour récupérer et afficher toutes les séances dès que la page est chargée
document.addEventListener('DOMContentLoaded', function () {
    getAllSessions();
});

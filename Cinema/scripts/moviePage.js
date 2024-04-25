import { db } from "./firebaseConfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

//Ici je veux récupérer un film dans ma base de donnée suivant un nom que j'ai donnée en paramètre
async function getMovieByName() {
    try {
        //Ces deux ligne me permettent d'avoir le nom du film que j'ai pu mettre dans l'url avec mon script database.js 
        const urlParams = new URLSearchParams(window.location.search);
        const movieName = urlParams.get('name');

        if (movieName) {
            const moviesCollection = collection(db, 'movie');
            //Ici donc je demande à ma base de donnée de me donner que le film qui à le nom que j'ai mit dans l'url
            const querySnapshot = await getDocs(query(moviesCollection, where('name', '==', movieName)));

            if (!querySnapshot.empty) {
                const movieData = querySnapshot.docs[0].data();
                console.log(movieData)
                //Je le renvoie pour que l'autre fonction puisse avoir les infos du films
                return movieData;
            } else {
                console.log("Aucun film trouvé avec le nom:", movieName);
                return null;
            }
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des informations du film:", error);
        return null;
    }
}

// Afficher les infos du films
async function displayMovieDetails() {
    try {
        // Récupérer le film dans la base de donnée en appelant la fonction
        const movieData = await getMovieByName();

        // Vérifier si j'ai bien un film
        if (movieData) {
            console.log(movieData)
            // Avoir tous les éléments dans ma page html pour pouvoir les remplir
            const movieImage = document.getElementById('movie-image');
            const movieTitle = document.getElementById('movie-title');
            const movieTheme = document.getElementById('movie-theme');
            const movieDirector = document.getElementById('movie-director');
            const movieDuration = document.getElementById('movie-duration');
            const movieReleaseDate = document.getElementById('movie-release-date');
            const movieResume = document.getElementById('movie-resume');
            const movieNationality = document.getElementById('movie-nationality');

            // Remplir les champs avec les données du film
            movieImage.src = movieData.image;
            movieTitle.textContent = movieData.name;
            movieTheme.textContent = `Thème: ${movieData.theme}`;
            movieDirector.textContent = `Directeur: ${movieData.director}`;
            movieDuration.textContent = `Durée: ${movieData.duration}`;
            movieReleaseDate.textContent = `Date de sortie: ${movieData.releaseDate}`;
            movieResume.textContent = `Résumé: ${movieData.resume}`;
            movieNationality.textContent = `Nationalité: ${movieData.nationality}`;
        } else {
            console.log("Aucune donnée de film à afficher.");
        }
    } catch (error) {
        console.error("Erreur lors de l'affichage des détails du film:", error);
    }
}

// Appeler la fonction pour afficher les détails du film dès que la page est chargée
//Si je ne faisais pas ca j'appelé le script avant que la page soit chargé et du coup je n'arrivais pas à récupérer mes elementById vu que la page n'était pas encore chargé 
document.addEventListener('DOMContentLoaded', displayMovieDetails);


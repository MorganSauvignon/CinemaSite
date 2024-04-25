//Script pour avoir la date du jour
function getCurrentDate()
{
    const currentDateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('fr-FR');
    currentDateElement.textContent = formattedDate;
}

getCurrentDate();
/* BARRA DI RICERCA */

function MostraBarra(event){
    const barra=event.currentTarget;

    const testa=document.querySelector('.testa');
    testa.classList.replace('testa','nascosto'); //Modifica la classe specificata, da 'testa' a 'nascosto'

    const icone=document.querySelector('.icone');
    icone.classList.replace('icone','nascosto');//Modifica la classe specificata, da 'icone' a 'nascosto'

    const cerca=document.querySelector('#barra');
    cerca.classList.remove('nascosto');
}

const barra=document.querySelector('#cerca');
barra.addEventListener('click',MostraBarra);


function NascondiBarra(event){

    const testa=document.querySelector('.nascosto'); // Questa volta la classe si chiama 'nascosto'
    testa.classList.replace('nascosto','testa'); //Stessa cosa di prima, ma al contrario

    const icone=document.querySelector('.nascosto');
    icone.classList.replace('nascosto','icone');

    const cerca=document.querySelector('#barra');
    cerca.classList.add('nascosto');
}

const indietro=document.querySelector('#annulla');
indietro.addEventListener('click',NascondiBarra);

/* CAMBIO IMMAGINI IN BANNER */
function imgSx (event){
    const image = event.currentTarget;

    const prima_immagine= document.querySelector ('#banner');
    const seconda_immagine= document.querySelector ('#banner2');
    prima_immagine.classList.add('nascosto');
    seconda_immagine.classList.remove('nascosto');
}

const image = document.querySelector('#sinistra');
image.addEventListener('click', imgSx);

function imgDx(event){
    
    const image=event.currentTarget;

    const prima_immagine= document.querySelector ('#banner');
    const seconda_immagine= document.querySelector ('#banner2');
    prima_immagine.classList.remove('nascosto');
    seconda_immagine.classList.add('nascosto');
}

const image2 = document.querySelector ('#destra');
image2.addEventListener ('click',imgDx);


/* CAMBIO IMMAGINI IN CONSUMER*/
function change(event){
    const xbox=document.querySelector('#hover');
    xbox.src='immagini/windows-11.jpg';
}

const xbox=document.querySelector('#hover');
xbox.addEventListener ('mouseenter', change);

function revert(event){
    const xbox=document.querySelector('#hover');
    xbox.src='immagini/gldn-XSX-CP-Xbox-Series-X.png';
}

const xbox2=document.querySelector('#hover');
xbox2.addEventListener ('mouseleave', revert);

/*Iscrizione alla newsletter*/ 

function newsletter(event){
    const button=event.currentTarget;
    button.removeEventListener('click',newsletter);

    button.classList.add('nascosto');

    const input=document.createElement('input');
    const accetta=document.createElement('button');
    const testo=document.createElement('a');

    const container=document.querySelector('#buttons');

    container.appendChild(testo);
    container.appendChild(input);
    container.appendChild(accetta);
    
    accetta.classList.add('btn2');
    accetta.classList.add('accetta');
    accetta.textContent='CONFERMA';
    testo.textContent='Inserisci la tua email: ';
}

const button=document.querySelector('#iscrizione');
button.addEventListener('click',newsletter);

/*  API PER LA REALIZZAZIONE DI UNO SPAZIO PER LE NEWS  */ 

function fetchNews(apiUrl) {
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(checkResponseStatus) // Controlla lo stato della risposta HTTP
            .then(parseJSONResponse) // Parsifica la risposta JSON
            .then(resolve) // Risolvi la Promise con i dati ottenuti
            .catch(reject); // Gestisci eventuali errori
    });
}

// Funzione per controllare lo stato della risposta HTTP
function checkResponseStatus(response) {
if (!response.ok) {
    throw new Error(`Errore HTTP! Codice: ${response.status}`);
}
return response.json(); // Ritorna la risposta parsificata come JSON
}

// Funzione per parsificare la risposta JSON
function parseJSONResponse(data) {
return data; // Ritorna i dati parsificati
}

// Funzione per elaborare i dati delle notizie e aggiungere gli articoli alla lista
function processNewsData(json) {
    const articoli= json.articles;
    console.log(articoli);

    const newsList = document.getElementById('newsList');
    articoli.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a class='lista2' href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(li);
    });
}

// Funzione per gestire il caricamento delle notizie
function handleNewsLoading() {
    const apiKey = '66f041cd9040cab629e03969d81f08a1';
    const apiUrl = 'https://gnews.io/api/v4/search?q=microsoft&token='+ apiKey +'&lang=it';

    fetchNews(apiUrl)
        .then(processNewsData) // Chiamata alla funzione di elaborazione dei dati
        .catch(handleError); // Gestione degli errori
}

// Funzione per gestire gli errori
function handleError(error) {
   console.error('Errore nel caricamento delle notizie:', error);
}

// Funzione per inizializzare l'applicazione
function initializeApp() {
    // Gestione dell'evento al caricamento della pagina
    document.addEventListener('DOMContentLoaded', () => {
        handleNewsLoading();
    });
}

// Chiama la funzione initializeApp per avviare l'applicazione
initializeApp();
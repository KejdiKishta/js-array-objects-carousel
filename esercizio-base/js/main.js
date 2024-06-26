const images = [
  {
    image: "img/01.webp",
    title: "Marvel's Spiderman Miles Morale",
    text: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
  },
  {
    image: "img/02.webp",
    title: "Ratchet & Clank: Rift Apart",
    text: "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.",
  },
  {
    image: "img/03.webp",
    title: "Fortnite",
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  },
  {
    image: "img/04.webp",
    title: "Stray",
    text: "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city",
  },
  {
    image: "img/05.webp",
    title: "Marvel's Avengers",
    text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
  },
];

// Milestone 1:
// Nel markup allegato rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva con i relativi titolo e testo diventerà visibile.

// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

//* ciclo di stampa
for (let i = 0; i < images.length; i++) {
  const element = images[i];
  
  //* stampo in console
  console.log(element.image);
  console.log(element.title);
  console.log(element.text);
  console.log("-----------------");
  
  //* stampa nel DOM del carousel
  let imgContainer = document.querySelector(".my-carousel-images");
  imgContainer.innerHTML +=
  `
  <div class="my-carousel-item" carousel-item="1">
    <img
      class="img-fluid"
      src="./${element.image}"
      alt="Marvel's Spiderman Miles Morale picture"
    />
    <div class="item-description px-3">
      <h2>${element.title}</h2>
      <p>${element.text}</p>
    </div>
  </div>
  `;

  //* stampa nel DOM miniature
  let thumbnailsContainer = document.querySelector(".my-thumbnails");
  thumbnailsContainer.innerHTML +=
  `
  <img
    class="img-fluid my-thumbnail"
    src="./${element.image}"
    alt="Thumbnail of ${element.title}"
  />
  `
}

//* attivazione della prima slide
let carouselSlide = document.querySelectorAll(".my-carousel-item");
console.log(carouselSlide);

let carouselThumbnail = document.querySelectorAll(".my-thumbnail");
console.log(carouselThumbnail);

let carouselIndex = 0;

carouselSlide[carouselIndex].classList.add("active");
carouselThumbnail[carouselIndex].classList.add("active")

//* event listener freccia destra
let arrowR = document.querySelector(".my-next");
arrowR.addEventListener("click", nextImg);

function nextImg () {
  //* tolgo active alla prima immagine
  carouselSlide[carouselIndex].classList.remove("active");
  carouselThumbnail[carouselIndex].classList.remove("active")

  //* incremento con condizioni per tornare all'inizio
  if (carouselIndex < images.length - 1) {
    carouselIndex++;
  } else {
    carouselIndex = 0;
  }

  //*aggiungo active alla successiva
  carouselSlide[carouselIndex].classList.add("active");
  carouselThumbnail[carouselIndex].classList.add("active");  
}

//* event listener freccia sinistra
let arrowL = document.querySelector(".my-previous");
arrowL.addEventListener("click", previousImg);

function previousImg() {
  //* tolgo active al'immagine corrente
  carouselSlide[carouselIndex].classList.remove("active");
  carouselThumbnail[carouselIndex].classList.remove("active")

  //* decremento cpn condizioni per tornare alla fine
  if (carouselIndex > 0) {
    carouselIndex--;
  } else {
    carouselIndex = images.length - 1;
  }

  //* aggiungo active alla precedente
  carouselSlide[carouselIndex].classList.add("active");
  carouselThumbnail[carouselIndex].classList.add("active");  
};

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

//* ciclo per aggiungere event listener
for (let i = 0; i < carouselThumbnail.length; i++) {
  const element = carouselThumbnail[i];
  element.addEventListener("click", () => {
    //* tolgo active all'img corrente
    carouselSlide[carouselIndex].classList.remove("active");
    carouselThumbnail[carouselIndex].classList.remove("active");

    //* trasformo l'indice del carousel nell'indice della thumnail cliccata
    carouselIndex = i

    //* aggiungo active al nuovo indice
    carouselSlide[carouselIndex].classList.add("active");
    carouselThumbnail[carouselIndex].classList.add("active");
  })
}

// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

let autoChange = document.querySelector("#my-stop-button")
//* contatore di click
let click = 1;
//* flag che cambia ad ogni click
let flag = false;
//* nome varibile con intervallo
let interval;
autoChange.addEventListener("click", autoBtn);

//*funzione attiva/disattiva
function autoBtn() {
  click++;
  //* cambio flag ad ogni click
  if (click % 2 === 0) {
    flag = true;
    } else {
    flag = false
  }
  console.log(flag);

  //* condizione di creazione e eliminazione intervallo
  if (flag === true){
    //* intervallo con funzione di scorrimento
    interval = setInterval(() => {
    //* tolgo active alla prima immagine
    carouselSlide[carouselIndex].classList.remove("active");
  
    //* incremento
    if (carouselIndex < images.length - 1) {
      carouselIndex++;
    } else {
      carouselIndex = 0;
    }
    
    //*aggiungo active alla successiva
    carouselSlide[carouselIndex].classList.add("active");
    }, 3000);
  } else {
    clearInterval(interval);
  }
}
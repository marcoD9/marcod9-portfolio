"use strict";

//-----------Animazioni----------//
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Aggiunge la classe quando l'elemento è visibile
        } else {
          entry.target.classList.remove("visible"); // Rimuove la classe quando l'elemento non è più visibile
        }
      });
    },
    { threshold: 0.15 } // 15% dell'elemento visibile
  );

  sections.forEach((section) => observer.observe(section));
});

//------------Gestione navigazione con la navbar----------//
document.addEventListener("DOMContentLoaded", () => {
  // Seleziona tutti i link della navbar che puntano a sezioni interne
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Aggiungi un evento click su ogni link della navbar
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Impedisce il comportamento di navigazione predefinito

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Aggiungi un offset di 50px
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth", // Scorrimento fluido
        });
      }
    });
  });
});

//-----------Gestione delle frecce per lo scroll orizzontale delle cards e dots----------//
document.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const dotsContainer = document.querySelector(".dots-container");

  let slides = []; // Array per contenere tutte le card
  let dots = []; // Array per contenere tutti i pallini
  let currentSlideIndex = 0; // L'indice della card attualmente visibile

  // Controllo robusto che tutti gli elementi necessari siano presenti
  if (!cardsWrapper || !leftArrow || !rightArrow || !dotsContainer) {
    console.error(
      "ERROR: One or more carousel elements not found. Check your HTML classes/IDs."
    );
    return;
  }

  // --- Funzione per aggiornare lo stato 'active' sui pallini ---
  function updateActiveDot() {
    // Rimuovi la classe 'active' da tutti i pallini
    dots.forEach((dot) => dot.classList.remove("active"));

    // Aggiungi la classe 'active' al pallino corrispondente alla card attiva
    // Usiamo l'ID della card attiva per trovare il pallino corrispondente tramite il suo ID
    if (slides[currentSlideIndex]) {
      const activeCardId = slides[currentSlideIndex].id;
      const activeDot = document.getElementById(`${activeCardId}-dot`); // Trova il pallino con l'ID corretto
      if (activeDot) {
        activeDot.classList.add("active");
      }
    }
  }

  // --- Funzione per aggiornare la posizione del carosello e gli indicatori ---
  function updateCarouselPosition() {
    // Clamping dell'indice per assicurarsi che rimanga nei limiti
    if (currentSlideIndex < 0) {
      currentSlideIndex = 0;
    }
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = slides.length - 1;
    }

    // Calcola la posizione di scroll per la card corrente
    const targetScrollLeft = slides[currentSlideIndex].offsetLeft;
    cardsWrapper.scrollTo({ left: targetScrollLeft, behavior: "smooth" });

    // Aggiorna lo stato visivo delle frecce e dei pallini
    updateActiveCardAndArrows();
  }

  // Event Listener per la freccia SINISTRA
  leftArrow.addEventListener("click", () => {
    currentSlideIndex--; // Decrementa l'indice della slide
    updateCarouselPosition(); // Applica lo spostamento e aggiorna gli indicatori
  });

  // Event Listener per la freccia DESTRA
  rightArrow.addEventListener("click", () => {
    currentSlideIndex++; // Incrementa l'indice della slide
    updateCarouselPosition(); // Applica lo spostamento e aggiorna gli indicatori
  });

  // Funzione per determinare la card attualmente visibile e gestire frecce/pallini
  const updateActiveCardAndArrows = () => {
    // Trova la slide attualmente più visibile nel wrapper
    let nearestSlideIndex = 0;
    let minDistance = Infinity;

    const wrapperScrollLeft = cardsWrapper.scrollLeft;
    const wrapperCenter = wrapperScrollLeft + cardsWrapper.clientWidth / 2;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - wrapperCenter);

      if (distance < minDistance) {
        minDistance = distance;
        nearestSlideIndex = index;
      }
    });

    currentSlideIndex = nearestSlideIndex; // Aggiorna l'indice della slide corrente

    updateActiveDot(); // Chiama la funzione per aggiornare i pallini in base al nuovo indice

    // Logica per disabilitare/abilitare le frecce in base ai bordi dello scroll
    const isAtStart = cardsWrapper.scrollLeft <= 5;
    const isAtEnd =
      Math.round(cardsWrapper.scrollLeft + cardsWrapper.clientWidth) >=
      cardsWrapper.scrollWidth - 5;

    leftArrow.disabled = isAtStart;
    rightArrow.disabled = isAtEnd;
  };

  // Ascolta l'evento di scroll sul wrapper delle card
  cardsWrapper.addEventListener("scroll", updateActiveCardAndArrows);

  // Al ridimensionamento della finestra, ricalcola e riallinea la card corrente
  window.addEventListener("resize", () => {
    updateCarouselPosition();
  });

  // --- Inizializzazione al caricamento della pagina ---
  window.addEventListener("load", () => {
    // Popola l'array 'slides' con tutte le card
    slides = Array.from(document.querySelectorAll(".cards-wrapper .card"));
    // Popola l'array 'dots' con tutti i pallini
    dots = Array.from(document.querySelectorAll(".dots-container .dot"));

    // Forzare un ricalcolo del layout
    const forceReflow = cardsWrapper.offsetWidth;

    // Aggiungi un piccolo ritardo per dare tempo al browser di calcolare tutte le dimensioni
    setTimeout(() => {
      updateCarouselPosition(); // Posiziona il carosello sulla prima slide e aggiorna lo stato iniziale
    }, 50);

    // Gestione opacità body (per animazione caricamento)
    document.body.classList.add("loaded");
    document.querySelectorAll(".card video").forEach((el) => {
      el.style.opacity = 1;
    });
  });
});
//-----Fix rendering su dispositivi mobili (IntersectionObserver)-------//
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  // Controlla manualmente se gli elementi sono già visibili al caricamento
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add("visible");
    }
    observer.observe(section);
  });
});

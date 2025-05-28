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

//-----------Gestione delle frecce per lo scroll orizzontale delle cards----------//
document.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!cardsWrapper || !leftArrow || !rightArrow) {
    console.error(
      "ERRORE: Uno o più elementi DOM essenziali non sono stati trovati."
    );
    return;
  }

  // Calcolo della quantità di scroll per ogni clic
  let scrollAmount = cardsWrapper.clientWidth;

  // Event Listener per la freccia SINISTRA
  leftArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({
      left: -scrollAmount, // Scorri a sinistra della larghezza esatta di una card
      behavior: "smooth",
    });
  });

  // Event Listener per la freccia DESTRA
  rightArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({
      left: scrollAmount, // Scorri a destra della larghezza esatta di una card
      behavior: "smooth",
    });
  });

  // Logica per abilitare/disabilitare le frecce in base alla posizione di scroll
  const updateArrowVisibility = () => {
    // Disabilita freccia sinistra se all'inizio dello scroll
    if (cardsWrapper.scrollLeft <= 5) {
      leftArrow.disabled = true;
      leftArrow.style.opacity = "0.5";
      leftArrow.style.cursor = "not-allowed";
    } else {
      leftArrow.disabled = false;
      leftArrow.style.opacity = "1";
      leftArrow.style.cursor = "pointer";
    }

    // Disabilita freccia destra se alla fine dello scroll
    // Usiamo Math.round per gestire possibili differenze di pixel dovute all'arrotondamento
    if (
      Math.round(cardsWrapper.scrollLeft + cardsWrapper.clientWidth) >=
      cardsWrapper.scrollWidth - 5
    ) {
      rightArrow.disabled = true;
      rightArrow.style.opacity = "0.5";
      rightArrow.style.cursor = "not-allowed";
    } else {
      rightArrow.disabled = false;
      rightArrow.style.opacity = "1";
      rightArrow.style.cursor = "pointer";
    }
  };

  cardsWrapper.addEventListener("scroll", updateArrowVisibility);

  // Re-calcola scrollAmount quando la finestra viene ridimensionata
  window.addEventListener("resize", () => {
    scrollAmount = cardsWrapper.clientWidth;
    updateArrowVisibility(); // Aggiorna anche la visibilità delle frecce
  });

  // Inizializza lo stato delle frecce al caricamento della pagina
  updateArrowVisibility();
});

//-----Fix rendering su dispositivi mobili-------//
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

//-------Gestione del caricamento delle immagini e dei video------//
window.addEventListener("load", () => {
  // Aggiungi opacità alle immagini e ai video
  document.querySelectorAll(".card video").forEach((el) => {
    el.style.opacity = 1;
  });
  document.body.style.display = "block";
  // Aggiungi la classe loaded
  document.body.classList.add("loaded");
});

window.addEventListener("load", () => {
  document.body.style.display = "none";
  setTimeout(() => {
    document.body.style.display = "block";
  }, 0);
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

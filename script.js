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
    console.error("ERROR: One or more elements not found.");
    return;
  }

  let scrollAmount = 0; // Inizializza a 0, verrà aggiornato dopo il caricamento

  // Event Listener per la freccia SINISTRA
  leftArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Event Listener per la freccia DESTRA
  rightArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Logica per abilitare/disabilitare le frecce in base alla posizione di scroll
  const updateArrowVisibility = () => {
    const conditionLeft = cardsWrapper.scrollLeft <= 5;
    const conditionRight =
      Math.round(cardsWrapper.scrollLeft + cardsWrapper.clientWidth) >=
      cardsWrapper.scrollWidth - 5;

    // Disabilita freccia sinistra se all'inizio dello scroll
    if (conditionLeft) {
      leftArrow.disabled = true;
    } else {
      leftArrow.disabled = false;
    }

    // Disabilita freccia destra se alla fine dello scroll
    if (conditionRight) {
      rightArrow.disabled = true;
    } else {
      rightArrow.disabled = false;
    }
  };

  // Ascolta l'evento di scroll sul wrapper delle card
  cardsWrapper.addEventListener("scroll", updateArrowVisibility);

  // Re-calcola scrollAmount quando la finestra viene ridimensionata
  window.addEventListener("resize", () => {
    scrollAmount = cardsWrapper.clientWidth; // Aggiorna la quantità di scroll
    updateArrowVisibility(); // E aggiorna la visibilità delle frecce
  });

  // --- Ricalcola Layout --- //
  window.addEventListener("load", () => {
    // Forzare un ricalcolo del layout qui.
    const forceReflow = cardsWrapper.offsetWidth;
    setTimeout(() => {
      scrollAmount = cardsWrapper.clientWidth; // Ricalcola scrollAmount con i valori finali
      updateArrowVisibility(); // Esegui la prima verifica dello stato delle frecce
    }, 200);

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

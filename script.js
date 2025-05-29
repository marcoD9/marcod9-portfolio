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
      "ERROR: One or more elements (cardsWrapper, arrows) not found."
    );
    return;
  }

  // Inizializza scrollAmount. Sarà ricalcolato su resize e load.
  // Inizialmente usiamo clientWidth, che è la larghezza visibile del contenitore.
  let scrollAmount = cardsWrapper.clientWidth;

  // Event Listener per la freccia SINISTRA
  leftArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Event Listener per la freccia DESTRA
  rightArrow.addEventListener("click", () => {
    cardsWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Re-calcola scrollAmount quando la finestra viene ridimensionata
  window.addEventListener("resize", () => {
    scrollAmount = cardsWrapper.clientWidth; // Aggiorna la quantità di scroll
    // NON CHIAMIAMO updateArrowVisibility qui, perché le frecce saranno sempre abilitate
  });

  // --- Ricalcola Layout al Caricamento (per assicurare valori corretti) --- //
  window.addEventListener("load", () => {
    // Questo forza un ricalcolo del layout, utile per assicurarsi che clientWidth sia corretto.
    // Non strettamente necessario se i tuoi elementi hanno dimensioni fisse o si caricano rapidamente.
    const forceReflow = cardsWrapper.offsetWidth;
    setTimeout(() => {
      scrollAmount = cardsWrapper.clientWidth; // Ricalcola scrollAmount con i valori finali
      // NON CHIAMIAMO updateArrowVisibility qui
    }, 200);

    // Gestione opacità body (per animazione caricamento) - mantieni se necessario
    document.body.classList.add("loaded");
    // La parte relativa all'opacità dei video non è più necessaria, ora che usi GIF/WebP e il CSS
    // delle animazioni (se lo riabiliterai per altre sezioni).
  });

  // La funzione 'updateArrowVisibility' e i relativi listener sono stati RIMOSSI.
  // Questo fa sì che le frecce siano sempre visibili e cliccabili dal punto di vista JavaScript.
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

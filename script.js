"use strict";
//-------------------------NavBar-----------------//
// Seleziona gli elementi della navbar e della linguetta
const navbar = document.querySelector("#myNav");
const navTab = document.querySelector("#navToggle");
// Funzione per alternare lo stato della navbar
function toggleNav() {
  if (navbar) {
    navbar.classList.toggle("open");
  } else {
    console.error("Elemento #myNav non trovato");
  }
}
// Funzione per chiudere la navbar se clicchi fuori
function closeNav(event) {
  if (!navbar.contains(event.target) && !navTab.contains(event.target)) {
    // Chiudi la navbar se il clic è fuori dalla navbar e dalla linguetta
    navbar.classList.remove("open");
  }
}
// Aggiungi un event listener alla linguetta per alternare la navbar
if (navTab) {
  navTab.addEventListener("click", toggleNav);
} else {
  console.error("Elemento #navToggle non trovato");
}
// Aggiungi un event listener al documento per chiudere la navbar se clicchi fuori
document.addEventListener("click", closeNav);

//------------------Progetti---------------------------//////////////
// Seleziona tutte le card
const cards = document.querySelectorAll(".card");

// Aggiungi evento click a ogni card
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Chiude i link in modo che non aprano nuove pagine
    if (e.target.tagName === "A") return;

    // Chiudi tutte le altre card
    cards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove("open");
      }
    });

    // Alterna lo stato "open" per la card corrente
    card.classList.toggle("open");

    // Ferma la propagazione dell'evento
    e.stopPropagation();
  });
});

// Chiudi la card se si clicca fuori
document.addEventListener("click", () => {
  cards.forEach((card) => card.classList.remove("open"));
});

//-----------Animazioni----------/////////////
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

//Fix rendering su dispositivi mobili//
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

// Gestione del comportamento di scorrimento con offset
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

window.addEventListener("load", () => {
  // Aggiungi opacità alle immagini e ai video
  document.querySelectorAll(".logos img, .card video").forEach((el) => {
    el.style.opacity = 1;
  });
  // Rimuovi il display none (se necessario)
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

// Riferimenti agli elementi
const contactButton = document.querySelector(".contact-tab-button");
const contactSection = document.querySelector(".contact");
const backgroundDiv = document.querySelector(".background");

// Mostra/nasconde la sezione dei contatti al clic del bottone
contactButton.addEventListener("click", function (event) {
  contactSection.classList.toggle("open");
  event.stopPropagation(); // Previene la propagazione dell'evento clic
});

// Chiudi la sezione se clicchi fuori
document.addEventListener("click", function (event) {
  // Se il clic non è all'interno del contactButton o della contactSection, chiudiamo il menu
  if (
    !contactButton.contains(event.target) &&
    !contactSection.contains(event.target)
  ) {
    contactSection.classList.remove("open");
  }
});

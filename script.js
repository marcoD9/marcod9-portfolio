"use strict";

//-----------Animations----------//
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Adds the class when the element is visible
        } else {
          entry.target.classList.remove("visible"); // Removes the class when the element is no longer visible
        }
      });
    },
    { threshold: 0.15 } // 15% of the element
  );

  sections.forEach((section) => observer.observe(section));
});

//------------Navigation handling with the navbar----------//
document.addEventListener("DOMContentLoaded", () => {
  // Select all navbar links that point to internal sections
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Add a click event to each navbar link
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevents the default navigation behavior

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Add an offset of 50px
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth", // Smooth scrolling
        });
      }
    });
  });
});

//-----------Handling arrows for horizontal card scroll and dots----------//
document.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const dotsContainer = document.querySelector(".dots-container");

  let slides = []; // Array to hold all cards
  let dots = []; // Array to hold all dots
  let currentSlideIndex = 0; // The index of the currently visible card

  // Robust check that all required elements are present
  if (!cardsWrapper || !leftArrow || !rightArrow || !dotsContainer) {
    console.error(
      "ERROR: One or more carousel elements not found. Check your HTML classes/IDs."
    );
    return;
  }

  // --- Function to update the 'active' state on dots ---
  function updateActiveDot() {
    // Remove the 'active' class from all dots
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add the 'active' class to the dot corresponding to the active card
    // Use the ID of the active card to find the corresponding dot by its ID
    if (slides[currentSlideIndex]) {
      const activeCardId = slides[currentSlideIndex].id;
      const activeDot = document.getElementById(`${activeCardId}-dot`); // Find the dot with the correct ID
      if (activeDot) {
        activeDot.classList.add("active");
      }
    }
  }

  // --- Function to update carousel position and indicators ---
  function updateCarouselPosition() {
    // Clamp the index to ensure it stays within bounds
    if (currentSlideIndex < 0) {
      currentSlideIndex = 0;
    }
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = slides.length - 1;
    }

    // Calculate the scroll position for the current card
    const targetScrollLeft = slides[currentSlideIndex].offsetLeft;
    cardsWrapper.scrollTo({ left: targetScrollLeft, behavior: "smooth" });

    // Update the visual state of arrows and dots
    updateActiveCardAndArrows();
  }

  // Event Listener for the LEFT arrow
  leftArrow.addEventListener("click", () => {
    currentSlideIndex--; // Decrement the slide index
    updateCarouselPosition(); // Apply the movement and update indicators
  });

  // Event Listener for the RIGHT arrow
  rightArrow.addEventListener("click", () => {
    currentSlideIndex++; // Increment the slide index
    updateCarouselPosition(); // Apply the movement and update indicators
  });

  // Function to determine the currently visible card and handle arrows/dots
  const updateActiveCardAndArrows = () => {
    // Find the slide currently most visible in the wrapper
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

    currentSlideIndex = nearestSlideIndex; // Update the current slide index

    updateActiveDot(); // Call the function to update the dots based on the new index

    // Logic to disable/enable arrows based on scroll edges
    const isAtStart = cardsWrapper.scrollLeft <= 5;
    const isAtEnd =
      Math.round(cardsWrapper.scrollLeft + cardsWrapper.clientWidth) >=
      cardsWrapper.scrollWidth - 5;

    leftArrow.disabled = isAtStart;
    rightArrow.disabled = isAtEnd;
  };

  // Listen to the scroll event on the cards wrapper
  cardsWrapper.addEventListener("scroll", updateActiveCardAndArrows);

  // On window resize, recalculate and realign the current card
  window.addEventListener("resize", () => {
    updateCarouselPosition();
  });

  // --- Initialization on page load ---
  window.addEventListener("load", () => {
    // Populate the 'slides' array with all cards
    slides = Array.from(document.querySelectorAll(".cards-wrapper .card"));
    // Populate the 'dots' array with all dots
    dots = Array.from(document.querySelectorAll(".dots-container .dot"));

    // Force a layout recalculation
    const forceReflow = cardsWrapper.offsetWidth;

    // Add a small delay to give the browser time to calculate all dimensions
    setTimeout(() => {
      updateCarouselPosition(); // Position the carousel on the first slide and update the initial state
    }, 50);

    // Handle body opacity (for loading animation)
    document.body.classList.add("loaded");
    document.querySelectorAll(".card video").forEach((el) => {
      el.style.opacity = 1;
    });
  });
});
//-----Fix rendering on mobile devices (IntersectionObserver)-------//
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
  // Manually check if elements are already visible on load
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add("visible");
    }
    observer.observe(section);
  });
});

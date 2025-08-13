// script/main.js

// Import jQuery (assuming it's available via CDN as in your HTML)
const $ = window.jQuery;

// Utility function to initialize DOM elements
const initElements = () => ({
  bars: $(".fa-bars"),
  navbar: $(".navbar"),
  header: $(".header"),
  accordionHeaders: $(".accordion-header"),
  preloader: document.getElementById("preloader"),
  main: document.querySelector(".main"),
  popup: document.querySelector(".popup"),
  close: document.querySelector(".close"),
  click: document.querySelector(".click"),
  scrollIndicator: document.querySelector("#scroll-indicator"),
  form: document.getElementById("form"),
  toTop: document.querySelector(".to-top"),
});

// Event handlers
const setupEventListeners = (elements) => {
  // Hamburger menu toggle
  elements.bars.on("click", function () {
    $(this).toggleClass("fa-times");
    elements.navbar.toggleClass("nav-toggle");
  });

  // Scroll and load effects
  $(window).on("load scroll", () => {
    elements.bars.removeClass("fa-times");
    elements.navbar.removeClass("nav-toggle");

    if ($(window).scrollTop() > 30) {
      elements.header.css({
        background: "#6C5CE7",
        "box-shadow": "0 .2rem .5rem rgba(0,0,0,.4)",
      });
    } else {
      elements.header.css({ background: "none", "box-shadow": "none" });
    }
  });

  // Accordion toggle
  elements.accordionHeaders.on("click", function () {
    $(".accordion .accordion-body").slideUp();
    $(this).next(".accordion-body").slideDown();
    $(".accordion .accordion-header span").text("+");
    $(this).children("span").text("-");
  });

  // Preloader hide on load
  window.addEventListener("load", () => {
    if (elements.preloader) elements.preloader.style.display = "none";
  });

  // Popup close handlers
  [elements.close, elements.click].forEach((el) => {
    if (el) {
      el.addEventListener("click", () => {
        if (elements.popup) elements.popup.style.display = "none";
        if (elements.main) elements.main.style.filter = "blur(0px)";
      });
    }
  });

  // Scroll indicator
  window.onscroll = () => {
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = (window.scrollY / maxHeight) * 100;
    if (elements.scrollIndicator) {
      elements.scrollIndicator.style.width = `${percentage}%`;
    }
  };

  // Form submission
  if (elements.form) {
    elements.form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Your Form have been submitted successfully");
      location.reload(true);
    });
  }

  // Back to top button
  window.addEventListener("scroll", () => {
    if (elements.toTop) {
      if (window.pageYOffset > 100) {
        elements.toTop.classList.add("active");
      } else {
        elements.toTop.classList.remove("active");
      }
    }
  });
};

// Optional: Initialize popup delay (commented out in original)
const setupPopupDelay = (elements) => {
  // Uncomment and adjust if needed
  // window.onload = () => {
  //   setTimeout(() => {
  //     if (elements.popup) elements.popup.style.display = "block";
  //     if (elements.main) elements.main.style.filter = "blur(2px)";
  //   }, 2000);
  // };
};

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  const elements = initElements();
  setupEventListeners(elements);
  // setupPopupDelay(elements); // Uncomment if popup delay is desired
});

// Export for potential module use (if using ES modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initElements, setupEventListeners };
}
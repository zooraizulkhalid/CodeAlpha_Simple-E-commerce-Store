"use strict";

// ==========================================
// VOID DISTRICT — STORE POLICIES
// ==========================================

// ------------------------------------------
// MOBILE NAVIGATION — FIXED
// ------------------------------------------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}


// ------------------------------------------
// SHOPPING BAG — OPEN CART DRAWER
// ------------------------------------------

const shoppingBagButton = document.getElementById("bagButton");

if (shoppingBagButton) {
  shoppingBagButton.addEventListener("click", () => {
    if (typeof window.openCartDrawer === "function") {
      window.openCartDrawer();
    }
  });
}

// ------------------------------------------
// NAVBAR PRODUCT SEARCH
// ------------------------------------------

const searchContainer = document.getElementById("navSearchContainer");
const searchToggle = document.getElementById("navSearchToggle");
const searchInput = document.getElementById("navSearchInput");

if (searchContainer && searchToggle && searchInput) {
  const closeSearch = () => {
    searchContainer.classList.remove("is-open");
    searchToggle.setAttribute("aria-expanded", "false");
    searchInput.tabIndex = -1;
  };

  searchToggle.addEventListener("click", () => {
    const isOpen = searchContainer.classList.toggle("is-open");

    searchToggle.setAttribute("aria-expanded", String(isOpen));
    searchInput.tabIndex = isOpen ? 0 : -1;

    if (isOpen) {
      searchInput.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  });
}

// ------------------------------------------
// POLICY SIDEBAR NAVIGATION
// ------------------------------------------

const policyLinks = Array.from(
  document.querySelectorAll(".policies-navigation a[href^='#']"),
);

const policySections = policyLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

let selectedSectionId = null;
let navigationTimer = null;

function setActivePolicyLink(sectionId) {
  policyLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// ------------------------------------------
// CLICK TO SCROLL
// ------------------------------------------

policyLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) return;

    event.preventDefault();

    setActivePolicyLink(sectionId);
    selectedSectionId = sectionId;

    clearTimeout(navigationTimer);

    targetSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });

    history.replaceState(null, "", `#${sectionId}`);

    navigationTimer = setTimeout(() => {
      selectedSectionId = null;
      updateActivePolicyOnScroll();
    }, 1200);
  });
});

// ------------------------------------------
// ACTIVE SECTION ON SCROLL
// ------------------------------------------

function updateActivePolicyOnScroll() {
  if (!policySections.length || selectedSectionId) return;

  const scrollPosition = window.scrollY + 170;

  let activeSectionId = policySections[0].id;

  policySections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    if (scrollPosition >= sectionTop) {
      activeSectionId = section.id;
    }
  });

  setActivePolicyLink(activeSectionId);
}

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(() => {
      updateActivePolicyOnScroll();
      scrollTicking = false;
    });
  },
  { passive: true },
);

window.addEventListener("resize", updateActivePolicyOnScroll);

// ------------------------------------------
// INITIAL SECTION STATE
// ------------------------------------------

const initialHash = decodeURIComponent(window.location.hash.slice(1));

if (initialHash && document.getElementById(initialHash)) {
  setActivePolicyLink(initialHash);
} else {
  updateActivePolicyOnScroll();
}

window.addEventListener("load", updateActivePolicyOnScroll);

// ------------------------------------------
// FOOTER COPYRIGHT YEAR
// ------------------------------------------

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

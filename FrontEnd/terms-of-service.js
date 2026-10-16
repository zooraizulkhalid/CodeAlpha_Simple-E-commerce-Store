
"use strict";

/* =====================================================
   VOID DISTRICT — TERMS OF SERVICE
   File: terms-of-service.js

   Features:
   1. Mobile navigation
   2. Navbar product search
   3. Shopping bag / Cart drawer
   4. Keyboard accessibility
   5. Active sidebar navigation
   6. Smooth section scrolling
   7. Dynamic copyright year
   8. Back-to-top functionality

   Cart drawer logic is handled by cart-drawer.js.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. MOBILE NAVIGATION
     =================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  /* ===================================================
     2. NAVBAR PRODUCT SEARCH
     =================================================== */

  const searchContainer = document.getElementById(
    "navSearchContainer"
  );

  const searchToggle = document.getElementById(
    "navSearchToggle"
  );

  const searchForm = document.getElementById(
    "navSearchForm"
  );

  const searchInput = document.getElementById(
    "navSearchInput"
  );

  function closeSearch() {
    if (!searchContainer || !searchToggle) return;

    searchContainer.classList.remove("is-open");

    searchToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    searchToggle.setAttribute(
      "aria-label",
      "Open product search"
    );

    if (searchInput) {
      searchInput.tabIndex = -1;
    }
  }

  function openSearch() {
    if (!searchContainer || !searchToggle) return;

    closeMobileMenu();

    searchContainer.classList.add("is-open");

    searchToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    searchToggle.setAttribute(
      "aria-label",
      "Close product search"
    );

    if (searchInput) {
      searchInput.tabIndex = 0;
      searchInput.focus();
    }
  }

  if (searchContainer && searchToggle) {
    searchToggle.addEventListener("click", () => {
      const isOpen = searchContainer.classList.contains(
        "is-open"
      );

      if (isOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    document.addEventListener("click", (event) => {
      if (!searchContainer.contains(event.target)) {
        closeSearch();
      }
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      const query = searchInput.value.trim();

      if (!query) {
        event.preventDefault();
        searchInput.focus();
      }

      // Valid searches use the HTML form action:
      // shop.html?search=...
    });
  }

  /* ===================================================
     3. SHOPPING BAG / CART DRAWER
     =================================================== */

  const shoppingBagButton = document.getElementById(
    "bagButton"
  );

  if (shoppingBagButton) {
    shoppingBagButton.addEventListener("click", () => {
      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      } else {
        console.warn(
          "VOID District: Cart drawer is not available."
        );
      }
    });
  }

  /* ===================================================
     4. KEYBOARD ACCESSIBILITY
     =================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeSearch();
    }
  });

  /* ===================================================
     5. ACTIVE SIDEBAR NAVIGATION
     =================================================== */

  const sidebarLinks = Array.from(
    document.querySelectorAll(
      '.service-navigation a[href^="#"]'
    )
  );

  const serviceSections = sidebarLinks
    .map((link) => {
      const href = link.getAttribute("href");
      const id = href.slice(1);

      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveSection(sectionId) {
    sidebarLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    if (!serviceSections.length) return;

    const activationLine = 170;
    let currentSection = serviceSections[0];

    for (const section of serviceSections) {
      const rect = section.getBoundingClientRect();

      if (rect.top <= activationLine) {
        currentSection = section;
      } else {
        break;
      }
    }

    setActiveSection(currentSection.id);
  }

  if (serviceSections.length) {
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;

          window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
          });
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    window.addEventListener(
      "hashchange",
      updateActiveSection
    );

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("href").slice(1);
        setActiveSection(id);
      });
    });

    updateActiveSection();
  }

  /* ===================================================
     6. SMOOTH INTERNAL NAVIGATION
     =================================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  ).forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion.matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      if (window.history.replaceState) {
        window.history.replaceState(
          null,
          "",
          `#${targetId}`
        );
      }
    });
  });

  /* ===================================================
     7. DYNAMIC COPYRIGHT YEAR
     =================================================== */

  const currentYear = document.getElementById(
    "currentYear"
  );

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ===================================================
     8. BACK TO TOP
     =================================================== */

  const backToTop = document.querySelector(
    '.footer-bottom a[href="#"]'
  );

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches
          ? "auto"
          : "smooth"
      });
    });
  }

});

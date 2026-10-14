
"use strict";

/* =========================================
   VOID DISTRICT — ABOUT PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     1. MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileMenu();
      }
    });
  }


  /* =========================================
     2. NAVBAR SEARCH
  ========================================= */

  const searchContainer = document.getElementById("navSearchContainer");
  const searchToggle = document.getElementById("navSearchToggle");
  const searchForm = document.getElementById("navSearchForm");
  const searchInput = document.getElementById("navSearchInput");

  function closeSearch() {
    if (!searchContainer || !searchToggle || !searchInput) return;

    searchContainer.classList.remove("is-open");

    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-label", "Open product search");

    searchInput.tabIndex = -1;
  }

  if (searchContainer && searchToggle && searchInput) {

    searchToggle.addEventListener("click", () => {
      const isOpen = searchContainer.classList.toggle("is-open");

      searchToggle.setAttribute("aria-expanded", String(isOpen));

      searchToggle.setAttribute(
        "aria-label",
        isOpen ? "Close product search" : "Open product search"
      );

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
  }

  if (searchForm && searchInput) {

    searchForm.addEventListener("submit", (event) => {
      const searchTerm = searchInput.value.trim();

      if (!searchTerm) {
        event.preventDefault();
        searchInput.focus();
        return;
      }

      searchInput.value = searchTerm;
    });
  }


  /* =========================================
     3. SHOPPING BAG COUNTER
  ========================================= */

  const bagButton = document.getElementById("bagButton");
  const bagCount = document.getElementById("bagCount");

  function updateBagCount() {

    if (typeof getCartCount !== "function") return;

    const count = getCartCount();

    if (bagCount) {
      bagCount.textContent = String(count);
    }

    if (bagButton) {
      bagButton.setAttribute(
        "aria-label",
        `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`
      );
    }
  }

  updateBagCount();

  // Open the existing cart drawer.
  if (bagButton) {

    bagButton.addEventListener("click", () => {

      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      } else {
        window.location.href = "./cart.html";
      }

    });
  }

  // Synchronize cart count when another tab changes it.
  window.addEventListener("storage", (event) => {

    if (
      event.key === "voidDistrictCart" ||
      event.key === "voidDistrictCartCount"
    ) {
      updateBagCount();
    }

  });


  /* =========================================
     4. WISHLIST COUNTER
  ========================================= */

  // wishlist.js already handles wishlist updates.
  // Only initialize the existing counter function.

  if (typeof updateWishlistCount === "function") {
    updateWishlistCount();
  }


  /* =========================================
     5. KEYBOARD ACCESSIBILITY
  ========================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeMobileMenu();

      if (
        searchContainer &&
        searchContainer.classList.contains("is-open")
      ) {
        closeSearch();

        if (searchToggle) {
          searchToggle.focus();
        }
      }

      // The cart drawer's Escape handling
      // is already implemented in cart-drawer.js.
    }

  });


  /* =========================================
     6. CURRENT FOOTER YEAR
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});

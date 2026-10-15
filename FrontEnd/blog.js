"use strict";

/* ==========================================
   VOID DISTRICT — THE JOURNAL
   Blog Page JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ======================================
       CURRENT YEAR
    ====================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ======================================
       BLOG CATEGORY FILTERS
    ====================================== */

  const filterContainer = document.getElementById("blogFilters");
  const filterButtons = document.querySelectorAll(".blog-filter");
  const blogCards = document.querySelectorAll(".blog-card");
  const emptyState = document.getElementById("blogEmptyState");
  const filterStatus = document.getElementById("blogFilterStatus");

  function filterArticles(category) {
    let visibleCount = 0;

    blogCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      const shouldShow = category === "all" || cardCategory === category;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.category === category;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} article${visibleCount === 1 ? "" : "s"} displayed.`;
    }
  }

  if (filterContainer) {
    filterContainer.addEventListener("click", (event) => {
      const button = event.target.closest(".blog-filter");

      if (!button || !filterContainer.contains(button)) {
        return;
      }

      const category = button.dataset.category;

      if (!category) {
        return;
      }

      filterArticles(category);
    });
  }

  /* ======================================
       MOBILE NAVIGATION
    ====================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) {
      return;
    }

    menuToggle.classList.remove("active");
    navLinks.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileMenu();
      }
    });
  }

  /* ======================================
       PRODUCT SEARCH
    ====================================== */

  const searchContainer = document.getElementById("navSearchContainer");

  const searchToggle = document.getElementById("navSearchToggle");

  const searchForm = document.getElementById("navSearchForm");

  const searchInput = document.getElementById("navSearchInput");

  function closeSearch() {
    if (!searchContainer || !searchToggle) {
      return;
    }

    searchContainer.classList.remove("is-open");

    searchToggle.setAttribute("aria-expanded", "false");

    if (searchInput) {
      searchInput.tabIndex = -1;
    }
  }

  if (searchContainer && searchToggle) {
    searchToggle.addEventListener("click", () => {
      const isOpen = searchContainer.classList.toggle("is-open");
      searchToggle.setAttribute("aria-expanded", String(isOpen));
      searchToggle.setAttribute(
        "aria-label",
        isOpen ? "Close product search" : "Open product search",
      );

      if (searchInput) {
        searchInput.tabIndex = isOpen ? 0 : -1;

        if (isOpen) {
          searchInput.focus();
        }
      }
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      const query = searchInput.value.trim();

      if (!query) {
        event.preventDefault();
        searchInput.focus();
        return;
      }

      searchInput.value = query;
    });
  }

  /* ======================================
       CLOSE MENUS ON OUTSIDE CLICK
    ====================================== */

  document.addEventListener("click", (event) => {
    if (searchContainer && !searchContainer.contains(event.target)) {
      closeSearch();
    }

    if (
      menuToggle &&
      navLinks &&
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  /* ======================================
       KEYBOARD ACCESSIBILITY
    ====================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeMobileMenu();
    }
  });

  /* ======================================
       SHOPPING BAG
    ====================================== */

  const bagButton = document.getElementById("bagButton");

  if (bagButton) {
    bagButton.addEventListener("click", () => {
      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      } else {
        console.warn("Cart drawer is not available on this page.");
      }
    });
  }

  /* ======================================
       NEWSLETTER — HONEST DEMO STATE
       Real provider integration comes next.
    ====================================== */

  const newsletterForm = document.getElementById("blogNewsletterForm");

  const newsletterEmail = document.getElementById("blogNewsletterEmail");

  const newsletterStatus = document.getElementById("blogNewsletterStatus");

  if (newsletterForm && newsletterEmail && newsletterStatus) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = newsletterEmail.value.trim();

      if (!email || !newsletterEmail.checkValidity()) {
        newsletterStatus.textContent = "Please enter a valid email address.";

        newsletterEmail.focus();
        return;
      }

      newsletterStatus.textContent =
        "Newsletter subscriptions are not available yet. " +
        "Your email has not been saved or submitted.";
    });
  }
});

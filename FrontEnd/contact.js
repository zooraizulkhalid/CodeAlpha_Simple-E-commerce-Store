
"use strict";

/* =========================================
   VOID DISTRICT — CONTACT PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     EMAILJS CONFIGURATION
  ========================================= */

  const EMAILJS_PUBLIC_KEY = "PmA98Jt3hVE4WtSXz";
  const EMAILJS_SERVICE_ID = "service_w6nz6lu";
  const EMAILJS_TEMPLATE_ID = "template_4q45d9c";

  /* =========================================
     1. MOBILE NAVIGATION
  ========================================= */

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

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileMenu();
      }
    });
  }


  /* =========================================
     2. NAVBAR SEARCH
  ========================================= */

  const searchContainer =
    document.getElementById("navSearchContainer");

  const searchToggle =
    document.getElementById("navSearchToggle");

  const searchForm =
    document.getElementById("navSearchForm");

  const searchInput =
    document.getElementById("navSearchInput");

  function closeSearch() {

    if (!searchContainer || !searchToggle || !searchInput) {
      return;
    }

    searchContainer.classList.remove("is-open");

    searchToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    searchToggle.setAttribute(
      "aria-label",
      "Open product search"
    );

    searchInput.tabIndex = -1;
  }

  if (searchContainer && searchToggle && searchInput) {

    searchToggle.addEventListener("click", () => {

      const isOpen =
        searchContainer.classList.toggle("is-open");

      searchToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      searchToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close product search"
          : "Open product search"
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

      const term = searchInput.value.trim();

      if (!term) {
        event.preventDefault();
        searchInput.focus();
        return;
      }

      searchInput.value = term;
    });
  }


  /* =========================================
     3. SHOPPING BAG
  ========================================= */

  const bagButton = document.getElementById("bagButton");
  const bagCount = document.getElementById("bagCount");

  function updateBagCount() {

    if (typeof getCartCount !== "function") {
      return;
    }

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

  if (bagButton) {

    bagButton.addEventListener("click", () => {

      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      } else {
        window.location.href = "./cart.html";
      }

    });
  }

  window.addEventListener("storage", (event) => {

    if (
      event.key === "voidDistrictCart" ||
      event.key === "voidDistrictCartCount"
    ) {
      updateBagCount();
    }

  });


  /* =========================================
     4. WISHLIST
  ========================================= */

  // wishlist.js already manages the wishlist UI.

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
    }
  });


  /* =========================================
     6. FOOTER YEAR
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================
     7. CONTACT FORM — EMAILJS
  ========================================= */

  const contactForm =
    document.getElementById("contactForm");

  const submitButton =
    document.getElementById("contactSubmitButton");

  const formStatus =
    document.getElementById("contactFormStatus");

  if (!contactForm || !submitButton || !formStatus) {
    return;
  }

  function showStatus(message, type) {

    formStatus.textContent = message;

    formStatus.classList.remove(
      "is-success",
      "is-error",
      "is-loading"
    );

    if (type) {
      formStatus.classList.add(`is-${type}`);
    }
  }

  contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    if (
      !EMAILJS_PUBLIC_KEY ||
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID
    ) {
      showStatus(
        "Contact form is not configured yet. Please try again later.",
        "error"
      );
      return;
    }

    if (
      typeof window.emailjs === "undefined" ||
      typeof window.emailjs.send !== "function"
    ) {
      showStatus(
        "Email service is unavailable. Please try again later.",
        "error"
      );
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (name.length < 2 || message.length < 10) {
      showStatus(
        "Please enter your full name and a message of at least 10 characters.",
        "error"
      );
      return;
    }

    submitButton.disabled = true;

    showStatus("Sending your message...", "loading");

    try {

      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          reply_to: email,
          subject: subject,
          message: message
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      showStatus(
        "Your message has been sent successfully! We'll get back to you soon.",
        "success"
      );

      contactForm.reset();

    } catch (error) {

      console.error("VOID District contact form error:", error);

      showStatus(
        "We couldn't send your message. Please try again later.",
        "error"
      );

    } finally {

      submitButton.disabled = false;

    }

  });

});

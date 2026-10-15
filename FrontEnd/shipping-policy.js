
/* =========================================
   VOID DISTRICT — SHIPPING POLICY
   Page Interactions
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // CURRENT YEAR
  // =========================================

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // =========================================
  // MOBILE NAVIGATION
  // =========================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    function closeMobileMenu() {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
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
  }

  // =========================================
  // NAVBAR SEARCH
  // =========================================

  const searchContainer = document.getElementById("navSearchContainer");
  const searchToggle = document.getElementById("navSearchToggle");
  const searchInput = document.getElementById("navSearchInput");

  if (searchContainer && searchToggle && searchInput) {
    function closeSearch() {
      searchContainer.classList.remove("is-open");
      searchToggle.setAttribute("aria-expanded", "false");
      searchInput.setAttribute("tabindex", "-1");
    }

    searchToggle.addEventListener("click", () => {
      const isOpen = searchContainer.classList.toggle("is-open");

      searchToggle.setAttribute("aria-expanded", String(isOpen));

      searchInput.setAttribute("tabindex", isOpen ? "0" : "-1");

      if (isOpen) {
        searchInput.focus();
      } else {
        searchInput.blur();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    });

    document.addEventListener("click", (event) => {
      if (!searchContainer.contains(event.target)) {
        closeSearch();
      }
    });
  }

  // =========================================
  // SHOPPING BAG / CART DRAWER
  // =========================================

  const shoppingBagButton = document.getElementById("bagButton");

  if (shoppingBagButton) {
    shoppingBagButton.addEventListener("click", () => {
      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      }
    });
  }

  // =========================================
  // SIDEBAR ACTIVE NAVIGATION
  // =========================================

  const sidebarLinks = Array.from(
    document.querySelectorAll(".shipping-navigation a")
  );

  const shippingSections = sidebarLinks
    .map((link) => {
      const sectionId = link.getAttribute("href");

      return sectionId
        ? document.querySelector(sectionId)
        : null;
    })
    .filter(Boolean);

  function setActiveSection(sectionId) {
    sidebarLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (shippingSections.length > 0) {
    // Highlight a section immediately when clicked.
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const sectionId = link.getAttribute("href")?.slice(1);

        if (sectionId) {
          setActiveSection(sectionId);
        }
      });
    });

    // Update active section as the user scrolls.
    let scrollTicking = false;

    function updateActiveSection() {
      const activationLine = 160;

      let activeSection = shippingSections[0];

      shippingSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          activeSection = section;
        }
      });

      if (activeSection) {
        setActiveSection(activeSection.id);
      }

      scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          scrollTicking = true;
          window.requestAnimationFrame(updateActiveSection);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", updateActiveSection);

    window.addEventListener("hashchange", updateActiveSection);

    updateActiveSection();
  }
});

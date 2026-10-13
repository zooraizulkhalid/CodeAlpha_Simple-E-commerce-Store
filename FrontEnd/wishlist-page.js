
"use strict";

/* =========================================
   VOID DISTRICT — WISHLIST PAGE
========================================= */

// Page elements
const wishlistProductGrid = document.getElementById(
  "wishlistProductGrid"
);

const wishlistEmpty = document.getElementById(
  "wishlistEmpty"
);

const wishlistTotal = document.getElementById(
  "wishlistTotal"
);

const wishlistBottom = document.getElementById(
  "wishlistBottom"
);

const wishlistBagButton = document.getElementById(
  "bagButton"
);

const wishlistBagCount = document.getElementById(
  "bagCount"
);

const wishlistMenuToggle = document.getElementById(
  "menuToggle"
);

const wishlistNavLinks = document.getElementById(
  "navLinks"
);

const wishlistNewsletterForm = document.getElementById(
  "newsletterForm"
);

const wishlistNewsletterEmail = document.getElementById(
  "newsletterEmail"
);

const wishlistNewsletterMessage = document.getElementById(
  "newsletterMessage"
);

const wishlistCurrentYear = document.getElementById(
  "currentYear"
);

/* =========================================
   HELPERS
========================================= */

function formatWishlistPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

function getWishlistProductUrl(product) {
  return `./product.html?product=${encodeURIComponent(
    product.id
  )}`;
}

/* =========================================
   CREATE WISHLIST HEART
========================================= */

function createWishlistPageHeart(product) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "product-wishlist-btn is-saved";

  button.dataset.wishlistId = String(product.id);

  button.setAttribute("aria-pressed", "true");

  button.setAttribute(
    "aria-label",
    `Remove ${product.name} from wishlist`
  );

  button.title = "Remove from Wishlist";

  button.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
      />
    </svg>
  `;

  return button;
}

/* =========================================
   CREATE SAVED PRODUCT CARD
========================================= */

function createWishlistProductCard(product) {
  const article = document.createElement("article");
  article.className = "wishlist-product-card";

  const productUrl = getWishlistProductUrl(product);

  // Image wrapper
  const imageWrap = document.createElement("div");
  imageWrap.className = "wishlist-product-image";

  // Product image link
  const imageLink = document.createElement("a");

  imageLink.href = productUrl;

  imageLink.setAttribute(
    "aria-label",
    `View ${product.name} details`
  );

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.alt || product.name;
  image.loading = "lazy";

  imageLink.appendChild(image);

  // Remove heart
  const heartButton = createWishlistPageHeart(product);

  imageWrap.append(imageLink, heartButton);

  // Product information
  const info = document.createElement("div");
  info.className = "wishlist-product-info";

  const heading = document.createElement("h3");

  const headingLink = document.createElement("a");
  headingLink.href = productUrl;
  headingLink.textContent = product.name;

  heading.appendChild(headingLink);

  const subtitle = document.createElement("p");
  subtitle.className = "wishlist-product-subtitle";
  subtitle.textContent = product.subtitle || "";

  const price = document.createElement("span");
  price.className = "wishlist-product-price";
  price.textContent = formatWishlistPrice(product.price);

  // View product link
  const viewProduct = document.createElement("a");

  viewProduct.href = productUrl;
  viewProduct.className = "wishlist-view-product";

  const viewText = document.createElement("span");
  viewText.textContent = "VIEW PRODUCT";

  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  arrow.setAttribute("aria-hidden", "true");

  viewProduct.append(viewText, arrow);

  info.append(
    heading,
    subtitle,
    price,
    viewProduct
  );

  article.append(imageWrap, info);

  return article;
}

/* =========================================
   RENDER WISHLIST
========================================= */

function renderWishlistPage() {
  if (!wishlistProductGrid) {
    return;
  }

  if (
    typeof products === "undefined" ||
    !Array.isArray(products)
  ) {
    console.error("Product data is unavailable.");
    return;
  }

  if (typeof getWishlist !== "function") {
    console.error("Wishlist system is unavailable.");
    return;
  }

  const savedIds = getWishlist();

  // Preserve the order in which products were saved.
  const savedProducts = savedIds
    .map((id) =>
      products.find(
        (product) => String(product.id) === String(id)
      )
    )
    .filter(Boolean);

  wishlistProductGrid.replaceChildren();

  savedProducts.forEach((product) => {
    wishlistProductGrid.appendChild(
      createWishlistProductCard(product)
    );
  });

  const count = savedProducts.length;
  const isEmpty = count === 0;

  wishlistTotal.textContent =
    `${count} SAVED ${count === 1 ? "PRODUCT" : "PRODUCTS"}`;

  wishlistEmpty.hidden = !isEmpty;
  wishlistBottom.hidden = isEmpty;

  // Keep navbar count and heart states synchronized.
  if (typeof refreshWishlistUI === "function") {
    refreshWishlistUI();
  }
}

/* =========================================
   REMOVE SAVED PRODUCT
========================================= */

if (wishlistProductGrid) {
  wishlistProductGrid.addEventListener(
    "click",
    (event) => {
      const heartButton = event.target.closest(
        ".product-wishlist-btn"
      );

      if (
        !heartButton ||
        !wishlistProductGrid.contains(heartButton)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const productId = heartButton.dataset.wishlistId;

      if (typeof removeFromWishlist !== "function") {
        return;
      }

      removeFromWishlist(productId);

      // The wishlistUpdated event triggers a re-render.
    }
  );
}

/* =========================================
   WISHLIST SYNCHRONIZATION
========================================= */

// Re-render whenever a product is saved or removed.
window.addEventListener(
  "wishlistUpdated",
  renderWishlistPage
);

// Sync changes made in another browser tab.
window.addEventListener(
  "storage",
  renderWishlistPage
);

// Restore the latest saved state when returning to page.
window.addEventListener(
  "pageshow",
  renderWishlistPage
);

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (wishlistMenuToggle && wishlistNavLinks) {
  function closeWishlistMobileMenu() {
    wishlistNavLinks.classList.remove("is-open");

    wishlistMenuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    wishlistMenuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  wishlistMenuToggle.addEventListener("click", () => {
    const expanded =
      wishlistMenuToggle.getAttribute("aria-expanded") ===
      "true";

    wishlistNavLinks.classList.toggle(
      "is-open",
      !expanded
    );

    wishlistMenuToggle.setAttribute(
      "aria-expanded",
      String(!expanded)
    );

    wishlistMenuToggle.setAttribute(
      "aria-label",
      expanded
        ? "Open navigation menu"
        : "Close navigation menu"
    );
  });

  wishlistNavLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeWishlistMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeWishlistMobileMenu();
    }
  });
}

/* =========================================
   CART COUNT & DRAWER
========================================= */

function updateWishlistBagCount() {
  if (!wishlistBagCount || !wishlistBagButton) {
    return;
  }

  const count =
    typeof getCartCount === "function"
      ? getCartCount()
      : 0;

  wishlistBagCount.textContent = String(count);

  wishlistBagButton.setAttribute(
    "aria-label",
    `Shopping bag, ${count} ${
      count === 1 ? "item" : "items"
    }`
  );
}

if (wishlistBagButton) {
  wishlistBagButton.addEventListener("click", () => {
    if (
      typeof window.openCartDrawer === "function"
    ) {
      window.openCartDrawer();
    }
  });
}

window.addEventListener(
  "pageshow",
  updateWishlistBagCount
);

window.addEventListener(
  "storage",
  updateWishlistBagCount
);

/* =========================================
   NEWSLETTER DEMO
========================================= */

if (wishlistNewsletterForm) {
  wishlistNewsletterForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (
        !wishlistNewsletterEmail.checkValidity()
      ) {
        wishlistNewsletterEmail.reportValidity();
        return;
      }

      wishlistNewsletterMessage.textContent =
        "Thanks for your interest! Newsletter sign-up is a demo for now.";

      wishlistNewsletterForm.reset();
    }
  );
}

/* =========================================
   INITIALIZE
========================================= */

if (wishlistCurrentYear) {
  wishlistCurrentYear.textContent =
    new Date().getFullYear();
}

renderWishlistPage();
updateWishlistBagCount();

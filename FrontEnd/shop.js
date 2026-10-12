
"use strict";

/* =========================================
   VOID DISTRICT — SHOP PAGE
========================================= */

// DOM Elements
const shopProductGrid = document.getElementById(
  "shopProductGrid"
);

const shopProductCount = document.getElementById(
  "shopProductCount"
);

const shopFilters = document.querySelectorAll(
  ".shop-filter"
);

const shopEmpty = document.getElementById("shopEmpty");

const resetFilters = document.getElementById(
  "resetFilters"
);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const bagButton = document.getElementById("bagButton");
const bagCount = document.getElementById("bagCount");

const currentYear = document.getElementById("currentYear");

const newsletterForm = document.getElementById(
  "newsletterForm"
);

const newsletterEmail = document.getElementById(
  "newsletterEmail"
);

const newsletterMessage = document.getElementById(
  "newsletterMessage"
);

/* =========================================
   CATEGORY FILTER
========================================= */

const validCategories = [
  "all",
  "tees",
  "hoodies",
  "bottoms"
];

const urlParams = new URLSearchParams(
  window.location.search
);

const requestedCategory = urlParams.get("category");

let activeCategory = validCategories.includes(
  requestedCategory
)
  ? requestedCategory
  : "all";

/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {
  const productLink =
    `./product.html?product=${encodeURIComponent(product.id)}`;

  const article = document.createElement("article");
  article.className = "product-card";

  // Image wrapper
  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";

  // Product badge
  const badge = document.createElement("span");
  badge.className = "product-badge";
  badge.textContent = product.badge || "VOID DISTRICT";

  if (
    product.badge === "JUST DROPPED" ||
    product.badge === "NEW COLOUR"
  ) {
    badge.classList.add("badge-new");
  }

  // Image link
  const imageLink = document.createElement("a");
  imageLink.href = productLink;

  imageLink.setAttribute(
    "aria-label",
    `View ${product.name} details`
  );

  // Product image
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.alt || product.name;
  image.loading = "lazy";

  image.addEventListener("error", () => {
    if (image.dataset.fallbackApplied === "true") {
      return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = "./images/image-placeholder.jpg";
  });

  imageLink.appendChild(image);

  // Add to Bag button
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "quick-add";

  addButton.setAttribute(
    "aria-label",
    `Choose size for ${product.name}`
  );

  addButton.append("ADD TO BAG ");

  const plusIcon = document.createElement("span");
  plusIcon.textContent = "+";
  plusIcon.setAttribute("aria-hidden", "true");

  addButton.appendChild(plusIcon);

  // Go to product details for size selection
  addButton.addEventListener("click", () => {
    window.location.href = productLink;
  });

  imageWrap.append(
    badge,
    imageLink,
    addButton
  );

  // Product details
  const details = document.createElement("div");
  details.className = "product-details";

  const detailsText = document.createElement("div");

  const nameHeading = document.createElement("h3");
  const nameLink = document.createElement("a");

  nameLink.href = productLink;
  nameLink.textContent = product.name;

  nameHeading.appendChild(nameLink);

  const subtitle = document.createElement("p");
  subtitle.textContent = product.subtitle || "";

  detailsText.append(
    nameHeading,
    subtitle
  );

  // Price
  const price = document.createElement("span");
  price.className = "product-price";

  price.textContent =
    `Rs. ${product.price.toLocaleString("en-PK")}`;

  details.append(
    detailsText,
    price
  );

  article.append(
    imageWrap,
    details
  );

  return article;
}

/* =========================================
   RENDER PRODUCTS
========================================= */

function renderShopProducts() {
  if (!shopProductGrid) {
    return;
  }

  if (!Array.isArray(products)) {
    console.error("Product data is unavailable.");
    return;
  }

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        );

  shopProductGrid.replaceChildren();

  filteredProducts.forEach((product) => {
    const card = createProductCard(product);
    shopProductGrid.appendChild(card);
  });

  // Update product count
  const count = filteredProducts.length;

  shopProductCount.textContent =
    `${count} ${count === 1 ? "PRODUCT" : "PRODUCTS"}`;

  // Empty state
  shopEmpty.hidden = count > 0;

  // Update filter buttons
  shopFilters.forEach((button) => {
    const isActive =
      button.dataset.category === activeCategory;

    button.classList.toggle(
      "is-active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}

/* =========================================
   CHANGE CATEGORY
========================================= */

function changeCategory(category) {
  if (!validCategories.includes(category)) {
    return;
  }

  activeCategory = category;

  // Keep browser URL in sync
  const newUrl = new URL(window.location.href);

  if (category === "all") {
    newUrl.searchParams.delete("category");
  } else {
    newUrl.searchParams.set(
      "category",
      category
    );
  }

  window.history.pushState(
    {},
    "",
    newUrl
  );

  renderShopProducts();
}

// Filter buttons
shopFilters.forEach((button) => {
  button.addEventListener("click", () => {
    changeCategory(button.dataset.category);
  });
});

// Reset filters
resetFilters.addEventListener("click", () => {
  changeCategory("all");
});

// Support browser back and forward
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(
    window.location.search
  );

  const category = params.get("category");

  activeCategory = validCategories.includes(category)
    ? category
    : "all";

  renderShopProducts();
});

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    navLinks.classList.toggle(
      "is-open",
      !expanded
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(!expanded)
    );

    menuToggle.setAttribute(
      "aria-label",
      expanded
        ? "Open navigation menu"
        : "Close navigation menu"
    );
  });

  navLinks.addEventListener("click", (event) => {
    if (!event.target.closest("a")) {
      return;
    }

    navLinks.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });
}

/* =========================================
   CART COUNT AND DRAWER
========================================= */

function updateShopBagCount() {
  if (!bagCount || !bagButton) {
    return;
  }

  const count =
    typeof getCartCount === "function"
      ? getCartCount()
      : 0;

  bagCount.textContent = String(count);

  bagButton.setAttribute(
    "aria-label",
    `Shopping bag, ${count} ${
      count === 1 ? "item" : "items"
    }`
  );
}

if (bagButton) {
  bagButton.addEventListener("click", () => {
    if (typeof window.openCartDrawer === "function") {
      window.openCartDrawer();
    }
  });
}

window.addEventListener(
  "pageshow",
  updateShopBagCount
);

window.addEventListener(
  "storage",
  updateShopBagCount
);

/* =========================================
   NEWSLETTER DEMO
========================================= */

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      return;
    }

    newsletterMessage.textContent =
      "Thanks for your interest! Newsletter sign-up is a demo for now.";

    newsletterForm.reset();
  });
}

/* =========================================
   INITIALIZE SHOP
========================================= */

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

renderShopProducts();
updateShopBagCount();

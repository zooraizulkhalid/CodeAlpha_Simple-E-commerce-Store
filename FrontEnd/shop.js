"use strict";

/* =========================================
   VOID DISTRICT — SHOP PAGE
========================================= */

const shopProductGrid = document.getElementById("shopProductGrid");
const shopProductCount = document.getElementById("shopProductCount");
const shopFilters = document.querySelectorAll(".shop-filter");
const shopEmpty = document.getElementById("shopEmpty");
const resetFilters = document.getElementById("resetFilters");

const shopSearchInput = document.getElementById("shopSearchInput");

// Products loaded from MongoDB through backend API.
let shopProductsData = [];

/* =========================================
   NAVBAR SEARCH ICON
========================================= */

const shopNavSearch = document.querySelector(
  ".nav-actions .nav-search"
);

if (shopNavSearch && shopSearchInput) {
  shopNavSearch.addEventListener("click", (event) => {
    event.preventDefault();

    shopSearchInput.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    shopSearchInput.focus({
      preventScroll: true,
    });
  });
}

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const sizeFilter = document.getElementById("sizeFilter");
const sortFilter = document.getElementById("sortFilter");
const clearAllFilters = document.getElementById("clearAllFilters");
const filterAnnouncement = document.getElementById(
  "shopFilterAnnouncement"
);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const bagButton = document.getElementById("bagButton");
const bagCount = document.getElementById("bagCount");
const currentYear = document.getElementById("currentYear");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById(
  "newsletterMessage"
);

/* =========================================
   FILTER STATE
========================================= */

const validCategories = ["all", "tees", "hoodies", "bottoms"];

const urlParams = new URLSearchParams(window.location.search);

const requestedCategory = urlParams.get("category");

let activeCategory = validCategories.includes(requestedCategory)
  ? requestedCategory
  : "all";

if (shopSearchInput) {
  shopSearchInput.value = urlParams.get("search") || "";
}

/* =========================================
   WISHLIST HEART BUTTON
========================================= */

function createShopWishlistButton(product) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "product-wishlist-btn";
  button.dataset.wishlistId = String(product.id);

  const saved =
    typeof isInWishlist === "function" &&
    isInWishlist(product.id);

  button.classList.toggle("is-saved", saved);

  button.setAttribute("aria-pressed", String(saved));

  button.setAttribute(
    "aria-label",
    saved
      ? `Remove ${product.name} from wishlist`
      : `Add ${product.name} to wishlist`
  );

  button.title = saved
    ? "Remove from Wishlist"
    : "Add to Wishlist";

  button.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
      />
    </svg>
  `;

  return button;
}

/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {
  const productLink =
    `./product.html?product=${encodeURIComponent(product.id)}`;

  const article = document.createElement("article");
  article.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";

  const badge = document.createElement("span");
  badge.className = "product-badge";
  badge.textContent = product.badge || "VOID DISTRICT";

  if (
    product.badge === "JUST DROPPED" ||
    product.badge === "NEW COLOUR"
  ) {
    badge.classList.add("badge-new");
  }

  const imageLink = document.createElement("a");
  imageLink.href = productLink;

  imageLink.setAttribute(
    "aria-label",
    `View ${product.name} details`
  );

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

  // Wishlist heart at top-right of product image.
  const wishlistButton = createShopWishlistButton(product);

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

  addButton.addEventListener("click", () => {
    window.location.href = productLink;
  });

  imageWrap.append(
    badge,
    imageLink,
    wishlistButton,
    addButton
  );

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

  detailsText.append(nameHeading, subtitle);

  const price = document.createElement("span");
  price.className = "product-price";

  price.textContent =
    `Rs. ${Number(product.price).toLocaleString("en-PK")}`;

  details.append(detailsText, price);
  article.append(imageWrap, details);

  return article;
}

/* =========================================
   WISHLIST CLICK HANDLING
========================================= */

if (shopProductGrid) {
  shopProductGrid.addEventListener("click", (event) => {
    const wishlistButton = event.target.closest(
      ".product-wishlist-btn"
    );

    if (
      !wishlistButton ||
      !shopProductGrid.contains(wishlistButton)
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const productId = wishlistButton.dataset.wishlistId;

    if (typeof toggleWishlist !== "function") {
      console.error("Wishlist system is not loaded.");
      return;
    }

    toggleWishlist(productId);

    const saved = isInWishlist(productId);

    wishlistButton.title = saved
      ? "Remove from Wishlist"
      : "Add to Wishlist";
  });
}

/* =========================================
   SEARCH, FILTERING & SORTING
========================================= */

function getFilteredProducts() {
  if (!Array.isArray(shopProductsData)) {
    return [];
  }

  const searchTerm = shopSearchInput.value
    .trim()
    .toLowerCase();

  const minPrice =
    minPriceInput.value.trim() === ""
      ? null
      : Number(minPriceInput.value);

  const maxPrice =
    maxPriceInput.value.trim() === ""
      ? null
      : Number(maxPriceInput.value);

  const selectedSize = sizeFilter.value;
  const selectedSort = sortFilter.value;

  const filteredProducts = shopProductsData.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      product.category === activeCategory;

    /*
       Search only product name and category.
       This prevents unrelated results caused by
       descriptions or product details.
    */

    const searchableText = [
      product.name,
      product.category
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      searchableText.includes(searchTerm);

    const matchesMinPrice =
      minPrice === null ||
      (
        Number.isFinite(minPrice) &&
        minPrice >= 0 &&
        product.price >= minPrice
      );

    const matchesMaxPrice =
      maxPrice === null ||
      (
        Number.isFinite(maxPrice) &&
        maxPrice >= 0 &&
        product.price <= maxPrice
      );

    const matchesSize =
      selectedSize === "all" ||
      (
        Array.isArray(product.sizes) &&
        product.sizes.includes(selectedSize)
      );

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesSize
    );
  });

  switch (selectedSort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "name-desc":
      filteredProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;

    default:
      // Preserve original featured product order.
      break;
  }

  return filteredProducts;
}

/* =========================================
   RENDER PRODUCTS
========================================= */

function renderShopProducts() {
  if (!shopProductGrid) {
    return;
  }

  if (!Array.isArray(shopProductsData)) {
    console.error("MongoDB product data is unavailable.");
    return;
  }

  const filteredProducts = getFilteredProducts();

  shopProductGrid.replaceChildren();

  filteredProducts.forEach((product) => {
    shopProductGrid.appendChild(
      createProductCard(product)
    );
  });

  const count = filteredProducts.length;

  if (shopProductCount) {
    shopProductCount.textContent =
      `${count} ${count === 1 ? "PRODUCT" : "PRODUCTS"}`;
  }

  if (shopEmpty) {
    shopEmpty.hidden = count > 0;
  }

  if (filterAnnouncement) {
    filterAnnouncement.textContent =
      `${count} ${count === 1 ? "product" : "products"} found.`;
  }

  shopFilters.forEach((button) => {
    const isActive =
      button.dataset.category === activeCategory;

    button.classList.toggle("is-active", isActive);

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });

  // Sync saved heart states and navbar counter.
  if (typeof refreshWishlistUI === "function") {
    refreshWishlistUI();
  }
}

/* =========================================
   URL SYNCHRONIZATION
========================================= */

function updateFilterUrl() {
  const newUrl = new URL(window.location.href);

  if (activeCategory === "all") {
    newUrl.searchParams.delete("category");
  } else {
    newUrl.searchParams.set(
      "category",
      activeCategory
    );
  }

  const searchTerm = shopSearchInput.value.trim();

  if (searchTerm) {
    newUrl.searchParams.set("search", searchTerm);
  } else {
    newUrl.searchParams.delete("search");
  }

  window.history.replaceState({}, "", newUrl);
}

/* =========================================
   CATEGORY FILTER EVENTS
========================================= */

function changeCategory(category) {
  if (!validCategories.includes(category)) {
    return;
  }

  activeCategory = category;

  updateFilterUrl();
  renderShopProducts();
}

shopFilters.forEach((button) => {
  button.addEventListener("click", () => {
    changeCategory(button.dataset.category);
  });
});

/* =========================================
   SEARCH & ADVANCED FILTER EVENTS
========================================= */

if (shopSearchInput) {
  shopSearchInput.addEventListener("input", () => {
    updateFilterUrl();
    renderShopProducts();
  });
}

[minPriceInput, maxPriceInput].forEach((input) => {
  if (input) {
    input.addEventListener(
      "input",
      renderShopProducts
    );
  }
});

if (sizeFilter) {
  sizeFilter.addEventListener(
    "change",
    renderShopProducts
  );
}

if (sortFilter) {
  sortFilter.addEventListener(
    "change",
    renderShopProducts
  );
}

/* =========================================
   CLEAR ALL FILTERS
========================================= */

function clearFilters() {
  activeCategory = "all";

  shopSearchInput.value = "";
  minPriceInput.value = "";
  maxPriceInput.value = "";

  sizeFilter.value = "all";
  sortFilter.value = "default";

  updateFilterUrl();
  renderShopProducts();
}

if (clearAllFilters) {
  clearAllFilters.addEventListener(
    "click",
    clearFilters
  );
}

if (resetFilters) {
  resetFilters.addEventListener(
    "click",
    clearFilters
  );
}

/* =========================================
   BROWSER BACK / FORWARD
========================================= */

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(
    window.location.search
  );

  const category = params.get("category");

  activeCategory = validCategories.includes(category)
    ? category
    : "all";

  shopSearchInput.value =
    params.get("search") || "";

  renderShopProducts();
});

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {
  function closeMobileMenu() {
    navLinks.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

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
    if (event.target.closest("a")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
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
    `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`
  );
}

if (bagButton) {
  bagButton.addEventListener("click", () => {
    if (
      typeof window.openCartDrawer === "function"
    ) {
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

if (
  newsletterForm &&
  newsletterEmail &&
  newsletterMessage
) {
  newsletterForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const email =
        newsletterEmail.value.trim();

      if (
        !newsletterEmail.checkValidity() ||
        !email
      ) {
        newsletterEmail.reportValidity();
        return;
      }

      newsletterMessage.textContent =
        "Thanks for your interest! Newsletter sign-up is a demo for now.";

      newsletterForm.reset();
    }
  );
}

/* =========================================
   LOAD PRODUCTS FROM MONGODB API
========================================= */

async function loadShopProducts() {
  if (shopProductGrid) {
    shopProductGrid.textContent =
      "Loading products...";
  }

  try {
    // Fetch all products from backend API.
    shopProductsData =
      await fetchProductsFromAPI();

    // Preserve original product order.
    if (
      typeof products !== "undefined" &&
      Array.isArray(products)
    ) {
      const productOrder = new Map(
        products.map((product, index) => [
          String(product.id),
          index
        ])
      );

      shopProductsData.sort(
        (a, b) =>
          (
            productOrder.get(String(a.id)) ??
            Infinity
          ) -
          (
            productOrder.get(String(b.id)) ??
            Infinity
          )
      );
    }

    // Render MongoDB products.
    renderShopProducts();

    console.info(
      `${shopProductsData.length} shop products loaded from MongoDB API.`
    );
  } catch (error) {
    console.error(
      "Unable to load shop products:",
      error
    );

    if (shopProductGrid) {
      shopProductGrid.textContent =
        "Products could not be loaded. Please try again later.";
    }

    if (shopProductCount) {
      shopProductCount.textContent =
        "PRODUCTS UNAVAILABLE";
    }

    if (filterAnnouncement) {
      filterAnnouncement.textContent =
        "Unable to load products. Please try again later.";
    }

    if (shopEmpty) {
      shopEmpty.hidden = true;
    }
  }
}

/* =========================================
   INITIALIZE SHOP
========================================= */

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

loadShopProducts();
updateShopBagCount();

/* =========================================
   AUTO SCROLL TO SEARCH RESULTS
========================================= */

// Auto-scroll only when a search query exists
// in the URL on initial page load.

const initialSearchTerm =
  urlParams.get("search");

if (
  initialSearchTerm &&
  initialSearchTerm.trim()
) {
  window.addEventListener("load", () => {
    if (!shopProductGrid) {
      return;
    }

    requestAnimationFrame(() => {
      shopProductGrid.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

console.info(
  "VOID District shop interactions initialized."
);
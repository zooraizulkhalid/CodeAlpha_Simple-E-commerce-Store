
"use strict";

/* =========================================
   VOID DISTRICT — HOMEPAGE INTERACTIONS
========================================= */

// Select the HTML elements we need.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const bagButton = document.querySelector("#bagButton");
const bagCount = document.querySelector("#bagCount");
const cartMessage = document.querySelector("#cartMessage");
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterEmail = document.querySelector("#newsletterEmail");
const newsletterMessage = document.querySelector("#newsletterMessage");
const currentYear = document.querySelector("#currentYear");
const productGrid = document.querySelector("#productGrid");

// Read the count from the shared cart.
function readCartCount() {
  if (typeof getCartCount === "function") {
    return getCartCount();
  }

  return 0;
}

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    menuToggle.setAttribute(
      "aria-label",
      isExpanded
        ? "Open navigation menu"
        : "Close navigation menu"
    );

    navLinks.classList.toggle("is-open", !isExpanded);
  });

  // Close mobile menu after clicking a link.
  navLinks.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink) {
      return;
    }

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  });

  // Close mobile menu using Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    }
  });
}

/* =========================================
   IMAGE FALLBACK
========================================= */

function setupImageFallback(img) {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied === "true") {
      return;
    }

    img.dataset.fallbackApplied = "true";
    img.src = "./images/image-placeholder.jpg";
  });
}

// Protect images already present in HTML.
document.querySelectorAll("img").forEach(setupImageFallback);

/* =========================================
   RANDOM PRODUCTS — FISHER-YATES SHUFFLE
========================================= */

function shuffleProducts(productList) {
  // Copy the array so original products stay unchanged.
  const shuffled = [...productList];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
}

/* =========================================
   PRODUCT GRID — DYNAMIC RENDERING
========================================= */

function renderProducts() {
  if (!productGrid) {
    return;
  }

  if (
    typeof products === "undefined" ||
    !Array.isArray(products)
  ) {
    console.error(
      "VOID District: Product data could not be loaded."
    );
    return;
  }

  // Clear previously displayed products.
  productGrid.replaceChildren();

  // First four products will always stay fixed.
  const fixedProducts = products.slice(0, 4);

  // Remaining six products.
  const remainingProducts = products.slice(4);

  // Shuffle the remaining six products.
  const shuffledProducts = shuffleProducts(
    remainingProducts
  );

  // Pick four random products.
  const randomProducts = shuffledProducts.slice(0, 4);

  // Combine: 4 fixed + 4 random = 8 products.
  const homepageProducts = [
    ...fixedProducts,
    ...randomProducts
  ];

  // Display selected products.
  homepageProducts.forEach((product) => {
    const productLink =
      `./product.html?product=${encodeURIComponent(product.id)}`;

    // Main product card.
    const article = document.createElement("article");
    article.className = "product-card";

    // Image wrapper.
    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    // Product badge.
    const badge = document.createElement("span");
    badge.className = "product-badge";

    if (
      product.badge === "JUST DROPPED" ||
      product.badge === "NEW COLOUR"
    ) {
      badge.classList.add("badge-new");
    }

    badge.textContent = product.badge || "";

    // Link to product detail page.
    const imageLink = document.createElement("a");
    imageLink.href = productLink;

    imageLink.setAttribute(
      "aria-label",
      `View ${product.name} details`
    );

    // Product image.
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.loading = "lazy";

    setupImageFallback(image);
    imageLink.appendChild(image);

    // Add to Bag button.
    const addButton = document.createElement("button");
    addButton.className = "quick-add";
    addButton.type = "button";

    // Use product ID for reliable identification.
    addButton.dataset.productId = product.id;

    addButton.append("ADD TO BAG ");

    const plusIcon = document.createElement("span");
    plusIcon.setAttribute("aria-hidden", "true");
    plusIcon.textContent = "+";

    addButton.appendChild(plusIcon);

    imageWrap.append(
      badge,
      imageLink,
      addButton
    );

    // Product details.
    const details = document.createElement("div");
    details.className = "product-details";

    const detailsText = document.createElement("div");

    const nameHeading = document.createElement("h3");
    const nameLink = document.createElement("a");

    nameLink.href = productLink;
    nameLink.textContent = product.name;
    nameHeading.appendChild(nameLink);

    const subtitle = document.createElement("p");
    subtitle.textContent = product.subtitle;

    detailsText.append(
      nameHeading,
      subtitle
    );

    // Price.
    const price = document.createElement("span");
    price.className = "product-price";

    price.textContent =
      `Rs. ${product.price.toLocaleString("en-PK")}`;

    details.append(detailsText, price);

    // Assemble complete card.
    article.append(imageWrap, details);
    productGrid.appendChild(article);
  });
}

/* =========================================
   SHOPPING BAG
========================================= */

function updateBagCount() {
  if (!bagCount || !bagButton) {
    return;
  }

  const count = readCartCount();

  bagCount.textContent = String(count);

  bagButton.setAttribute(
    "aria-label",
    `Shopping bag, ${count} ${
      count === 1 ? "item" : "items"
    }`
  );
}

function showCartMessage(message) {
  if (cartMessage) {
    cartMessage.textContent = message;
  }
}

/* =========================================
   ADD TO BAG BUTTON
========================================= */

// Open product details so the customer can choose size.
if (productGrid) {
  productGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest(".quick-add");

    if (
      !addButton ||
      !productGrid.contains(addButton)
    ) {
      return;
    }

    const productId = addButton.dataset.productId;

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct) {
      showCartMessage(
        "Sorry, this product could not be found."
      );
      return;
    }

    window.location.href =
      `./product.html?product=${encodeURIComponent(
        selectedProduct.id
      )}`;
  });
}

/* =========================================
   CART DRAWER
========================================= */

if (bagButton) {
  bagButton.addEventListener("click", () => {
    if (
      typeof window.openCartDrawer === "function"
    ) {
      window.openCartDrawer();
    }
  });
}

/* =========================================
   NEWSLETTER — FRONTEND DEMO
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

      const email = newsletterEmail.value.trim();

      if (
        !newsletterEmail.checkValidity() ||
        email === ""
      ) {
        newsletterMessage.textContent =
          "Please enter a valid email address.";

        newsletterEmail.reportValidity();
        return;
      }

      newsletterMessage.textContent =
        "Thanks! The newsletter form is working as a demo. Subscription is not active yet.";

      newsletterForm.reset();
    }
  );
}

/* =========================================
   FOOTER YEAR
========================================= */

if (currentYear) {
  currentYear.textContent = String(
    new Date().getFullYear()
  );
}

/* =========================================
   INITIALIZE
========================================= */

renderProducts();
updateBagCount();

console.info(
  "VOID District homepage interactions initialized."
);

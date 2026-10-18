"use strict";

/* =========================================
   VOID DISTRICT — PRODUCT DETAILS PAGE
========================================= */

// Product elements
const productImage = document.getElementById("productImage");
const productBadge = document.getElementById("productBadge");
const productName = document.getElementById("productName");
const productSubtitle = document.getElementById("productSubtitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const breadcrumbProduct = document.getElementById("breadcrumbProduct");
const productDetailsText = document.getElementById("productDetailsText");
const productFitText = document.getElementById("productFitText");
const productWishlistButton = document.getElementById("productWishlistButton");

const productSizeOptions = document.getElementById("productSizeOptions");
const productSize = document.getElementById("productSize");
const sizeMessage = document.getElementById("sizeMessage");

const productQuantity = document.getElementById("productQuantity");
const decreaseQuantity = document.getElementById("decreaseQuantity");
const increaseQuantity = document.getElementById("increaseQuantity");

const productAddToBag = document.getElementById("productAddToBag");
const productActionMessage = document.getElementById("productActionMessage");

// Size guide elements
const sizeGuideModal = document.getElementById("sizeGuideModal");
const sizeGuideBackdrop = document.getElementById("sizeGuideBackdrop");
const openSizeGuide = document.getElementById("openSizeGuide");
const openSizeGuideSecondary = document.getElementById(
  "openSizeGuideSecondary",
);
const closeSizeGuide = document.getElementById("closeSizeGuide");
const sizeGuideDone = document.getElementById("sizeGuideDone");
const sizeGuideTitle = document.getElementById("sizeGuideTitle");
const sizeGuideHead = document.getElementById("sizeGuideHead");
const sizeGuideBody = document.getElementById("sizeGuideBody");
const sizeGuideCaption = document.getElementById("sizeGuideCaption");
const sizeGuideFootnote = document.getElementById("sizeGuideFootnote");

// Review elements
const customerReviews = document.getElementById("customerReviews");
const reviewCount = document.getElementById("reviewCount");
const averageRating = document.getElementById("averageRating");
const reviewSummaryText = document.getElementById("reviewSummaryText");
const reviewList = document.getElementById("reviewList");

// Read product ID from URL
const urlParameters = new URLSearchParams(window.location.search);
const requestedProduct = urlParameters.get("product") || "tee";

// Product fetched from MongoDB API.
let currentProduct = null;

/* =========================================
   PRODUCT DETAILS — WISHLIST
========================================= */

function updateProductWishlistButton() {
  if (!productWishlistButton || !currentProduct) {
    return;
  }

  const productId = String(currentProduct.id);

  productWishlistButton.dataset.wishlistId = productId;

  const saved = typeof isInWishlist === "function" && isInWishlist(productId);

  productWishlistButton.classList.toggle("is-saved", saved);
  productWishlistButton.setAttribute("aria-pressed", String(saved));

  productWishlistButton.setAttribute(
    "aria-label",
    saved
      ? `Remove ${currentProduct.name} from wishlist`
      : `Add ${currentProduct.name} to wishlist`,
  );

  productWishlistButton.title = saved
    ? "Remove from Wishlist"
    : "Add to Wishlist";
}

// Save or remove current product.
if (productWishlistButton) {
  productWishlistButton.addEventListener("click", () => {
    if (!currentProduct || typeof toggleWishlist !== "function") {
      console.error("Wishlist system is unavailable.");
      return;
    }

    toggleWishlist(String(currentProduct.id));
    updateProductWishlistButton();
  });
}

// Synchronize wishlist.
window.addEventListener("wishlistUpdated", updateProductWishlistButton);

window.addEventListener("storage", updateProductWishlistButton);

window.addEventListener("pageshow", updateProductWishlistButton);

/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

/* =========================================
   DISPLAY PRODUCT DETAILS
========================================= */

function displayProduct(product) {
  if (!product) {
    console.error("Product data is unavailable.");
    return;
  }

  document.title = `${product.name} | VOID District`;

  productName.textContent = product.name;
  productPrice.textContent = formatPrice(product.price);
  productDescription.textContent = product.description || "";
  productDetailsText.textContent = product.details || "";
  productFitText.textContent = product.fit || "";

  productImage.src = product.image;
  productImage.alt = product.alt || product.name;

  productBadge.textContent = product.badge || "";
  productSubtitle.textContent = product.subtitle || "";
  breadcrumbProduct.textContent = product.name;

  // Reset size and quantity.
  productSize.value = "";
  productQuantity.value = "1";
  sizeMessage.textContent = "";
  productActionMessage.textContent = "";

  renderSizeOptions(product);
  renderSizeGuide(product);
  renderReviews(product);
}

/* =========================================
   SIZE SELECTION
========================================= */

function renderSizeOptions(product) {
  productSizeOptions.replaceChildren();

  const availableSizes = Array.isArray(product.sizes) ? product.sizes : [];

  availableSizes.forEach((size) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "size-option";
    button.textContent = size;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      productSize.value = size;

      productSizeOptions.querySelectorAll(".size-option").forEach((option) => {
        const selected = option === button;

        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });

      sizeMessage.textContent = "";
      productActionMessage.textContent = "";
    });

    productSizeOptions.appendChild(button);
  });
}

/* =========================================
   QUANTITY CONTROLS
========================================= */

function getValidQuantity() {
  const quantity = Number(productQuantity.value);

  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.min(10, Math.max(1, Math.floor(quantity)));
}

function updateQuantity() {
  productQuantity.value = String(getValidQuantity());
}

decreaseQuantity.addEventListener("click", () => {
  productQuantity.value = String(getValidQuantity() - 1);
  updateQuantity();
});

increaseQuantity.addEventListener("click", () => {
  productQuantity.value = String(getValidQuantity() + 1);
  updateQuantity();
});

productQuantity.addEventListener("change", updateQuantity);

/* =========================================
   SIZE GUIDE TABLE
========================================= */

function renderSizeGuide(product) {
  const guide = product.sizeGuide;

  sizeGuideTitle.textContent = `${product.name} — Size Guide`;

  sizeGuideCaption.textContent =
    "Measurements are illustrative. Please verify actual garment measurements before purchase.";

  sizeGuideFootnote.textContent =
    "Measurements may vary between products. Use verified product measurements for final sizing.";

  sizeGuideHead.replaceChildren();
  sizeGuideBody.replaceChildren();

  if (
    !guide ||
    !Array.isArray(guide.columns) ||
    !Array.isArray(guide.measurements)
  ) {
    return;
  }

  guide.columns.forEach((column) => {
    const heading = document.createElement("th");

    heading.scope = "col";
    heading.textContent = column.label;

    sizeGuideHead.appendChild(heading);
  });

  guide.measurements.forEach((measurement) => {
    const row = document.createElement("tr");

    guide.columns.forEach((column) => {
      const cell = document.createElement("td");

      cell.textContent = measurement[column.key] ?? "";

      row.appendChild(cell);
    });

    sizeGuideBody.appendChild(row);
  });
}

/* =========================================
   SIZE GUIDE MODAL
========================================= */

let previousFocusedElement = null;

function showSizeGuide() {
  if (!sizeGuideModal || !currentProduct) {
    return;
  }

  previousFocusedElement = document.activeElement;

  sizeGuideModal.classList.add("is-open");
  sizeGuideModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("size-guide-open");

  closeSizeGuide.focus();
}

function hideSizeGuide() {
  if (!sizeGuideModal) {
    return;
  }

  sizeGuideModal.classList.remove("is-open");
  sizeGuideModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("size-guide-open");

  if (previousFocusedElement) {
    previousFocusedElement.focus();
  }
}

openSizeGuide.addEventListener("click", showSizeGuide);

openSizeGuideSecondary.addEventListener("click", showSizeGuide);

closeSizeGuide.addEventListener("click", hideSizeGuide);

sizeGuideDone.addEventListener("click", hideSizeGuide);

sizeGuideBackdrop.addEventListener("click", hideSizeGuide);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sizeGuideModal.classList.contains("is-open")) {
    hideSizeGuide();
  }
});

/* =========================================
   PRODUCT REVIEWS — DEMO DISPLAY
========================================= */

function renderReviews(product) {
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  reviewList.replaceChildren();

  const totalReviews = reviews.length;

  const average = totalReviews
    ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
      totalReviews
    : 0;

  reviewCount.textContent = `${totalReviews} SAMPLE ${
    totalReviews === 1 ? "REVIEW" : "REVIEWS"
  }`;

  averageRating.textContent = totalReviews ? average.toFixed(1) : "—";

  reviewSummaryText.textContent = totalReviews
    ? `Based on ${totalReviews} illustrative demo reviews.`
    : "No sample reviews available.";

  const ratingSummary = document.getElementById("ratingSummary");

  const ratingStars = document.querySelector(
    ".product-rating-summary .rating-stars",
  );

  const reviewScoreStars = document.querySelector(
    ".review-score-block .rating-stars",
  );

  const roundedRating = Math.max(0, Math.min(5, Math.round(average)));

  const starsText = totalReviews
    ? "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating)
    : "☆☆☆☆☆";

  if (ratingSummary) {
    ratingSummary.textContent = totalReviews
      ? `${average.toFixed(1)}/5 · ${totalReviews} sample reviews`
      : "No sample reviews yet";
  }

  if (ratingStars) {
    ratingStars.textContent = starsText;
  }

  if (reviewScoreStars) {
    reviewScoreStars.textContent = starsText;
  }

  if (!totalReviews) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "review-empty-message";
    emptyMessage.textContent =
      "Sample reviews are not available for this product.";

    reviewList.appendChild(emptyMessage);
    return;
  }

  reviews.forEach((review) => {
    const article = document.createElement("article");
    article.className = "review-card";

    const heading = document.createElement("h3");
    heading.textContent = review.title;

    const reviewer = document.createElement("p");
    reviewer.className = "review-author";
    reviewer.textContent = `${review.name} · DEMO REVIEW`;

    const stars = document.createElement("p");
    stars.className = "review-rating";

    const rating = Math.max(0, Math.min(5, Math.round(Number(review.rating))));

    stars.textContent =
      `${"★".repeat(rating)}` + `${"☆".repeat(5 - rating)} ${rating}/5`;

    const comment = document.createElement("p");
    comment.textContent = review.comment;

    article.append(heading, reviewer, stars, comment);

    reviewList.appendChild(article);
  });
}

/* =========================================
   ADD PRODUCT TO CART
========================================= */

productAddToBag.addEventListener("click", () => {
  if (!currentProduct) {
    productActionMessage.textContent =
      "Product is still loading. Please try again.";
    return;
  }

  const selectedSize = productSize.value;
  const quantity = getValidQuantity();

  updateQuantity();

  if (!selectedSize) {
    sizeMessage.textContent = "Please select a size first.";

    productActionMessage.textContent = "";

    productSizeOptions.querySelector(".size-option")?.focus();

    return;
  }

  sizeMessage.textContent = "";

  if (typeof addToCart !== "function") {
    productActionMessage.textContent =
      "Shopping cart is currently unavailable.";
    return;
  }

  const result = addToCart(currentProduct, selectedSize, quantity);

  if (!result.success) {
    productActionMessage.textContent = result.message;
    return;
  }

  const bagCountDisplay = document.getElementById("bagCount");

  const bagButtonDisplay = document.getElementById("bagButton");

  if (bagCountDisplay) {
    bagCountDisplay.textContent = String(result.count);
  }

  if (bagButtonDisplay) {
    bagButtonDisplay.setAttribute(
      "aria-label",
      `Shopping bag, ${result.count} ${result.count === 1 ? "item" : "items"}`,
    );
  }

  productActionMessage.textContent =
    `${quantity} × ${currentProduct.name} ` +
    `(Size ${selectedSize}) — ` +
    `${formatPrice(currentProduct.price * quantity)}. ` +
    "Added to your bag successfully.";

  if (typeof window.openCartDrawer === "function") {
    window.openCartDrawer();
  }
});

/* =========================================
   LOAD PRODUCT FROM MONGODB API
========================================= */

async function loadProductFromAPI() {
  try {
    // Disable Add to Bag while loading.
    productAddToBag.disabled = true;

    productName.textContent = "Loading product...";
    productActionMessage.textContent = "";

    // Fetch the selected product from MongoDB.
    currentProduct = await fetchProductById(requestedProduct);

    // Display database product.
    displayProduct(currentProduct);
    const loadedImage = new Image();

    loadedImage.onload = () => {
      productImage.style.visibility = "visible";
    };

    loadedImage.onerror = () => {
      console.error("Product image failed to load.");
      productImage.alt = "Product image unavailable";
    };

    loadedImage.src = currentProduct.image;

    // Update wishlist heart.
    updateProductWishlistButton();

    // Enable Add to Bag after successful load.
    productAddToBag.disabled = false;

    console.info(`${currentProduct.name} loaded from MongoDB API.`);
  } catch (error) {
    console.error("Unable to load product details:", error);

    productName.textContent = "Product unavailable";

    productActionMessage.textContent =
      "Product details could not be loaded. Please try again later.";

    productAddToBag.disabled = true;
  }
}

/* =========================================
   INITIALIZE PRODUCT PAGE
========================================= */

loadProductFromAPI();

console.info("VOID District product details initialized.");

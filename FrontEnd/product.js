"use strict";

// Get product elements
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

// Find the matching product in products.js
const currentProduct =
  products.find((item) => item.id === requestedProduct) || products[0];

/* =========================================
   PRODUCT DETAILS — WISHLIST
========================================= */

// Update the heart according to the current product.
function updateProductWishlistButton() {
  if (!productWishlistButton || !currentProduct) {
    return;
  }

  const productId = String(currentProduct.id);

  // Connect this heart to the correct product.
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

// Save or remove the current product.
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

// Keep heart synchronized with the shared wishlist.
window.addEventListener("wishlistUpdated", updateProductWishlistButton);

window.addEventListener("storage", updateProductWishlistButton);

window.addEventListener("pageshow", updateProductWishlistButton);

// Format price
function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

// Display product information
function displayProduct(product) {
  if (!product) {
    console.error("No products were found in products.js.");
    return;
  }

  document.title = `${product.name} | VOID District`;

  productName.textContent = product.name;
  productPrice.textContent = formatPrice(product.price);
  productDescription.textContent = product.description;
  productDetailsText.textContent = product.details;
  productFitText.textContent = product.fit;

  productImage.src = product.image;
  productImage.alt = product.alt;

  productBadge.textContent = product.badge;
  productSubtitle.textContent = product.subtitle;
  breadcrumbProduct.textContent = product.name;

  productSize.value = "";
  productQuantity.value = "1";
  sizeMessage.textContent = "";
  productActionMessage.textContent = "";

  renderSizeOptions(product);
  renderSizeGuide(product);
  renderReviews(product);
}

// Create size selection buttons
function renderSizeOptions(product) {
  productSizeOptions.replaceChildren();

  product.sizes.forEach((size) => {
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

// Validate and update quantity

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

// Build size guide table from product data
function renderSizeGuide(product) {
  const guide = product.sizeGuide;

  sizeGuideTitle.textContent = `${product.name} — Size Guide`;
  sizeGuideCaption.textContent =
    "Measurements are illustrative. Please verify actual garment measurements before purchase.";

  sizeGuideFootnote.textContent =
    "Measurements may vary between products. Use verified product measurements for final sizing.";

  sizeGuideHead.replaceChildren();
  sizeGuideBody.replaceChildren();

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
      cell.textContent = measurement[column.key];
      row.appendChild(cell);
    });

    sizeGuideBody.appendChild(row);
  });
}

// Open and close size guide modal
let previousFocusedElement = null;

function showSizeGuide() {
  if (!sizeGuideModal) return;

  previousFocusedElement = document.activeElement;

  sizeGuideModal.classList.add("is-open");
  sizeGuideModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("size-guide-open");

  closeSizeGuide.focus();
}

function hideSizeGuide() {
  if (!sizeGuideModal) return;

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

// Display sample customer reviews

/* =========================================
   PRODUCT REVIEWS — CONSISTENT DEMO DISPLAY
========================================= */

function renderReviews(product) {
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  reviewList.replaceChildren();

  const totalReviews = reviews.length;

  const average = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  // Review count and average.
  reviewCount.textContent = `${totalReviews} SAMPLE ${totalReviews === 1 ? "REVIEW" : "REVIEWS"}`;

  averageRating.textContent = totalReviews ? average.toFixed(1) : "—";

  reviewSummaryText.textContent = totalReviews
    ? `Based on ${totalReviews} illustrative demo reviews.`
    : "No sample reviews available.";

  // Update rating summary near product title.
  const ratingSummary = document.getElementById("ratingSummary");

  const ratingStars = document.querySelector(
    ".product-rating-summary .rating-stars",
  );

  const reviewScoreStars = document.querySelector(
    ".review-score-block .rating-stars",
  );

  const roundedRating = Math.round(average);

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

  // Show an empty state when there are no reviews.
  if (!totalReviews) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "review-empty-message";
    emptyMessage.textContent =
      "Sample reviews are not available for this product.";

    reviewList.appendChild(emptyMessage);
    return;
  }

  // Create review cards.
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

    const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

    stars.textContent =
      `${"★".repeat(rating)}` + `${"☆".repeat(5 - rating)} ${rating}/5`;

    const comment = document.createElement("p");
    comment.textContent = review.comment;

    article.append(heading, reviewer, stars, comment);

    reviewList.appendChild(article);
  });
}

// Validate size and show a demo confirmation

productAddToBag.addEventListener("click", () => {
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

  // Add the actual product to the shared cart.
  const result = addToCart(currentProduct, selectedSize, quantity);

  if (!result.success) {
    productActionMessage.textContent = result.message;
    return;
  }

  // Update the navbar bag count.
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

  // Show confirmation.
  productActionMessage.textContent =
    `${quantity} × ${currentProduct.name} (Size ${selectedSize}) ` +
    `— ${formatPrice(currentProduct.price * quantity)}. ` +
    "Added to your bag successfully.";

  // Open the drawer after the product has been saved.
  if (typeof window.openCartDrawer === "function") {
    window.openCartDrawer();
  }
});

// Load the selected product
// Load the selected product
displayProduct(currentProduct);

// Initialize product wishlist heart
updateProductWishlistButton();

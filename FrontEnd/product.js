
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
const openSizeGuideSecondary = document.getElementById("openSizeGuideSecondary");
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

            productSizeOptions
                .querySelectorAll(".size-option")
                .forEach((option) => {
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
    const quantity = Number.parseInt(productQuantity.value, 10);

    if (!Number.isFinite(quantity)) {
        return 1;
    }

    return Math.min(10, Math.max(1, quantity));
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
    if (
        event.key === "Escape" &&
        sizeGuideModal.classList.contains("is-open")
    ) {
        hideSizeGuide();
    }
});

// Display sample customer reviews
function renderReviews(product) {
    const reviews = product.reviews || [];

    reviewList.replaceChildren();

    const totalReviews = reviews.length;

    const average =
        totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            : 0;

    reviewCount.textContent = String(totalReviews);
    averageRating.textContent = totalReviews > 0
        ? average.toFixed(1)
        : "—";

    reviewSummaryText.textContent = totalReviews > 0
        ? `Based on ${totalReviews} sample reviews.`
        : "No reviews yet.";

    reviews.forEach((review) => {
        const article = document.createElement("article");
        article.className = "review-card";

        const heading = document.createElement("h3");
        heading.textContent = review.title;

        const reviewer = document.createElement("p");
        reviewer.className = "review-author";
        reviewer.textContent = `${review.name} · ${review.date}`;

        const stars = document.createElement("p");
        stars.className = "review-rating";
        stars.textContent =
            `${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} ` +
            `${review.rating}/5`;

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
    const result = addToCart(
        currentProduct,
        selectedSize,
        quantity
    );

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
            `Shopping bag, ${result.count} ${
                result.count === 1 ? "item" : "items"
            }`
        );
    }

    // Show confirmation.
    productActionMessage.textContent =
        `${quantity} × ${currentProduct.name} (Size ${selectedSize}) ` +
        `— ${formatPrice(currentProduct.price * quantity)}. ` +
        "Added to your sample bag successfully.";
});

// Load the selected product
displayProduct(currentProduct);
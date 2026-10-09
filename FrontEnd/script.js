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

// Keep the shopping bag's sample count in memory.
let cartCount = 0;

// Detect missing HTML elements early.
const requiredElements = [
    menuToggle,
    navLinks,
    bagButton,
    bagCount,
    cartMessage,
    newsletterForm,
    newsletterEmail,
    newsletterMessage,
    currentYear
];

if (requiredElements.some((element) => element === null)) {
    console.error(
        "VOID District: One or more required HTML elements could not be found."
    );
}

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        // Open or close the navigation menu.
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));

        menuToggle.setAttribute(
            "aria-label",
            isExpanded ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("is-open", !isExpanded);
    });

    // Close the mobile menu after a navigation link is selected.
    navLinks.addEventListener("click", (event) => {
        const clickedLink = event.target.closest("a");

        if (!clickedLink) {
            return;
        }

        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });

    // Close the mobile menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

/* =========================================
   SHOPPING BAG — FRONTEND DEMO
========================================= */

const quickAddButtons = document.querySelectorAll(".quick-add");

function updateBagCount() {
    if (!bagCount || !bagButton) {
        return;
    }

    bagCount.textContent = String(cartCount);

    bagButton.setAttribute(
        "aria-label",
        `Shopping bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`
    );
}

function showCartMessage(message) {
    if (cartMessage) {
        cartMessage.textContent = message;
    }
}

// Event delegation: one listener handles all product add buttons.
const productGrid = document.querySelector(".product-grid");

if (productGrid) {
    productGrid.addEventListener("click", (event) => {
        const addButton = event.target.closest(".quick-add");

        // Ignore clicks that did not originate from an Add to Bag button.
        if (!addButton || !productGrid.contains(addButton)) {
            return;
        }

        const productName = addButton.dataset.product;
        const rawPrice = addButton.dataset.price;
        const productPrice = Number(rawPrice);

        // Validate the product data before changing the cart count.
        if (
            !productName ||
            rawPrice === undefined ||
            rawPrice.trim() === "" ||
            !Number.isFinite(productPrice) ||
            productPrice <= 0
        ) {
            showCartMessage("Sorry, this product cannot be added right now.");
            console.error("VOID District: Invalid product information.");
            return;
        }

        // Prevent repeated clicks while this action is being processed.
        if (addButton.disabled) {
            return;
        }

        addButton.disabled = true;

        try {
            cartCount += 1;
            updateBagCount();

            showCartMessage(`${productName} added to your sample bag.`);

            const originalText = addButton.innerHTML;
            addButton.textContent = "ADDED TO BAG ✓";

            // Restore the button after showing brief feedback.
            window.setTimeout(() => {
                addButton.innerHTML = originalText;
                addButton.disabled = false;
            }, 800);
        } catch (error) {
            console.error("VOID District: Could not update the bag.", error);
            showCartMessage("Something went wrong. Please try again.");

            addButton.disabled = false;
        }
    });
}

// For now, the bag button explains that checkout is not implemented yet.
if (bagButton) {
    bagButton.addEventListener("click", () => {
        if (cartCount === 0) {
            showCartMessage("Your sample bag is empty. Explore the latest drop.");
        } else {
            showCartMessage(
                `Your sample bag has ${cartCount} ${cartCount === 1 ? "item" : "items"}. Full cart functionality is coming later.`
            );
        }
    });
}

/* =========================================
   NEWSLETTER — FRONTEND DEMO
========================================= */

if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener("submit", (event) => {
        // Stop the browser from reloading the page.
        event.preventDefault();

        const email = newsletterEmail.value.trim();

        // The browser also checks the required email field and email type.
        if (!newsletterEmail.checkValidity() || email === "") {
            newsletterMessage.textContent =
                "Please enter a valid email address.";

            newsletterEmail.reportValidity();
            return;
        }

        // No real subscription is made at this stage.
        newsletterMessage.textContent =
            "Thanks! The newsletter form is working as a demo. Subscription is not active yet.";

        newsletterForm.reset();
    });
}

/* =========================================
   FOOTER YEAR
========================================= */

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

/* =========================================
   INITIALIZE
========================================= */

updateBagCount();

console.info("VOID District homepage interactions initialized.");


/* =========================================
   IMAGE FALLBACK — BROKEN IMAGE PROTECTION
========================================= */

document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
        // Avoid repeatedly trying to load the fallback.
        if (img.dataset.fallbackApplied === "true") {
            return;
        }

        img.dataset.fallbackApplied = "true";

        // Show the local placeholder if the original image fails.
        img.src = "./images/image-placeholder.jpg";
    });
});
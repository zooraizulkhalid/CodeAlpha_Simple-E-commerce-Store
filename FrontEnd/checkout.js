
"use strict";

/*
 * VOID® CHECKOUT — FRONTEND DEMO
 *
 * Uses the existing cart.js functions:
 * getCart(), saveCart(), saveOrderNote(), getOrderNote()
 *
 * No real payments are processed.
 * Card details are never saved.
 */

// ============================================
// 1. CONFIGURATION
// ============================================

const CHECKOUT_CONFIG = {
    shippingRates: {
        Pakistan: 0,
        "United Arab Emirates": 1800,
        "Saudi Arabia": 2000,
        Qatar: 1800,
        Oman: 1800,
        Bahrain: 1800,
        Kuwait: 2000,
        "United Kingdom": 3500,
        "United States": 4500,
        Canada: 4500,
        Australia: 5000,
        Turkey: 3000,
        China: 2500,
        Other: 5000
    },

    discountCodes: {
        VOID10: {
            type: "percent",
            value: 10
        }
    },

    maxDiscount: 1000000
};

// ============================================
// 2. DOM ELEMENTS
// ============================================

const checkoutForm = document.getElementById("checkoutForm");
const checkoutItems = document.getElementById("checkoutItems");

const countrySelect = document.getElementById("country");
const shippingMessage = document.getElementById("shippingMessage");
const shippingPrice = document.getElementById("shippingPrice");

const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDiscount = document.getElementById("checkoutDiscount");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");

const discountCodeInput = document.getElementById("discountCode");
const applyDiscountButton = document.getElementById("applyDiscountButton");
const discountMessage = document.getElementById("discountMessage");

const checkoutMessage = document.getElementById("checkoutMessage");
const mobileCheckoutMessage = document.getElementById("mobileCheckoutMessage");

const placeOrderButton = document.getElementById("placeOrderButton");
const mobilePlaceOrderButton = document.getElementById(
    "mobilePlaceOrderButton"
);

const placeOrderButtons = [
    placeOrderButton,
    mobilePlaceOrderButton
].filter(Boolean);

const checkoutBagCount = document.getElementById("checkoutBagCount");

const cardFields = document.getElementById("cardFields");
const billingAddressSection = document.getElementById(
    "billingAddressSection"
);
const billingSameAsShipping = document.getElementById(
    "billingSameAsShipping"
);
const differentBillingFields = document.getElementById(
    "differentBillingFields"
);

const signInLink = document.getElementById("signInLink");
const orderNoteInput = document.getElementById("orderNote");

// ============================================
// 3. CHECKOUT STATE
// ============================================

let cartItems = [];
let subtotal = 0;
let shippingCost = 0;
let discountAmount = 0;
let appliedDiscountCode = "";

// ============================================
// 4. HELPER FUNCTIONS
// ============================================

function formatPrice(amount) {
    return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}

function getSelectedPaymentMethod() {
    const selected = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    return selected ? selected.value : "";
}

function getShippingCost(country) {
    if (
        Object.prototype.hasOwnProperty.call(
            CHECKOUT_CONFIG.shippingRates,
            country
        )
    ) {
        return CHECKOUT_CONFIG.shippingRates[country];
    }

    return CHECKOUT_CONFIG.shippingRates.Other;
}

// General message helper (used by the discount message).
function showMessage(element, message, type = "info") {
    if (!element) return;

    element.textContent = message;
    element.className = type;
}

// Show the same checkout message in both responsive layouts.
function showCheckoutMessage(message, type = "info") {
    [checkoutMessage, mobileCheckoutMessage].forEach((element) => {
        if (!element) return;

        element.textContent = message;
        element.className = `checkout-message ${type}`;
    });
}

// Clear both checkout messages.
function clearCheckoutMessage() {
    [checkoutMessage, mobileCheckoutMessage].forEach((element) => {
        if (!element) return;

        element.textContent = "";
        element.className = "checkout-message";
    });
}

// Keep the desktop and mobile order buttons synchronized.
function updateOrderButtons(
    text = "COMPLETE ORDER",
    disabled = false
) {
    placeOrderButtons.forEach((button) => {
        button.textContent = text;
        button.disabled = disabled;
    });
}

function getCartSafely() {
    try {
        if (typeof getCart !== "function") {
            throw new Error("The existing cart.js file was not loaded.");
        }

        const result = getCart();

        return Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Could not read the cart:", error);

        showCheckoutMessage(
            "We could not load your cart. Please return to your bag and try again.",
            "error"
        );

        return [];
    }
}

// ============================================
// 5. READ AND DISPLAY EXISTING CART ITEMS
// ============================================

function renderCheckoutItems() {
    cartItems = getCartSafely();

    checkoutItems.replaceChildren();

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-cart";

        const message = document.createElement("p");
        message.textContent = "Your shopping bag is currently empty.";

        const link = document.createElement("a");
        link.href = "./index.html";
        link.textContent = "Continue shopping";

        emptyMessage.append(message, link);
        checkoutItems.appendChild(emptyMessage);

        updateOrderButtons("YOUR BAG IS EMPTY", true);

        checkoutBagCount.textContent = "0";
        checkoutBagCount.hidden = true;

        updateTotals();
        return;
    }

    let itemCount = 0;

    cartItems.forEach((item) => {
        if (!item || typeof item !== "object") {
            return;
        }

        const quantity = Number(item.quantity);
        const price = Number(item.price);

        if (
            !Number.isFinite(quantity) ||
            !Number.isFinite(price) ||
            quantity < 1 ||
            price < 0
        ) {
            return;
        }

        itemCount += quantity;

        const itemRow = document.createElement("article");
        itemRow.className = "checkout-item";

        const imageWrap = document.createElement("div");
        imageWrap.className = "checkout-item-image-wrap";

        const image = document.createElement("img");
        image.className = "checkout-item-image";
        image.src = item.image || "./images/image-placeholder.jpg";
        image.alt = item.name || "Product";
        image.loading = "lazy";

        image.addEventListener(
            "error",
            () => {
                image.removeAttribute("src");
                image.alt = "Product image unavailable";
                image.style.objectFit = "contain";
            },
            { once: true }
        );

        const quantityBadge = document.createElement("span");
        quantityBadge.className = "quantity-badge";
        quantityBadge.textContent = String(quantity);
        quantityBadge.setAttribute("aria-label", `Quantity ${quantity}`);

        imageWrap.append(image, quantityBadge);

        const details = document.createElement("div");
        details.className = "checkout-item-details";

        const name = document.createElement("span");
        name.className = "checkout-item-name";
        name.textContent = item.name || "Product";

        const variant = document.createElement("p");
        variant.className = "checkout-item-variant";
        variant.textContent = item.size
            ? `Size: ${item.size}`
            : "Standard";

        details.append(name, variant);

        const itemPrice = document.createElement("span");
        itemPrice.className = "checkout-item-price";
        itemPrice.textContent = formatPrice(price * quantity);

        itemRow.append(imageWrap, details, itemPrice);
        checkoutItems.appendChild(itemRow);
    });

    checkoutBagCount.textContent = String(itemCount);
    checkoutBagCount.hidden = itemCount === 0;

    if (itemCount === 0) {
        updateOrderButtons("YOUR BAG IS EMPTY", true);
    } else {
        updateOrderButtons();
    }

    updateTotals();
}

// ============================================
// 6. SHIPPING AND TOTAL CALCULATIONS
// ============================================

function updateShipping() {
    const country = countrySelect.value;

    shippingCost = getShippingCost(country);

    if (shippingCost === 0) {
        shippingPrice.textContent = "FREE";
        shippingMessage.textContent = "Free shipping within Pakistan.";
    } else {
        shippingPrice.textContent = formatPrice(shippingCost);
        shippingMessage.textContent =
            `Estimated international shipping to ${country}.`;
    }
}

function calculateSubtotal() {
    return cartItems.reduce((total, item) => {
        if (!item || typeof item !== "object") {
            return total;
        }

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        if (
            !Number.isFinite(price) ||
            !Number.isFinite(quantity) ||
            price < 0 ||
            quantity < 1
        ) {
            return total;
        }

        return total + price * quantity;
    }, 0);
}

function updateTotals() {
    subtotal = calculateSubtotal();

    // A discount cannot exceed the current subtotal.
    discountAmount = Math.min(
        Math.max(0, discountAmount),
        subtotal,
        CHECKOUT_CONFIG.maxDiscount
    );

    const total = Math.max(
        0,
        subtotal - discountAmount + shippingCost
    );

    checkoutSubtotal.textContent = formatPrice(subtotal);

    checkoutDiscount.textContent =
        `− ${formatPrice(discountAmount)}`;

    checkoutShipping.textContent = shippingCost === 0
        ? "FREE"
        : formatPrice(shippingCost);

    checkoutTotal.textContent = formatPrice(total);
}

countrySelect.addEventListener("change", () => {
    updateShipping();
    updateTotals();
    clearCheckoutMessage();
});

// ============================================
// 7. DEMO DISCOUNT CODE
// ============================================

function applyDiscount() {
    const enteredCode = discountCodeInput.value.trim().toUpperCase();

    discountAmount = 0;
    appliedDiscountCode = "";

    if (!enteredCode) {
        updateTotals();

        showMessage(
            discountMessage,
            "Please enter a discount code.",
            "error"
        );

        return;
    }

    const rule = CHECKOUT_CONFIG.discountCodes[enteredCode];

    if (!rule) {
        updateTotals();

        showMessage(
            discountMessage,
            "This demo discount code is not valid.",
            "error"
        );

        return;
    }

    if (subtotal <= 0) {
        updateTotals();

        showMessage(
            discountMessage,
            "Add a product to your bag before applying a discount.",
            "error"
        );

        return;
    }

    if (rule.type === "percent") {
        discountAmount = subtotal * (rule.value / 100);
    } else if (rule.type === "fixed") {
        discountAmount = rule.value;
    }

    discountAmount = Math.min(
        Math.max(0, discountAmount),
        subtotal,
        CHECKOUT_CONFIG.maxDiscount
    );

    appliedDiscountCode = enteredCode;

    updateTotals();

    showMessage(
        discountMessage,
        `${enteredCode} applied. You saved ${formatPrice(discountAmount)}.`,
        "success"
    );
}

applyDiscountButton.addEventListener("click", applyDiscount);

discountCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        applyDiscount();
    }
});

// ============================================
// 8. PAYMENT AND BILLING FIELD VISIBILITY
// ============================================

function updateBillingFields() {
    const isSameAddress = billingSameAsShipping.checked;

    differentBillingFields.hidden = isSameAddress;

    const billingInputs = differentBillingFields.querySelectorAll(
        "input, select"
    );

    billingInputs.forEach((input) => {
        const isOptional =
            input.id === "billingApartment" ||
            input.id === "billingPostalCode";

        input.required = !isSameAddress && !isOptional;
        input.disabled = isSameAddress;
    });
}

function updatePaymentFields() {
    const paymentMethod = getSelectedPaymentMethod();
    const isCard = paymentMethod === "card";

    cardFields.hidden = !isCard;
    billingAddressSection.hidden = !paymentMethod;

    const cardInputs = cardFields.querySelectorAll("input");

    cardInputs.forEach((input) => {
        input.required = isCard;
        input.disabled = !isCard;
    });

    updateBillingFields();

    if (isCard) {
        updateOrderButtons("PAY NOW — DEMO ONLY");
    } else {
        updateOrderButtons();
    }

    clearCheckoutMessage();
}

document
    .querySelectorAll('input[name="paymentMethod"]')
    .forEach((radio) => {
        radio.addEventListener("change", updatePaymentFields);
    });

billingSameAsShipping.addEventListener(
    "change",
    updateBillingFields
);

// ============================================
// 9. BASIC INPUT VALIDATION
// ============================================

function validateCheckout() {
    clearCheckoutMessage();

    if (cartItems.length === 0 || calculateSubtotal() <= 0) {
        showCheckoutMessage(
            "Your bag is empty. Add a product before continuing.",
            "error"
        );

        return false;
    }

    const emailOrPhone = document
        .getElementById("email")
        .value.trim();

    if (!emailOrPhone) {
        showCheckoutMessage(
            "Please enter your email address or mobile phone number.",
            "error"
        );

        document.getElementById("email").focus();
        return false;
    }

    const looksLikeEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);

    const digits = emailOrPhone.replace(/\D/g, "");

    const looksLikePhone =
        /^\+?[\d\s().-]+$/.test(emailOrPhone) &&
        digits.length >= 7 &&
        digits.length <= 15;

    if (!looksLikeEmail && !looksLikePhone) {
        showCheckoutMessage(
            "Enter a valid email address or mobile phone number.",
            "error"
        );

        document.getElementById("email").focus();
        return false;
    }

    const requiredFields = [
        ["firstName", "Please enter your first name."],
        ["lastName", "Please enter your last name."],
        ["address", "Please enter your delivery address."],
        ["city", "Please enter your city."],
        ["phone", "Please enter your phone number."]
    ];

    for (const [id, message] of requiredFields) {
        const field = document.getElementById(id);

        if (!field.value.trim()) {
            showCheckoutMessage(message, "error");
            field.focus();
            return false;
        }
    }

    const phoneDigits = document
        .getElementById("phone")
        .value.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        showCheckoutMessage(
            "Please enter a valid delivery phone number.",
            "error"
        );

        document.getElementById("phone").focus();
        return false;
    }

    const paymentMethod = getSelectedPaymentMethod();

    if (!paymentMethod) {
        showCheckoutMessage(
            "Please select a payment method.",
            "error"
        );

        document.querySelector(
            'input[name="paymentMethod"]'
        ).focus();

        return false;
    }

    if (paymentMethod === "card") {
        const cardNumber = document
            .getElementById("cardNumber")
            .value.replace(/\s/g, "");

        const expiry = document
            .getElementById("cardExpiry")
            .value.trim();

        const securityCode = document
            .getElementById("cardSecurityCode")
            .value.trim();

        const cardholderName = document
            .getElementById("cardholderName")
            .value.trim();

        if (!/^\d{12,19}$/.test(cardNumber)) {
            showCheckoutMessage(
                "Enter a demo card number containing 12–19 digits. No payment will be processed.",
                "error"
            );

            document.getElementById("cardNumber").focus();
            return false;
        }

        const expiryMatch = expiry.match(
            /^(0[1-9]|1[0-2])\/(\d{2})$/
        );

        if (!expiryMatch) {
            showCheckoutMessage(
                "Enter the expiration date in MM/YY format.",
                "error"
            );

            document.getElementById("cardExpiry").focus();
            return false;
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expiryMonth = Number(expiryMatch[1]);
        const expiryYear = Number(expiryMatch[2]);

        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            showCheckoutMessage(
                "The expiration date must be in the future.",
                "error"
            );

            document.getElementById("cardExpiry").focus();
            return false;
        }

        if (!/^\d{3,4}$/.test(securityCode)) {
            showCheckoutMessage(
                "Enter a 3- or 4-digit security code.",
                "error"
            );

            document.getElementById("cardSecurityCode").focus();
            return false;
        }

        if (!cardholderName) {
            showCheckoutMessage(
                "Enter the name shown on the card.",
                "error"
            );

            document.getElementById("cardholderName").focus();
            return false;
        }
    }

    if (!billingSameAsShipping.checked) {
        const billingRequiredFields = [
            ["billingFirstName", "Enter the billing first name."],
            ["billingLastName", "Enter the billing last name."],
            ["billingAddress", "Enter the billing address."],
            ["billingCity", "Enter the billing city."],
            ["billingPhone", "Enter the billing phone number."]
        ];

        for (const [id, message] of billingRequiredFields) {
            const field = document.getElementById(id);

            if (!field.value.trim()) {
                showCheckoutMessage(message, "error");
                field.focus();
                return false;
            }
        }

        const billingPhoneDigits = document
            .getElementById("billingPhone")
            .value.replace(/\D/g, "");

        if (
            billingPhoneDigits.length < 7 ||
            billingPhoneDigits.length > 15
        ) {
            showCheckoutMessage(
                "Enter a valid billing phone number.",
                "error"
            );

            document.getElementById("billingPhone").focus();
            return false;
        }
    }

    return true;
}

// ============================================
// 10. ORDER NOTE
// ============================================

function saveCheckoutNote() {
    const note = orderNoteInput.value.trim();

    // Reuse the existing cart helper if it is available.
    // Card details are never saved.
    if (typeof saveOrderNote === "function") {
        try {
            saveOrderNote(note);
        } catch (error) {
            console.warn("Order note could not be saved.", error);
        }
    }
}

// ============================================
// 11. SUBMIT ORDER / PAYMENT DEMO
// ============================================

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCheckout()) {
        return;
    }

    saveCheckoutNote();

    const paymentMethod = getSelectedPaymentMethod();

    const total = Math.max(
        0,
        subtotal - discountAmount + shippingCost
    );

    if (paymentMethod === "card") {
        // No card details are stored or transmitted.
        // A secure payment provider is required for real payments.
        showCheckoutMessage(
            "Payment gateway not connected. No payment was taken and no order was submitted. Connect a secure payment provider to enable online payments.",
            "info"
        );

        document.getElementById("cardNumber").value = "";
        document.getElementById("cardExpiry").value = "";
        document.getElementById("cardSecurityCode").value = "";
        document.getElementById("cardholderName").value = "";

        return;
    }

    // COD demo: confirmation is local to this browser.
    // No order is created on a server.
    const confirmed = window.confirm(
        "Confirm this demo Cash on Delivery order?\n\n" +
        `Order total: ${formatPrice(total)}\n\n` +
        "This is a frontend demonstration only. No real order will be sent to a store."
    );

    if (!confirmed) {
        showCheckoutMessage(
            "Order confirmation cancelled. You can review your details and try again.",
            "info"
        );

        return;
    }

    const demoOrderReference =
        "VOID-DEMO-" + Date.now().toString().slice(-8);

    showCheckoutMessage(
        `Demo order confirmed! Reference: ${demoOrderReference}. Total: ${formatPrice(total)}. This confirmation exists only in this browser; no order has been sent to a server.`,
        "success"
    );

    updateOrderButtons("DEMO ORDER CONFIRMED", true);
});

// ============================================
// 12. SIGN-IN LINK DEMO
// ============================================

signInLink.addEventListener("click", (event) => {
    event.preventDefault();

    showCheckoutMessage(
        "Customer sign-in is not connected yet. Add your authentication page or service to enable sign-in.",
        "info"
    );

    checkoutForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// ============================================
// 13. INITIALIZE CHECKOUT
// ============================================

function initializeCheckout() {
    updateShipping();
    updatePaymentFields();

    // Restore the saved order note if cart.js supports it.
    if (typeof getOrderNote === "function") {
        try {
            orderNoteInput.value = getOrderNote() || "";
        } catch (error) {
            console.warn("Could not read the saved order note.", error);
        }
    }

    renderCheckoutItems();
}

initializeCheckout();
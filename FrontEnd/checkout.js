"use strict";

/* =========================================
   VOID DISTRICT — CHECKOUT SYSTEM
   Frontend Demo | Backend-Ready Structure
========================================= */

// =========================================
// 1. CONFIGURATION
// =========================================

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
    Other: 5000,
  },

  discountCodes: {
    VOID10: {
      type: "percent",
      value: 10,
    },
  },
};

// =========================================
// 2. DOM ELEMENTS
// =========================================

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
  "mobilePlaceOrderButton",
);

const checkoutBagCount = document.getElementById("checkoutBagCount");

const cardFields = document.getElementById("cardFields");
const billingAddressSection = document.getElementById("billingAddressSection");

const billingSameAsShipping = document.getElementById("billingSameAsShipping");

const differentBillingFields = document.getElementById(
  "differentBillingFields",
);

const orderNoteInput = document.getElementById("orderNote");
const signInLink = document.getElementById("signInLink");
const orderConfirmation = document.getElementById("orderConfirmation");

const mobileOrderAction = document.querySelector(".mobile-order-action");

const placeOrderButtons = [placeOrderButton, mobilePlaceOrderButton].filter(
  Boolean,
);

// =========================================
// 3. CHECKOUT STATE
// =========================================

let cartItems = [];
let subtotal = 0;
let shippingCost = 0;
let discountAmount = 0;
let appliedDiscountCode = "";
let orderCompleted = false;

// =========================================
// 4. HELPER FUNCTIONS
// =========================================

function formatPrice(amount) {
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}

function getSelectedPaymentMethod() {
  const selected = document.querySelector(
    'input[name="paymentMethod"]:checked',
  );

  return selected ? selected.value : "";
}

function getShippingCost(country) {
  return Object.prototype.hasOwnProperty.call(
    CHECKOUT_CONFIG.shippingRates,
    country,
  )
    ? CHECKOUT_CONFIG.shippingRates[country]
    : CHECKOUT_CONFIG.shippingRates.Other;
}

function getCartSafely() {
  try {
    const cart = getCart();
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Cart loading failed:", error);
    return [];
  }
}

function showCheckoutMessage(message, type = "info") {
  [checkoutMessage, mobileCheckoutMessage].forEach((element) => {
    if (!element) return;

    element.textContent = message;
    element.className = `checkout-message ${type}`;
  });
}

function clearCheckoutMessage() {
  [checkoutMessage, mobileCheckoutMessage].forEach((element) => {
    if (!element) return;

    element.textContent = "";
    element.className = "checkout-message";
  });
}

function updateOrderButtons() {
  const isEmpty = cartItems.length === 0;
  const isCard = getSelectedPaymentMethod() === "card";

  let buttonText = "COMPLETE ORDER";

  if (isEmpty) {
    buttonText = "YOUR BAG IS EMPTY";
  } else if (isCard) {
    buttonText = "ONLINE PAYMENT UNAVAILABLE";
  }

  placeOrderButtons.forEach((button) => {
    button.textContent = buttonText;
    button.disabled = isEmpty || isCard || orderCompleted;
  });
}

// =========================================
// 5. SHIPPING CALCULATION
// =========================================

function updateShipping() {
  const country = countrySelect.value;

  shippingCost = getShippingCost(country);

  if (shippingCost === 0) {
    shippingPrice.textContent = "FREE";
    shippingMessage.textContent = "Free shipping within Pakistan.";
  } else {
    shippingPrice.textContent = formatPrice(shippingCost);

    shippingMessage.textContent = `Estimated international shipping to ${country}.`;
  }

  updateTotals();
}

// =========================================
// 6. SUBTOTAL AND GRAND TOTAL
// =========================================

function calculateSubtotal() {
  return cartItems.reduce((total, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    if (
      !Number.isFinite(price) ||
      !Number.isInteger(quantity) ||
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

  discountAmount = 0;

  if (appliedDiscountCode === "VOID10") {
    discountAmount = Math.round(subtotal * 0.1);
  }

  discountAmount = Math.min(discountAmount, subtotal);

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  checkoutSubtotal.textContent = formatPrice(subtotal);

  checkoutDiscount.textContent = `− ${formatPrice(discountAmount)}`;

  checkoutShipping.textContent =
    shippingCost === 0 ? "FREE" : formatPrice(shippingCost);

  checkoutTotal.textContent = formatPrice(total);

  return total;
}

// =========================================
// 7. RENDER CART PRODUCTS
// =========================================

function renderCheckoutItems() {
  cartItems = getCartSafely();

  checkoutItems.replaceChildren();

  if (cartItems.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-cart";

    const message = document.createElement("p");
    message.textContent = "Your shopping bag is currently empty.";

    const shopLink = document.createElement("a");
    shopLink.href = "./shop.html";
    shopLink.textContent = "Continue shopping";

    emptyState.append(message, shopLink);
    checkoutItems.appendChild(emptyState);

    checkoutBagCount.textContent = "0";
    checkoutBagCount.hidden = true;

    updateTotals();
    updateOrderButtons();
    return;
  }

  let itemCount = 0;

  cartItems.forEach((item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);

    itemCount += quantity;

    const article = document.createElement("article");
    article.className = "checkout-item";

    // Product image
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
      },
      { once: true },
    );

    const quantityBadge = document.createElement("span");
    quantityBadge.className = "quantity-badge";
    quantityBadge.textContent = String(quantity);

    imageWrap.append(image, quantityBadge);

    // Product details
    const details = document.createElement("div");
    details.className = "checkout-item-details";

    const name = document.createElement("span");
    name.className = "checkout-item-name";
    name.textContent = item.name;

    const size = document.createElement("p");
    size.className = "checkout-item-variant";
    size.textContent = `Size: ${item.size}`;

    details.append(name, size);

    // Product total
    const priceElement = document.createElement("span");
    priceElement.className = "checkout-item-price";
    priceElement.textContent = formatPrice(price * quantity);

    article.append(imageWrap, details, priceElement);
    checkoutItems.appendChild(article);
  });

  checkoutBagCount.textContent = String(itemCount);
  checkoutBagCount.hidden = itemCount === 0;

  updateTotals();
  updateOrderButtons();
}

// =========================================
// 8. DISCOUNT CODE
// =========================================

function applyDiscount() {
  if (orderCompleted) return;

  const code = discountCodeInput.value.trim().toUpperCase();

  appliedDiscountCode = "";

  if (!code) {
    discountMessage.textContent = "Please enter a discount code.";
    discountMessage.className = "error";

    updateTotals();
    return;
  }

  if (cartItems.length === 0) {
    discountMessage.textContent = "Add a product before applying a discount.";
    discountMessage.className = "error";

    updateTotals();
    return;
  }

  const discountRule = CHECKOUT_CONFIG.discountCodes[code];

  if (!discountRule) {
    discountMessage.textContent = "Invalid discount code.";
    discountMessage.className = "error";

    updateTotals();
    return;
  }

  appliedDiscountCode = code;

  updateTotals();

  discountMessage.textContent = `${code} applied! You saved ${formatPrice(discountAmount)}.`;

  discountMessage.className = "success";
}

applyDiscountButton.addEventListener("click", applyDiscount);

discountCodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyDiscount();
  }
});

// =========================================
// 9. PAYMENT METHOD SELECTION
// =========================================

function updatePaymentFields() {
  const paymentMethod = getSelectedPaymentMethod();

  const isCard = paymentMethod === "card";

  cardFields.hidden = !isCard;

  billingAddressSection.hidden = !paymentMethod;

  updateBillingFields();
  updateOrderButtons();
  clearCheckoutMessage();
}

document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
  radio.addEventListener("change", updatePaymentFields);
});

// =========================================
// 10. BILLING ADDRESS
// =========================================

function updateBillingFields() {
  const sameAddress = billingSameAsShipping.checked;

  differentBillingFields.hidden = sameAddress;

  const inputs = differentBillingFields.querySelectorAll("input, select");

  inputs.forEach((input) => {
    const optional =
      input.id === "billingApartment" || input.id === "billingPostalCode";

    input.required = !sameAddress && !optional;
    input.disabled = sameAddress;
  });
}

billingSameAsShipping.addEventListener("change", updateBillingFields);

// =========================================
// 11. FORM VALIDATION
// =========================================

function validateCheckout() {
  clearCheckoutMessage();

  if (cartItems.length === 0 || subtotal <= 0) {
    showCheckoutMessage(
      "Your bag is empty. Add products before checkout.",
      "error",
    );
    return false;
  }

  // Email or mobile number
  const contactInput = document.getElementById("email");

  const contact = contactInput.value.trim();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const digits = contact.replace(/\D/g, "");

  const validPhone =
    /^\+?[\d\s().-]+$/.test(contact) &&
    digits.length >= 7 &&
    digits.length <= 15;

  if (!validEmail && !validPhone) {
    showCheckoutMessage(
      "Please enter a valid email or mobile number.",
      "error",
    );

    contactInput.focus();
    return false;
  }

  // Required delivery fields
  const requiredFields = [
    ["firstName", "Please enter your first name."],
    ["lastName", "Please enter your last name."],
    ["address", "Please enter your address."],
    ["city", "Please enter your city."],
    ["phone", "Please enter your phone number."],
  ];

  for (const [id, message] of requiredFields) {
    const input = document.getElementById(id);

    if (!input.value.trim()) {
      showCheckoutMessage(message, "error");
      input.focus();
      return false;
    }
  }

  // Delivery phone validation
  const deliveryPhone = document
    .getElementById("phone")
    .value.replace(/\D/g, "");

  if (deliveryPhone.length < 7 || deliveryPhone.length > 15) {
    showCheckoutMessage("Please enter a valid delivery phone number.", "error");

    document.getElementById("phone").focus();
    return false;
  }

  // Payment method
  const paymentMethod = getSelectedPaymentMethod();

  if (!paymentMethod) {
    showCheckoutMessage("Please select a payment method.", "error");

    document.querySelector('input[name="paymentMethod"]').focus();

    return false;
  }

  if (paymentMethod === "card") {
    showCheckoutMessage("Online card payment is not available yet.", "info");

    return false;
  }

  // Billing validation
  if (!billingSameAsShipping.checked) {
    const billingFields = [
      "billingFirstName",
      "billingLastName",
      "billingAddress",
      "billingCity",
      "billingPhone",
    ];

    for (const id of billingFields) {
      const field = document.getElementById(id);

      if (!field.value.trim()) {
        showCheckoutMessage("Please complete your billing address.", "error");

        field.focus();
        return false;
      }
    }

    const billingPhone = document
      .getElementById("billingPhone")
      .value.replace(/\D/g, "");

    if (billingPhone.length < 7 || billingPhone.length > 15) {
      showCheckoutMessage(
        "Please enter a valid billing phone number.",
        "error",
      );

      document.getElementById("billingPhone").focus();
      return false;
    }
  }

  return true;
}

// =========================================
// 12. ORDER DATA STRUCTURE
// =========================================

function createDemoOrder() {
  const total = updateTotals();

  const firstName = document.getElementById("firstName").value.trim();

  const lastName = document.getElementById("lastName").value.trim();

  const address = document.getElementById("address").value.trim();

  const apartment = document.getElementById("apartment").value.trim();

  const city = document.getElementById("city").value.trim();

  const postalCode = document.getElementById("postalCode").value.trim();

  return {
    reference: "VOID-DEMO-" + Date.now().toString().slice(-8),

    customer: {
      firstName,
      lastName,
      contact: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
    },

    shippingAddress: {
      country: countrySelect.value,
      address,
      apartment,
      city,
      postalCode,
    },

    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    })),

    paymentMethod: "cod",
    paymentStatus: "unpaid",
    orderStatus: "demo",

    pricing: {
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total,
    },

    discountCode: appliedDiscountCode,

    note: orderNoteInput.value.trim(),

    createdAt: new Date().toISOString(),
  };
}

// =========================================
// 13. ORDER CONFIRMATION SCREEN
// =========================================

function showDemoConfirmation(order) {
  orderConfirmation.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "YOUR DEMO ORDER IS CONFIRMED.";

  const description = document.createElement("p");
  description.textContent =
    "This is a frontend demonstration. No real order has been placed or sent to a store.";

  const reference = document.createElement("p");
  reference.textContent = `Order reference: ${order.reference}`;

  const customer = document.createElement("p");
  customer.textContent = `Customer: ${order.customer.firstName} ${order.customer.lastName}`;

  const payment = document.createElement("p");
  payment.textContent = "Payment: Cash on Delivery (Demo)";

  const address = document.createElement("p");

  address.textContent = [
    order.shippingAddress.address,
    order.shippingAddress.apartment,
    order.shippingAddress.city,
    order.shippingAddress.postalCode,
    order.shippingAddress.country,
  ]
    .filter(Boolean)
    .join(", ");

  const itemsHeading = document.createElement("h3");
  itemsHeading.textContent = "ORDER ITEMS";

  const itemList = document.createElement("ul");

  order.items.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.textContent = `${item.name} — Size ${item.size} × ${item.quantity}`;

    itemList.appendChild(listItem);
  });

  const subtotalText = document.createElement("p");
  subtotalText.textContent = `Subtotal: ${formatPrice(order.pricing.subtotal)}`;

  const discountText = document.createElement("p");
  discountText.textContent = `Discount: − ${formatPrice(order.pricing.discount)}`;

  const shippingText = document.createElement("p");
  shippingText.textContent = `Shipping: ${formatPrice(order.pricing.shipping)}`;

  const totalText = document.createElement("p");
  totalText.className = "confirmation-total";
  totalText.textContent = `TOTAL: ${formatPrice(order.pricing.total)}`;

  const shopLink = document.createElement("a");
  shopLink.href = "./shop.html";
  shopLink.className = "confirmation-shop-link";
  shopLink.textContent = "CONTINUE SHOPPING";

  orderConfirmation.append(
    heading,
    description,
    reference,
    customer,
    payment,
    address,
    itemsHeading,
    itemList,
    subtotalText,
    discountText,
    shippingText,
    totalText,
    shopLink,
  );

  checkoutForm.hidden = true;
  orderConfirmation.hidden = false;

  // The mobile button sits outside the form.
  if (mobileOrderAction) {
    mobileOrderAction.hidden = true;
  }

  // Disable discount after completion.
  discountCodeInput.disabled = true;
  applyDiscountButton.disabled = true;

  orderConfirmation.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// =========================================
// 14. COMPLETE ORDER — DEMO COD
// =========================================

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (orderCompleted) return;

  // Refresh cart before submitting.
  cartItems = getCartSafely();
  updateTotals();
  updateOrderButtons();

  if (cartItems.length === 0) {
    showCheckoutMessage("Your bag is empty. Please add products.", "error");
    return;
  }

  const paymentMethod = getSelectedPaymentMethod();

  if (paymentMethod === "card") {
    showCheckoutMessage(
      "Online payment is not connected yet. No payment was taken.",
      "info",
    );
    return;
  }

  if (!validateCheckout()) return;

  // Prepare frontend demo order.
  const order = createDemoOrder();

  const confirmed = window.confirm(
    `Confirm DEMO Cash on Delivery order?\n\n` +
      `Total: ${formatPrice(order.pricing.total)}\n\n` +
      "No real order will be placed.",
  );

  if (!confirmed) return;

  // Clear the cart only after confirmation.
  const saved = saveCart([]);

  if (!saved) {
    showCheckoutMessage(
      "Unable to update your cart. Please try again.",
      "error",
    );
    return;
  }

  orderCompleted = true;

  // Clear the saved order note.
  if (typeof saveOrderNote === "function") {
    saveOrderNote("");
  }

  showDemoConfirmation(order);

  // Refresh the order summary.
  renderCheckoutItems();
});

// =========================================
// 15. SIGN-IN PLACEHOLDER
// =========================================

signInLink.addEventListener("click", (event) => {
  event.preventDefault();

  showCheckoutMessage(
    "Customer sign-in will be available after backend integration.",
    "info",
  );

  checkoutForm.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// =========================================
// 16. COUNTRY CHANGE
// =========================================

countrySelect.addEventListener("change", () => {
  updateShipping();
  clearCheckoutMessage();
});

// =========================================
// 17. CROSS-TAB CART UPDATES
// =========================================

window.addEventListener("storage", (event) => {
  if (event.key === CART_STORAGE_KEY && !orderCompleted) {
    renderCheckoutItems();
  }
});

// =========================================
// 18. INITIALIZE CHECKOUT
// =========================================

function initializeCheckout() {
  updateShipping();

  // Restore saved order note.
  if (typeof getOrderNote === "function") {
    try {
      orderNoteInput.value = getOrderNote() || "";
    } catch (error) {
      console.warn("Could not restore order note.", error);
    }
  }

  renderCheckoutItems();
  updatePaymentFields();
}

initializeCheckout();

/* Refresh checkout when returning via browser navigation */
window.addEventListener("pageshow", () => {
  if (orderCompleted) return;

  renderCheckoutItems();
  updateShipping();
});

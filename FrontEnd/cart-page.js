
"use strict";

/* =========================================
   VOID DISTRICT — SHOPPING CART PAGE
========================================= */

const cartItemsContainer = document.getElementById("cartItems");
const cartTotalItems = document.getElementById("cartTotalItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutButton = document.getElementById("checkoutButton");

function formatCartPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function updateCartHeader(count) {
  const bagCount = document.getElementById("bagCount");
  const bagButton = document.getElementById("bagButton");

  if (bagCount) {
    bagCount.textContent = String(count);
  }

  if (bagButton) {
    bagButton.setAttribute(
      "aria-label",
      `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`
    );
  }
}

function renderCart() {
  const cart = getCart();

  cartItemsContainer.replaceChildren();

  const totalItems = getCartCount();
  const subtotal = getCartSubtotal();

  if (cart.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "cart-empty";

    const heading = document.createElement("h2");
    heading.textContent = "YOUR BAG IS EMPTY.";

    const description = document.createElement("p");
    description.textContent =
      "Your next favourite piece is waiting. Explore the collection.";

    const shopLink = document.createElement("a");
    shopLink.href = "./shop.html";
    shopLink.textContent = "EXPLORE THE COLLECTION →";

    emptyState.append(heading, description, shopLink);
    cartItemsContainer.appendChild(emptyState);
  } else {
    cart.forEach((item) => {
      const productUrl =
        `./product.html?product=${encodeURIComponent(item.id)}`;

      const article = document.createElement("article");
      article.className = "cart-item";

      // Product image and link
      const imageLink = document.createElement("a");
      imageLink.href = productUrl;
      imageLink.className = "cart-product-link";
      imageLink.setAttribute("aria-label", `View ${item.name}`);

      const image = document.createElement("img");
      image.className = "cart-item-image";
      image.src = item.image || "./images/image-placeholder.jpg";
      image.alt = item.name;
      image.loading = "lazy";

      image.addEventListener(
        "error",
        () => {
          image.removeAttribute("src");
          image.alt = "Product image unavailable";
        },
        { once: true }
      );

      imageLink.appendChild(image);

      // Product details
      const details = document.createElement("div");
      details.className = "cart-item-details";

      const name = document.createElement("h3");

      const nameLink = document.createElement("a");
      nameLink.href = productUrl;
      nameLink.className = "cart-product-name-link";
      nameLink.textContent = item.name;

      name.appendChild(nameLink);

      const size = document.createElement("p");
      size.className = "cart-item-size";
      size.textContent = `Size: ${item.size}`;

      const unitPrice = document.createElement("p");
      unitPrice.className = "cart-unit-price";
      unitPrice.textContent = `${formatCartPrice(item.price)} each`;

      // Quantity controls
      const actions = document.createElement("div");
      actions.className = "cart-item-actions";

      const quantityControls = document.createElement("div");
      quantityControls.className = "cart-quantity-controls";

      const decreaseButton = document.createElement("button");
      decreaseButton.type = "button";
      decreaseButton.className = "cart-quantity-button";
      decreaseButton.textContent = "−";
      decreaseButton.disabled = item.quantity <= 1;
      decreaseButton.setAttribute(
        "aria-label",
        `Decrease quantity of ${item.name}, size ${item.size}`
      );

      const quantityValue = document.createElement("span");
      quantityValue.className = "cart-quantity-value";
      quantityValue.textContent = String(item.quantity);

      const increaseButton = document.createElement("button");
      increaseButton.type = "button";
      increaseButton.className = "cart-quantity-button";
      increaseButton.textContent = "+";
      increaseButton.disabled = item.quantity >= MAX_ITEM_QUANTITY;
      increaseButton.setAttribute(
        "aria-label",
        `Increase quantity of ${item.name}, size ${item.size}`
      );

      decreaseButton.addEventListener("click", () => {
        changeQuantity(item, item.quantity - 1);
      });

      increaseButton.addEventListener("click", () => {
        changeQuantity(item, item.quantity + 1);
      });

      quantityControls.append(
        decreaseButton,
        quantityValue,
        increaseButton
      );

      // Remove item
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "cart-remove";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", () => {
        const result = removeFromCart(item.id, item.size);

        if (result.success) {
          renderCart();
        } else {
          console.error(result.message);
          alert(result.message);
        }
      });

      actions.append(quantityControls, removeButton);

      // Line total
      const lineTotal = document.createElement("p");
      lineTotal.className = "cart-item-price";
      lineTotal.textContent = formatCartPrice(
        item.price * item.quantity
      );

      details.append(name, size, unitPrice, actions, lineTotal);
      article.append(imageLink, details);

      cartItemsContainer.appendChild(article);
    });
  }

  cartTotalItems.textContent = String(totalItems);
  cartSubtotal.textContent = formatCartPrice(subtotal);

  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }

  updateCartHeader(totalItems);
}

function changeQuantity(item, newQuantity) {
  if (
    !Number.isInteger(newQuantity) ||
    newQuantity < 1 ||
    newQuantity > MAX_ITEM_QUANTITY
  ) {
    return;
  }

  const result = updateCartQuantity(
    item.id,
    item.size,
    newQuantity
  );

  if (result.success) {
    renderCart();
  } else {
    console.error(result.message);
    alert(result.message);
  }
}

// Checkout navigation
if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (getCart().length === 0) return;

    window.location.href = "./checkout.html";
  });
}

// Refresh cart if updated in another browser tab
window.addEventListener("storage", (event) => {
  if (event.key === CART_STORAGE_KEY) {
    renderCart();
  }
});

// Initial render
renderCart();


"use strict";

/* =========================================
   VOID DISTRICT — CART DRAWER
========================================= */

(() => {
    const drawer = document.getElementById("cartDrawer");

    // Other pages may not contain the drawer markup yet.
    if (!drawer) {
        return;
    }

    const backdrop = document.getElementById("cartDrawerBackdrop");
    const closeButton = document.getElementById("closeCartDrawer");
    const content = document.getElementById("cartDrawerContent");
    const itemCount = document.getElementById("drawerItemCount");
    const checkoutTotal = document.getElementById("drawerCheckoutTotal");
    const checkoutButton = document.getElementById("drawerCheckoutButton");
    const noteToggle = document.getElementById("orderNoteToggle");
    const noteSection = document.getElementById("orderNoteSection");
    const orderNote = document.getElementById("orderNote");
    const bagButton = document.getElementById("bagButton");

    let previouslyFocusedElement = null;
    let scrollPosition = 0;

    function formatPrice(price) {
        return `Rs. ${price.toLocaleString("en-PK")}`;
    }

    function updateHeaderCount(count = getCartCount()) {
        const countElement = document.getElementById("bagCount");
        const button = document.getElementById("bagButton");

        if (countElement) {
            countElement.textContent = String(count);
        }

        if (button) {
            button.setAttribute(
                "aria-label",
                `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`
            );
        }

        // Keep the homepage's existing count variable in sync, if present.
        try {
            localStorage.setItem("voidDistrictCartCount", String(count));
        } catch (error) {
            console.error("VOID District: Could not update bag count.", error);
        }
    }

    function renderDrawer() {
        const cart = getCart();
        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        itemCount.textContent = String(totalQuantity);
        checkoutTotal.textContent = formatPrice(getCartSubtotal());
        updateHeaderCount(totalQuantity);

        content.replaceChildren();

        if (cart.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.className = "cart-drawer-empty";

            const heading = document.createElement("h3");
            heading.textContent = "Your bag is empty.";

            const message = document.createElement("p");
            message.textContent =
                "Discover the latest pieces from VOID District.";

            const shopLink = document.createElement("a");
            shopLink.href = "./index.html#featured";
            shopLink.textContent = "EXPLORE THE COLLECTION";

            emptyState.append(heading, message, shopLink);
            content.appendChild(emptyState);
            return;
        }

        cart.forEach((item) => {
            const row = document.createElement("article");
            row.className = "drawer-cart-item";

            const image = document.createElement("img");
            image.className = "drawer-cart-image";
            image.src = item.image || "./images/image-placeholder.jpg";
            image.alt = item.name;
            image.loading = "lazy";

            image.addEventListener("error", () => {
                image.src = "./images/image-placeholder.jpg";
            }, { once: true });

            const details = document.createElement("div");
            details.className = "drawer-cart-details";

            const name = document.createElement("h3");
            name.textContent = item.name;

            const price = document.createElement("p");
            price.className = "drawer-cart-price";
            price.textContent = formatPrice(item.price);

            const size = document.createElement("p");
            size.className = "drawer-cart-size";
            size.textContent = `Size: ${item.size}`;

            const quantityControls = document.createElement("div");
            quantityControls.className = "drawer-quantity-controls";

            const decrease = document.createElement("button");
            decrease.type = "button";
            decrease.className = "drawer-quantity-button";
            decrease.textContent = "−";
            decrease.setAttribute(
                "aria-label",
                `Decrease ${item.name} quantity`
            );
            decrease.disabled = item.quantity <= 1;

            const quantity = document.createElement("span");
            quantity.className = "drawer-quantity-value";
            quantity.textContent = String(item.quantity);
            quantity.setAttribute("aria-live", "polite");

            const increase = document.createElement("button");
            increase.type = "button";
            increase.className = "drawer-quantity-button";
            increase.textContent = "+";
            increase.setAttribute(
                "aria-label",
                `Increase ${item.name} quantity`
            );
            increase.disabled = item.quantity >= 10;

            decrease.addEventListener("click", () => {
                const result = updateCartQuantity(
                    item.id,
                    item.size,
                    item.quantity - 1
                );

                if (result.success) {
                    renderDrawer();
                }
            });

            increase.addEventListener("click", () => {
                const result = updateCartQuantity(
                    item.id,
                    item.size,
                    item.quantity + 1
                );

                if (result.success) {
                    renderDrawer();
                }
            });

            quantityControls.append(decrease, quantity, increase);

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "drawer-cart-remove";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", () => {
                const result = removeFromCart(item.id, item.size);

                if (result.success) {
                    renderDrawer();
                }
            });

            const itemSubtotal = document.createElement("p");
            itemSubtotal.className = "drawer-cart-subtotal";
            itemSubtotal.textContent = formatPrice(
                item.price * item.quantity
            );

            const actions = document.createElement("div");
            actions.className = "drawer-cart-actions";
            actions.append(quantityControls, removeButton);

            details.append(name, price, size, actions);
            row.append(image, details, itemSubtotal);
            content.appendChild(row);
        });
    }

    function openCartDrawer() {
        previouslyFocusedElement = document.activeElement;
        scrollPosition = window.scrollY;

        renderDrawer();

        backdrop.hidden = false;
        drawer.inert = false;
        drawer.setAttribute("aria-hidden", "false");

        // Start from the closed position so CSS can animate the drawer in.
        drawer.classList.remove("is-open");
        backdrop.classList.remove("is-visible");

        document.body.classList.add("cart-drawer-open");
        document.body.style.top = `-${scrollPosition}px`;

        requestAnimationFrame(() => {
            backdrop.classList.add("is-visible");
            drawer.classList.add("is-open");
            closeButton.focus();
        });
    }

    function closeCartDrawer() {
        drawer.classList.remove("is-open");
        backdrop.classList.remove("is-visible");

        drawer.setAttribute("aria-hidden", "true");
        drawer.inert = true;
        document.body.classList.remove("cart-drawer-open");
        document.body.style.top = "";

        window.scrollTo(0, scrollPosition);

        window.setTimeout(() => {
            if (!drawer.classList.contains("is-open")) {
                backdrop.hidden = true;
            }
        }, 330);

        if (previouslyFocusedElement?.isConnected) {
            previouslyFocusedElement.focus();
        }
    }

    closeButton.addEventListener("click", closeCartDrawer);
    backdrop.addEventListener("click", closeCartDrawer);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && drawer.classList.contains("is-open")) {
            closeCartDrawer();
        }
    });

    noteToggle.addEventListener("click", () => {
        const isExpanded =
            noteToggle.getAttribute("aria-expanded") === "true";

        noteToggle.setAttribute("aria-expanded", String(!isExpanded));
        noteSection.hidden = isExpanded;
        noteToggle.querySelector("span:last-child").textContent =
            isExpanded ? "+" : "−";
    });

    orderNote.value = getOrderNote();

    orderNote.addEventListener("input", () => {
        saveOrderNote(orderNote.value);
    });

    checkoutButton.addEventListener("click", () => {
        // Checkout will be connected when the backend is implemented.
        const message =
            "Checkout will be available when the store backend is connected.";

        const cartMessage = document.getElementById("cartMessage");

        if (cartMessage) {
            cartMessage.textContent = message;
        } else {
            console.info(message);
        }
    });

    // Expose a single shared entry point for product-page integration.
    window.openCartDrawer = openCartDrawer;

    // Refresh the drawer if the cart changes in another browser tab.
    window.addEventListener("storage", (event) => {
        if (
            event.key === CART_STORAGE_KEY ||
            event.key === CART_COUNT_KEY
        ) {
            renderDrawer();
        }
    });

    renderDrawer();
})();

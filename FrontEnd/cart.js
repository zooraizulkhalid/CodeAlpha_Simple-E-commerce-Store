
"use strict";

/* =========================================
   VOID DISTRICT — SHARED SHOPPING CART
========================================= */

const CART_STORAGE_KEY = "voidDistrictCart";

/* Get cart items saved in the browser. */
function getCart() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
            return [];
        }

        const cart = JSON.parse(savedCart);

        if (!Array.isArray(cart)) {
            return [];
        }

        return cart.filter((item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.name === "string" &&
            Number.isFinite(item.price) &&
            item.price > 0 &&
            typeof item.size === "string" &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            item.quantity <= 10
        );
    } catch (error) {
        console.error("VOID District: Could not read cart.", error);
        return [];
    }
}

/* Save cart items in the browser. */
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

        // Keep the existing bag-count storage in sync.
        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        localStorage.setItem(
            "voidDistrictCartCount",
            String(totalItems)
        );

        return true;
    } catch (error) {
        console.error("VOID District: Could not save cart.", error);
        return false;
    }
}

/* Calculate the total number of items in the cart. */
function getCartCount() {
    return getCart().reduce(
        (total, item) => total + item.quantity,
        0
    );
}

/* Add a product, or increase its quantity if it already exists. */
function addToCart(product, size, quantity = 1) {
    if (
        !product ||
        typeof product.id !== "string" ||
        typeof product.name !== "string" ||
        !Number.isFinite(product.price) ||
        product.price <= 0 ||
        typeof size !== "string" ||
        !size.trim() ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        return {
            success: false,
            message: "Invalid product, size, or quantity."
        };
    }

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === product.id && item.size === size
    );

    if (existingItem) {
        if (existingItem.quantity + quantity > 10) {
            return {
                success: false,
                message: "Maximum quantity per product size is 10."
            };
        }

        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: quantity
        });
    }

    const saved = saveCart(cart);

    if (!saved) {
        return {
            success: false,
            message: "Could not save your cart. Please try again."
        };
    }

    return {
        success: true,
        count: getCartCount(),
        cart: getCart()
    };
}

console.info("VOID District shared cart system loaded.");
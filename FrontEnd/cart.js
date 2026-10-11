'use strict';

/* =========================================
   VOID DISTRICT — SHARED SHOPPING CART
========================================= */

const CART_STORAGE_KEY = 'voidDistrictCart';
const CART_COUNT_KEY = 'voidDistrictCartCount';
const CART_NOTE_KEY = 'voidDistrictOrderNote';
const MAX_ITEM_QUANTITY = 10;

/* Read and validate the saved cart. */
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

		return cart.filter(
			(item) =>
				item &&
				typeof item.id === 'string' &&
				typeof item.name === 'string' &&
				Number.isFinite(item.price) &&
				item.price > 0 &&
				typeof item.size === 'string' &&
				Number.isInteger(item.quantity) &&
				item.quantity >= 1 &&
				item.quantity <= MAX_ITEM_QUANTITY
		);
	} catch (error) {
		console.error('VOID District: Could not read cart.', error);
		return [];
	}
}

/* Save cart items and synchronize the item count. */
function saveCart(cart) {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

		const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

		localStorage.setItem(CART_COUNT_KEY, String(totalItems));

		return true;
	} catch (error) {
		console.error('VOID District: Could not save cart.', error);
		return false;
	}
}

/* Get the total number of individual items. */
function getCartCount() {
	return getCart().reduce((total, item) => total + item.quantity, 0);
}

/* Calculate the cart subtotal. */
function getCartSubtotal() {
	return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
}

/* Add a product or increase its existing quantity. */
function addToCart(product, size, quantity = 1) {
	if (
		!product ||
		typeof product.id !== 'string' ||
		typeof product.name !== 'string' ||
		!Number.isFinite(product.price) ||
		product.price <= 0 ||
		typeof size !== 'string' ||
		!size.trim() ||
		!Number.isInteger(quantity) ||
		quantity < 1 ||
		quantity > MAX_ITEM_QUANTITY
	) {
		return {
			success: false,
			message: 'Invalid product, size, or quantity.',
		};
	}

	const cart = getCart();

	const existingItem = cart.find((item) => item.id === product.id && item.size === size);

	if (existingItem) {
		if (existingItem.quantity + quantity > MAX_ITEM_QUANTITY) {
			return {
				success: false,
				message: 'Maximum quantity per product size is 10.',
			};
		}

		existingItem.quantity += quantity;
	} else {
		cart.push({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image || './images/image-placeholder.jpg',
			size,
			quantity,
		});
	}

	if (!saveCart(cart)) {
		return {
			success: false,
			message: 'Could not save your cart. Please try again.',
		};
	}

	return {
		success: true,
		count: getCartCount(),
		cart: getCart(),
	};
}

/* Update the quantity of a specific product and size. */
function updateCartQuantity(productId, size, quantity) {
	if (
		typeof productId !== 'string' ||
		typeof size !== 'string' ||
		!Number.isInteger(quantity) ||
		quantity < 1 ||
		quantity > MAX_ITEM_QUANTITY
	) {
		return {
			success: false,
			message: 'Quantity must be between 1 and 10.',
		};
	}

	const cart = getCart();

	const item = cart.find((entry) => entry.id === productId && entry.size === size);

	if (!item) {
		return {
			success: false,
			message: 'This item could not be found in your cart.',
		};
	}

	item.quantity = quantity;

	if (!saveCart(cart)) {
		return {
			success: false,
			message: 'Could not update your cart. Please try again.',
		};
	}

	return {
		success: true,
		cart: getCart(),
		count: getCartCount(),
		subtotal: getCartSubtotal(),
	};
}

/* Remove a product in a specific size. */
function removeFromCart(productId, size) {
	const cart = getCart();

	const updatedCart = cart.filter((item) => !(item.id === productId && item.size === size));

	if (updatedCart.length === cart.length) {
		return {
			success: false,
			message: 'This item could not be found in your cart.',
		};
	}

	if (!saveCart(updatedCart)) {
		return {
			success: false,
			message: 'Could not remove this item. Please try again.',
		};
	}

	return {
		success: true,
		cart: getCart(),
		count: getCartCount(),
		subtotal: getCartSubtotal(),
	};
}

/* Save and retrieve the optional order note. */
function saveOrderNote(note) {
	if (typeof note !== 'string' || note.length > 500) {
		return false;
	}

	try {
		localStorage.setItem(CART_NOTE_KEY, note);
		return true;
	} catch (error) {
		console.error('VOID District: Could not save order note.', error);
		return false;
	}
}

function getOrderNote() {
	try {
		return localStorage.getItem(CART_NOTE_KEY) || '';
	} catch (error) {
		console.error('VOID District: Could not read order note.', error);
		return '';
	}
}

console.info('VOID District shared cart system loaded.');

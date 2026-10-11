'use strict';

/* =========================================
   VOID DISTRICT — CART PAGE
========================================= */

const cartItemsContainer = document.getElementById('cartItems');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutButton = document.getElementById('checkoutButton');

/* Format prices in Pakistani Rupees. */
function formatCartPrice(price) {
	return `Rs. ${price.toLocaleString('en-PK')}`;
}

/* Display saved cart products. */
function renderCart() {
	const cart = getCart();

	cartItemsContainer.replaceChildren();

	let totalItems = 0;
	let subtotal = 0;

	if (cart.length === 0) {
		const emptyMessage = document.createElement('div');
		emptyMessage.className = 'cart-empty';

		const heading = document.createElement('h2');
		heading.textContent = 'Your bag is empty.';

		const message = document.createElement('p');
		message.textContent = "You haven't added any pieces to your bag yet.";

		const shopLink = document.createElement('a');
		shopLink.href = './index.html#featured';
		shopLink.textContent = 'Explore the collection';

		emptyMessage.append(heading, message, shopLink);
		cartItemsContainer.appendChild(emptyMessage);
	} else {
		cart.forEach((item) => {
			totalItems += item.quantity;
			subtotal += item.price * item.quantity;

			const article = document.createElement('article');
			article.className = 'cart-item';

			const image = document.createElement('img');
			image.className = 'cart-item-image';
			image.src = item.image || './images/image-placeholder.jpg';
			image.alt = item.name;

			image.addEventListener(
				'error',
				() => {
					image.src = './images/image-placeholder.jpg';
				},
				{ once: true }
			);

			const details = document.createElement('div');
			details.className = 'cart-item-details';

			const name = document.createElement('h3');
			name.textContent = item.name;

			const size = document.createElement('p');
			size.className = 'cart-item-size';
			size.textContent = `Size: ${item.size}`;

			const price = document.createElement('p');
			price.className = 'cart-item-price';
			price.textContent = formatCartPrice(item.price * item.quantity);

			const actions = document.createElement('div');
			actions.className = 'cart-item-actions';

			/* Quantity input */
			const quantity = document.createElement('input');
			quantity.className = 'cart-quantity';
			quantity.type = 'number';
			quantity.min = '1';
			quantity.max = '10';
			quantity.step = '1';
			quantity.value = String(item.quantity);

			quantity.setAttribute('aria-label', `Quantity for ${item.name}, size ${item.size}`);

			/* Update quantity when the value changes */
			quantity.addEventListener('change', () => {
				const newQuantity = Number(quantity.value);

				if (!Number.isInteger(newQuantity) || newQuantity < 1 || newQuantity > 10) {
					renderCart();
					return;
				}

				const result = updateCartQuantity(item.id, item.size, newQuantity);

				if (result.success) {
					renderCart();
				} else {
					console.error(result.message);
					renderCart();
				}
			});

			/* Remove button */
			const removeButton = document.createElement('button');
			removeButton.className = 'cart-remove';
			removeButton.type = 'button';
			removeButton.textContent = 'Remove';

			removeButton.addEventListener('click', () => {
				const result = removeFromCart(item.id, item.size);

				if (result.success) {
					renderCart();
				} else {
					console.error(result.message);
				}
			});

			actions.append(quantity, removeButton);
			details.append(name, size, price, actions);
			article.append(image, details);

			cartItemsContainer.appendChild(article);
		});
	}

	/* Update total quantity and subtotal */
	cartTotalItems.textContent = String(totalItems);
	cartSubtotal.textContent = formatCartPrice(subtotal);
	/* Enable checkout only when the cart has products */
	if (checkoutButton) {
		checkoutButton.disabled = cart.length === 0;
	}

	/* Update the header bag count */
	const bagCountDisplay = document.getElementById('bagCount');

	if (bagCountDisplay) {
		bagCountDisplay.textContent = String(totalItems);
	}

	localStorage.setItem('voidDistrictCartCount', String(totalItems));
}

/* Open checkout when the button is clicked */
if (checkoutButton) {
	checkoutButton.addEventListener('click', () => {
		if (getCart().length === 0) {
			return;
		}

		window.location.href = './checkout.html';
	});
}

/* Render the cart when the page loads */
renderCart();

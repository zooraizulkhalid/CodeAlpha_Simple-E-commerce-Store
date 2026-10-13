
"use strict";

/* =========================================
   VOID DISTRICT — WISHLIST SYSTEM
========================================= */

const WISHLIST_STORAGE_KEY = "voidDistrictWishlist";

/* =========================================
   GET SAVED WISHLIST
========================================= */

function getWishlist() {
  try {
    const savedWishlist = localStorage.getItem(
      WISHLIST_STORAGE_KEY
    );

    if (!savedWishlist) {
      return [];
    }

    const parsedWishlist = JSON.parse(savedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      return [];
    }

    // Remove invalid and duplicate product IDs.
    return [
      ...new Set(
        parsedWishlist.filter(
          (id) => typeof id === "string" && id.trim()
        )
      )
    ];
  } catch (error) {
    console.error("Unable to read wishlist:", error);
    return [];
  }
}

/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist(wishlist) {
  try {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlist)
    );

    // Notify wishlist components on this page.
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          wishlist: [...wishlist],
          count: wishlist.length
        }
      })
    );

    return true;
  } catch (error) {
    console.error("Unable to save wishlist:", error);
    return false;
  }
}

/* =========================================
   CHECK IF PRODUCT IS SAVED
========================================= */

function isInWishlist(productId) {
  return getWishlist().includes(String(productId));
}

/* =========================================
   ADD PRODUCT TO WISHLIST
========================================= */

function addToWishlist(productId) {
  const id = String(productId);

  if (!id || id === "undefined" || id === "null") {
    return false;
  }

  const wishlist = getWishlist();

  if (wishlist.includes(id)) {
    return false;
  }

  wishlist.push(id);

  return saveWishlist(wishlist);
}

/* =========================================
   REMOVE PRODUCT FROM WISHLIST
========================================= */

function removeFromWishlist(productId) {
  const id = String(productId);

  const wishlist = getWishlist();

  if (!wishlist.includes(id)) {
    return false;
  }

  const updatedWishlist = wishlist.filter(
    (savedId) => savedId !== id
  );

  return saveWishlist(updatedWishlist);
}

/* =========================================
   TOGGLE WISHLIST
========================================= */

function toggleWishlist(productId) {
  if (isInWishlist(productId)) {
    return removeFromWishlist(productId);
  }

  return addToWishlist(productId);
}

/* =========================================
   GET WISHLIST COUNT
========================================= */

function getWishlistCount() {
  return getWishlist().length;
}

/* =========================================
   UPDATE NAVBAR HEART COUNTER
========================================= */

function updateWishlistCount() {
  const wishlistCountElements =
    document.querySelectorAll(".wishlist-count");

  const count = getWishlistCount();

  wishlistCountElements.forEach((element) => {
    element.textContent = String(count);

    // Hide the badge when wishlist is empty.
    element.hidden = count === 0;
  });

  const wishlistLinks =
    document.querySelectorAll(".wishlist-nav-link");

  wishlistLinks.forEach((link) => {
    link.setAttribute(
      "aria-label",
      `Wishlist, ${count} saved ${
        count === 1 ? "product" : "products"
      }`
    );
  });
}

/* =========================================
   UPDATE PRODUCT HEART BUTTONS
========================================= */

function updateWishlistButtons() {
  const wishlistButtons =
    document.querySelectorAll("[data-wishlist-id]");

  wishlistButtons.forEach((button) => {
    const productId = button.dataset.wishlistId;

    const isSaved = isInWishlist(productId);

    button.classList.toggle("is-saved", isSaved);

    button.setAttribute(
      "aria-pressed",
      String(isSaved)
    );

    button.setAttribute(
      "aria-label",
      isSaved
        ? "Remove product from wishlist"
        : "Add product to wishlist"
    );
  });
}

/* =========================================
   REFRESH WISHLIST UI
========================================= */

function refreshWishlistUI() {
  updateWishlistCount();
  updateWishlistButtons();
}

/* =========================================
   WISHLIST EVENT LISTENERS
========================================= */

// Update all wishlist elements when changed.
window.addEventListener(
  "wishlistUpdated",
  refreshWishlistUI
);

// Update wishlist when another browser tab changes it.
window.addEventListener("storage", (event) => {
  if (event.key === WISHLIST_STORAGE_KEY) {
    refreshWishlistUI();
  }
});

// Refresh when returning to the page.
window.addEventListener("pageshow", refreshWishlistUI);

/* =========================================
   INITIALIZE WISHLIST
========================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    refreshWishlistUI
  );
} else {
  refreshWishlistUI();
}

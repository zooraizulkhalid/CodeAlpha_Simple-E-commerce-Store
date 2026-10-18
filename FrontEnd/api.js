
"use strict";

/* =========================================
   VOID DISTRICT — PRODUCTS API
========================================= */

const API_BASE_URL = "http://localhost:5000/api";

// Fetch all products from MongoDB through Express
async function fetchProductsFromAPI() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(
      `Failed to load products. HTTP ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error("Invalid products API response.");
  }

  return data.products;
}

// Fetch one product by its existing ID
async function fetchProductById(id) {
  const response = await fetch(
    `${API_BASE_URL}/products/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load product. HTTP ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.success || !data.product) {
    throw new Error("Invalid product API response.");
  }

  return data.product;
}

import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch product categories from commerce.js
  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data);
  };

  // Fetch product data from commerce.js
  const fetchProducts = async () => {
    // Max fetching list of product is 200
    const { data } = await commerce.products.list({ limit: 200 });

    setProducts(data);
  };

  // Fetch shopping cart data from commerce.js
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // Handle product and its quantity when user adding stuff in shopping cart
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  // Handle product and its quantity when user updating shopping cart
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  // Handle removing product from shopping cart
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  // Handle emptying shopping cart
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  // Refreshing shopping cart to new ID that is a new empty cart
  const refreshCart = async () => {
    setCart(await commerce.cart.refresh());
  };

  // Handle shopping cart through the transaction and shipping stage
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
      alert(error.data.error.message);
    }
  };

  // Remove checkout values at beginning of checkout phase
  // UseCallback function to prevent re-running every render
  const handleRemoveError = useCallback(() => {
    setErrorMessage("");
    setOrder({});
  }, []);

  useEffect(() => {
    // Initialize data needed to populate website
    fetchCategories();
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <div style={{ minHeight: "calc(100vh - 140px)" }}>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route
              exact
              path="/"
              element={
                <Products
                  products={products}
                  categories={categories}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              exact
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                  onRemoveError={handleRemoveError}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

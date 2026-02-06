"use client";

import { useMemo, useState } from "react";

const productsData = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 3, name: "Headphones", price: 3000, category: "Accessories" },
  { id: 4, name: "Keyboard", price: 1500, category: "Accessories" },
  { id: 5, name: "Smart Watch", price: 8000, category: "Electronics" },
  { id: 6, name: "Mouse", price: 900, category: "Accessories" },
];

export default function Page() {
  const [sortOption, setSortOption] = useState("default");
  const [cart, setCart] = useState([]);

  const sortedProducts = useMemo(() => {
    const arr = [...productsData];
    arr.sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return arr;
  }, [sortOption]);

  const addToCart = (product) => {
    setCart((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Product Store</h1>
          <p className="subtitle">
            Sort products using dropdown • Responsive cards • Add to cart
          </p>
        </div>

        <div className="cartPill" title="Cart Summary">
          <span className="cartIcon">🛒</span>
          <span className="cartText">Cart</span>
          <span className="badge">{cart.length}</span>
        </div>
      </header>

      <section className="panel">
        <div className="controls">
          <label className="label" htmlFor="sort">
            Sort by:
          </label>

          <select
            id="sort"
            className="dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>

          <div className="summary">
            <span className="summaryLabel">Total:</span>
            <span className="summaryValue">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <main className="grid">
        {sortedProducts.map((p) => {
          const isAdded = cart.some((item) => item.id === p.id);

          return (
            <article className="card" key={p.id}>
              <div className="cardTop">
                <div className="chip">{p.category}</div>
                <h3 className="productName">{p.name}</h3>
              </div>

              <div className="priceRow">
                <span className="price">₹{p.price.toFixed(2)}</span>
              </div>

              <button
                className={`btn ${isAdded ? "btnAdded" : ""}`}
                onClick={() => addToCart(p)}
                disabled={isAdded}
              >
                {isAdded ? "Added ✔" : "Add to Cart"}
              </button>
            </article>
          );
        })}
      </main>
    </div>
  );
}
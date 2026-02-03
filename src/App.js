import { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 3, name: "Headphones", price: 3000, category: "Accessories" },
  { id: 4, name: "Keyboard", price: 1500, category: "Accessories" },
];

function App() {
  const [sortOption, setSortOption] = useState("default");
  const [cart, setCart] = useState([]);

  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Product Store</h1>
        <div className="cart">
          🛒 Cart <span>{cart.length}</span>
        </div>
      </div>

      {/* Sort Dropdown */}
      <select
        className="dropdown"
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">Sort Products</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="name">Name: A–Z</option>
      </select>

      {/* Product Grid */}
      <div className="product-grid">
        {sortedProducts.map((product) => {
          const isAdded = cart.find((item) => item.id === product.id);

          return (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price.toFixed(2)}</p>

              <button
                className={`btn ${isAdded ? "added" : ""}`}
                onClick={() => addToCart(product)}
                disabled={isAdded}
              >
                {isAdded ? "Added ✔" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
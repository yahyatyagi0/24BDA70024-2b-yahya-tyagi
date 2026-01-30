import { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 },
  { id: 4, name: "Keyboard", price: 1500 }
];

function App() {
  const [sortOption, setSortOption] = useState("default");

  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="App">
      <h2>Dynamic Product Filter</h2>

      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="default">Default</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="name">Name: A–Z</option>
      </select>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
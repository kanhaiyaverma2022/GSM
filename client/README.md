import React, { useState } from 'react';

const ProductFilter = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', size: 'M' },
    { id: 2, name: 'Product 2', size: 'L' },
    { id: 3, name: 'Product 3', size: '2XL' },
    { id: 4, name: 'Product 4', size: 'M' },
    { id: 5, name: 'Product 5', size: 'L' },
    { id: 6, name: 'Product 6', size: '2XL' },
    // Add more products here
  ]);

  // Filtered products based on selected sizes
  const filteredProducts = selectedSizes.length === 0 ? products : products.filter(product => selectedSizes.includes(product.size));

  // Function to handle size selection
  const handleSizeChange = (size) => {
    setSelectedSizes(prevSizes =>
      prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]
    );
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            value="M"
            checked={selectedSizes.includes('M')}
            onChange={() => handleSizeChange('M')}
          />
          M
        </label>
        <label>
          <input
            type="checkbox"
            value="L"
            checked={selectedSizes.includes('L')}
            onChange={() => handleSizeChange('L')}
          />
          L
        </label>
        <label>
          <input
            type="checkbox"
            value="2XL"
            checked={selectedSizes.includes('2XL')}
            onChange={() => handleSizeChange('2XL')}
          />
          2XL
        </label>
      </div>

      <div>
        <h2>Filtered Products</h2>
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>{product.name} - {product.size}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFilter;
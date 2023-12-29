import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const productsData = [
    {
      EAN: '123456789',
      nombre_producto: 'Producto A',
      datos_de_query: ['Dato 1', 'Dato 2'],
      cantidad_de_markets_diferentes: 3,
      rango_de_precios: '20 - 15',
    },
    {
      EAN: '987654321',
      nombre_producto: 'Producto B',
      datos_de_query: ['Dato 3', 'Dato 4'],
      cantidad_de_markets_diferentes: 2,
      rango_de_precios: '30 - 25',
    },
    {
      EAN: '456789123',
      nombre_producto: 'Producto C',
      datos_de_query: ['Dato 5', 'Dato 6'],
      cantidad_de_markets_diferentes: 4,
      rango_de_precios: '18 - 12',
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState([...productsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredProducts.length > 0) {
        setFilteredProducts((prevProducts) => prevProducts.slice(0, -1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [filteredProducts]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filtered = productsData.filter((product) =>
      product.nombre_producto.toLowerCase().includes(filterValue)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        onChange={handleFilterChange}
      />
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <h3>{product.nombre_producto}</h3>
          <p>Rango de precios: {product.rango_de_precios}</p>
          <p>Mercados diferentes: {product.cantidad_de_markets_diferentes}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;


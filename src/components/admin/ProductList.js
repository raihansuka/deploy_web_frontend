import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import './ProductList.css';

const ProductList = ({ onUpdateProduct, onDeleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleEditProduct = () => {
    onUpdateProduct(selectedProduct);
    setIsModalOpen(false);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        onDeleteProduct(productId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="product-list-container">
      <div>
        <h2>Product List</h2>
        <button className="refresh-button" onClick={fetchProducts}>Refresh Products</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              <div className="product-grid">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`product-item ${index >= 5 ? 'second-row' : ''}`}
                  >
                    <img
                      src={'http://localhost:3001/img/' + product.image}
                      alt="Product Image"
                      className="product-image"
                    />
                    <div className="product-details">
                      <strong className="product-name">{product.name}</strong>
                      <span className="product-price">{product.price}</span>
                      <p className="product-description">{product.description}</p>
                      <div className="product-stock">Stock: {product.stock}</div>
                      <button className="update-button" onClick={() => handleUpdate(product)}>Update</button>
                      <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Modal isOpen={isModalOpen}>
        <div className="modal-container">
          <h2>Edit Product</h2>
          {selectedProduct && (
            <>
              <label htmlFor="name">Name Items</label>
              <input
                type="text"
                id="name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value
                  })
                }
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value
                  })
                }
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value
                  })
                }
              />
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: e.target.value
                  })
                }
              />
              <button className="save-button" onClick={handleEditProduct}>Save</button>
              <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import api from '../../services/api';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (
      product.name === '' ||
      product.price === '' ||
      product.description === '' ||
      product.stock === '' ||
      product.image === ''
    ) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    try {
      const formData = new FormData();
      formData.append('image', product.image);
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('stock', product.stock);

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the response contains the newly created product
      const newProduct = response.data;

      // Call the callback function passed from the parent component
      onAddProduct(newProduct);

      // Reset the form fields
      setProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: '',
      });
    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Nama Produk</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Harga</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Deskripsi</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;

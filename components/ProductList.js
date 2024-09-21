"use client";

import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Link from "next/link";

export default function ProductList({ products }) {
  const [productList, setProductList] = useState(products);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
    });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProductList(productList.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...currentProduct,
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        thumbnail: formData.image,
      };
      await axios.put(
        `http://localhost:3000/products/${currentProduct.id}`,
        updatedProduct
      );
      setProductList(
        productList.map((product) =>
          product.id === currentProduct.id ? updatedProduct : product
        )
      );
      setIsEditModalOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        thumbnail: formData.image,
      };
      const res = await axios.post(
        "http://localhost:3000/products",
        newProduct
      );
      setProductList([...productList, res.data]);
      setIsCreateModalOpen(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create the product. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={handleCreate}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create Product
      </button>

      {productList.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded p-4 flex flex-col"
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <div className="mt-auto flex space-x-2">
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-center"
                >
                  View
                </Link>

                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditModalOpen && currentProduct && (
        <Modal onRequestClose={() => setIsEditModalOpen(false)}>
          <h3 className="text-2xl font-semibold mb-4">Edit Product</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border p-2 rounded w-full"
              required
            ></textarea>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border p-2 rounded w-full"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isCreateModalOpen && (
        <Modal onRequestClose={() => setIsCreateModalOpen(false)}>
          <h3 className="text-2xl font-semibold mb-4">Create New Product</h3>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border p-2 rounded w-full"
              required
            ></textarea>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border p-2 rounded w-full"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

"use client";
// pages/categories.js
import React, { useState } from 'react';

const CategoriesPage = () => {
  // Dummy data
  const initialCategories = [
    { id: 1, name: 'Personal Development' },
    { id: 2, name: 'Health & Fitness Courses' },
    { id: 3, name: 'Network & Security Course' },
    { id: 4, name: 'Lifestyle course' },
    { id: 5, name: 'UPGRADE SKILL' },
    { id: 6, name: 'Business Marketing' }
  ];

  // State management
  const [categories, setCategories] = useState(initialCategories);
  const [editCategory, setEditCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: ''
  });

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD operations
  const addCategory = () => {
    if (editCategory) {
      // Update existing category
      const updatedCategories = categories.map(category =>
        category.id === editCategory.id ? { ...category, name: newCategory.name } : category
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const category = {
        id: categories.length + 1,
        name: newCategory.name
      };
      setCategories([...categories, category]);
    }
    setNewCategory({ name: '' });
    setEditCategory(null);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const editCategoryHandler = (category) => {
    setEditCategory(category);
    setNewCategory({ name: category.name });
  };

  return (
    <div className="main-container">
      <div className="form-section">
        <h1 style={{fontSize:'20px'}}>Add Category</h1>
        <br />
        <form onSubmit={(e) => { e.preventDefault(); addCategory(); }}>
          <div className="form-group">
            <label>Category Name:</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editCategory ? 'Update' : 'Save'}
            </button>
            {editCategory && (
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setNewCategory({ name: '' });
                  setEditCategory(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="list-section">
        <h1>Category List</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="category-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button 
                    className="edit-button"
                    onClick={() => editCategoryHandler(category)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="record-count">
          Records: 1 to {filteredCategories.length} of {filteredCategories.length}
        </div>
      </div>
    </div>
  );
};

// CSS styles
const styles = `
  .main-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    gap: 30px;
  }

  .form-section {
    flex: 1;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: fit-content;
  }

  .list-section {
    flex: 2;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-bar {
    margin-bottom: 20px;
  }

  .search-bar input {
    width: 100%;
    max-width: 300px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .category-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .category-table th, .category-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .category-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .edit-button, .delete-button {
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-button {
    background-color: #2196F3;
    color: white;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  .record-count {
    color: #777;
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .submit-button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-button {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default CategoriesPage;
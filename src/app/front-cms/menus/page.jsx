"use client";
import { useState } from 'react';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';

export default function MenuManagement() {
  // Dummy data
  const initialMenus = [
    { id: 1, title: 'Main Menu', description: 'Primary navigation menu' },
    { id: 2, title: 'Bottom Menu', description: 'Footer navigation menu' },
    { id: 3, title: 'Sidebar Menu', description: 'Secondary navigation menu' },
  ];

  const initialMenuItems = [
    { id: 1, title: 'HOME', active: false, menuId: 1, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 2, title: 'ONLINE COURSE', active: true, menuId: 1, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 3, title: 'ONLINE ADMISSION', active: true, menuId: 1, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 4, title: 'CBSE EXAM RESULT', active: true, menuId: 2, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 5, title: 'EXAM RESULT', active: true, menuId: 2, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 6, title: 'ANNUAL CALENDAR', active: true, menuId: 2, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 7, title: 'ABOUT US', active: true, menuId: 3, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 8, title: 'ACADEMICS', active: true, menuId: 3, isExternal: false, externalUrl: '', openInNewTab: false },
    { id: 9, title: 'FACILITIES', active: true, menuId: 3, isExternal: false, externalUrl: '', openInNewTab: false },
  ];

  const pages = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About Us', path: '/about' },
    { id: 3, title: 'Courses', path: '/courses' },
    { id: 4, title: 'Admissions', path: '/admissions' },
    { id: 5, title: 'Contact', path: '/contact' },
    { id: 6, title: 'Gallery', path: '/gallery' },
    { id: 7, title: 'Events', path: '/events' },
  ];

  // State
  const [menus, setMenus] = useState(initialMenus);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showAddMenu, setShowAddMenu] = useState(true);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    menuName: '',
    menuDescription: '',
    menuItemTitle: '',
    isExternal: false,
    externalUrl: '',
    openInNewTab: false,
    selectedPage: ''
  });

  // Handlers
  const handleAddMenuItem = (menuId) => {
    setSelectedMenuId(menuId);
    setShowAddMenu(false);
    setShowAddMenuItem(true);
    setEditingItem(null);
    resetForm();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddMenu(false);
    setShowAddMenuItem(true);
    setFormData({
      ...formData,
      menuItemTitle: item.title,
      isExternal: item.isExternal,
      externalUrl: item.externalUrl,
      openInNewTab: item.openInNewTab,
      selectedPage: item.isExternal ? '' : item.title
    });
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleSaveMenuItem = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      const updatedItems = menuItems.map(item => 
        item.id === editingItem.id ? {
          ...item,
          title: formData.isExternal ? formData.externalUrl : formData.selectedPage,
          isExternal: formData.isExternal,
          externalUrl: formData.externalUrl,
          openInNewTab: formData.openInNewTab
        } : item
      );
      setMenuItems(updatedItems);
    } else {
      // Add new item
      const newItem = {
        id: menuItems.length + 1,
        title: formData.isExternal ? formData.externalUrl : formData.selectedPage,
        active: true,
        menuId: selectedMenuId,
        isExternal: formData.isExternal,
        externalUrl: formData.externalUrl,
        openInNewTab: formData.openInNewTab
      };
      setMenuItems([...menuItems, newItem]);
    }
    
    resetForm();
    setShowAddMenuItem(false);
    setShowAddMenu(true);
  };

  const toggleMenuItem = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  const resetForm = () => {
    setFormData({
      menuName: '',
      menuDescription: '',
      menuItemTitle: '',
      isExternal: false,
      externalUrl: '',
      openInNewTab: false,
      selectedPage: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Menu Management</h1>
        
        {showAddMenu && (
          <div className="flex gap-6">
            {/* Add Menu Form */}
            <div className="w-1/2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add Menu</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Menu *</label>
                  <input
                    type="text"
                    name="menuName"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.menuName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="menuDescription"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    value={formData.menuDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </form>
            </div>

            {/* Menu List */}
            <div className="w-1/2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Menu List</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">Title</th>
                    <th className="p-2 text-left border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map(menu => (
                    <tr key={menu.id} className="border">
                      <td className="p-2 border">{menu.title}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleAddMenuItem(menu.id)}
                          className="text-blue-600 hover:text-blue-800 text-xl font-bold"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showAddMenuItem && (
          <div className="flex gap-6">
            {/* Add Menu Item Form */}
            <div className="w-1/2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <form onSubmit={handleSaveMenuItem}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Menu Item *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.isExternal ? formData.externalUrl : formData.selectedPage}
                    readOnly
                  />
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isExternal"
                      checked={formData.isExternal}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label>External URL</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="openInNewTab"
                      checked={formData.openInNewTab}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label>Open In New Tab</label>
                  </div>

                  {formData.isExternal && (
                    <div className="ml-6">
                      <input
                        type="text"
                        name="externalUrl"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="External URL Address"
                        value={formData.externalUrl}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {!formData.isExternal && (
                    <>
                      <h3 className="font-medium text-gray-700">Pages</h3>
                      <select
                        name="selectedPage"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.selectedPage}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select</option>
                        {pages.map(page => (
                          <option key={page.id} value={page.title}>{page.title}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddMenuItem(false);
                      setShowAddMenu(true);
                      resetForm();
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Menu Item List */}
            <div className="w-1/2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Menu Item List</h2>
              <div className="space-y-3">
                {menuItems
                  .filter(item => item.menuId === selectedMenuId)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={() => toggleMenuItem(item.id)}
                          className="mr-3 h-4 w-4"
                        />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                                                                     <FiEdit2 size={16} />

                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                                                                         <FiX size={16} />

                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
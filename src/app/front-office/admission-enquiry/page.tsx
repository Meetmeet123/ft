'use client';
import React, { useState, useEffect, useRef } from 'react';
import TomSelect from 'tom-select';
import ReactQuill from 'react-quill';

export default function AdmissionEnquiryForm() {
  const [formData, setFormData] = useState({
    productName: '',
    categories: ['1', '3'],
    quantity: '',
    weight: '',
    unitPrice: '',
    wholesalePrice: '',
    bulkPrice: '',
    isActive: false,
    description: '<p>Content of the editor.</p>',
  });

  const selectRef = useRef<HTMLSelectElement>(null); // Ref to the select element
  const tomSelectInstance = useRef<TomSelect | null>(null); // Ref to store the TomSelect instance

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  useEffect(() => {
    if (selectRef.current && !tomSelectInstance.current) {
      tomSelectInstance.current = new TomSelect(selectRef.current, {
        create: false,
        valueField: 'value',
        labelField: 'text',
        options: [
          { value: '1', text: 'Sport & Outdoor' },
          { value: '2', text: 'PC & Laptop' },
          { value: '3', text: 'Smartphone & Tablet' },
          { value: '4', text: 'Photography' },
        ],
      });
    }

    // Cleanup on unmount
    return () => {
      if (tomSelectInstance.current) {
        tomSelectInstance.current.destroy();
        tomSelectInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="crud-form-1" className="form-label">
              Product Name
            </label>
            <input
              id="crud-form-1"
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="form-control w-full border p-2 rounded"
              placeholder="Input text"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="crud-form-2" className="form-label">
              Category
            </label>
            <select
              id="crud-form-2"
              ref={selectRef} // Attach the ref to the select element
              className="tom-select w-full border p-2 rounded"
              multiple
              defaultValue={formData.categories}
            >
              <option value="1">Sport & Outdoor</option>
              <option value="2">PC & Laptop</option>
              <option value="3">Smartphone & Tablet</option>
              <option value="4">Photography</option>
            </select>
          </div>

          <div className="mt-3">
            <label htmlFor="crud-form-3" className="form-label">
              Quantity
            </label>
            <div className="input-group flex items-center">
              <input
                id="crud-form-3"
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control border p-2 rounded"
                placeholder="Quantity"
                aria-describedby="input-group-1"
              />
              <div id="input-group-1" className="input-group-text bg-gray-100 p-2">
                pcs
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="crud-form-4" className="form-label">
              Weight
            </label>
            <div className="input-group flex items-center">
              <input
                id="crud-form-4"
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="form-control border p-2 rounded"
                placeholder="Weight"
                aria-describedby="input-group-2"
              />
              <div id="input-group-2" className="input-group-text bg-gray-100 p-2">
                grams
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Price</label>
            <div className="sm:grid grid-cols-3 gap-2">
              <div className="input-group flex items-center">
                <div id="input-group-3" className="input-group-text bg-gray-100 p-2">
                  Unit
                </div>
                <input
                  type="text"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  className="form-control border p-2 rounded"
                  placeholder="Unit"
                  aria-describedby="input-group-3"
                />
              </div>
              <div className="input-group flex items-center mt-2 sm:mt-0">
                <div id="input-group-4" className="input-group-text bg-gray-100 p-2">
                  Wholesale
                </div>
                <input
                  type="text"
                  name="wholesalePrice"
                  value={formData.wholesalePrice}
                  onChange={handleChange}
                  className="form-control border p-2 rounded"
                  placeholder="Wholesale"
                  aria-describedby="input-group-4"
                />
              </div>
              <div className="input-group flex items-center mt-2 sm:mt-0">
                <div id="input-group-5" className="input-group-text bg-gray-100 p-2">
                  Bulk
                </div>
                <input
                  type="text"
                  name="bulkPrice"
                  value={formData.bulkPrice}
                  onChange={handleChange}
                  className="form-control border p-2 rounded"
                  placeholder="Bulk"
                  aria-describedby="input-group-5"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Active Status</label>
            <div className="form-switch mt-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="form-check-input"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Description</label>
            <div className="mt-2">
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                className="editor"
              />
            </div>
          </div>

          <div className="text-right mt-5">
            <button
              type="button"
              className="btn btn-outline-secondary w-24 mr-1 bg-gray-200 text-gray-700 border p-2 rounded"
              onClick={() => console.log('Cancel clicked')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-24 bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
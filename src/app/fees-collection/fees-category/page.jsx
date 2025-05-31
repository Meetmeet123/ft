"use client"
import React, { useState } from 'react';
import { Pencil, X } from "lucide-react";

const FeeCategoryManager = () => {
  const [name, setName] = useState("");
  const [casteCategory, setCasteCategory] = useState("");
  const [save, setSave] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: "GOI", casteCategory: ["General"] },
  ]);

  const castType = ["General", "OBC", "SC", "ST", "SBC", "VJNT", "NT-B", "NT-C", "NT-D"];
  const [showCastArr, setShowCastArr] = useState([]);
  const [showCastSection, setShowCasteSection] = useState(false);

  const handleAdd = () => {
    setSave(true);
    if (!name || showCastArr.length === 0) return;

    const newItem = {
      id: Date.now(),
      name,
      casteCategory: showCastArr,
    };

    setCategories([...categories, newItem]);
    setName("");
    setCasteCategory("");
    setShowCastArr([]);
    setShowCasteSection(false);
    setSave(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleReset = () => {
    setName("");
    setCasteCategory("");
    setShowCastArr([]);
    setShowCasteSection(false);
    setSave(false);
  };

  return (
    <div className="lg:flex md:block gap-4 p-4">
      {/* Left Section */}
      <div className="lg:w-1/3 md:w-full bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Add Fee Category</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Name<span className="text-red-600">*</span></label>
          <input
            className="border w-full px-3 py-1 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {(save && name === "") && <p className="text-red-600">Fill this Name<span>*</span></p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category<span className="text-red-600">*</span>
          </label>

          {/* Selection Box */}
          <div className="w-full flex justify-between items-center border rounded px-3 py-2 bg-white shadow-sm">
            <div className="flex flex-wrap gap-2">
              {showCastArr.map((caste, index) => (
                <span key={index} className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
                  {caste}
                  <button type="button" className="text-gray-500 hover:text-red-500">
                    <X onClick={() => setShowCastArr(showCastArr.filter((_, i) => i !== index))} size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div onClick={() => setShowCasteSection(!showCastSection)} className="text-gray-500 cursor-pointer">
              {showCastSection ? '▲' : '▼'}
            </div>
          </div>

          {/* Dropdown Options */}
          {showCastSection && (
            <div className="w-full border mt-1 rounded bg-white shadow-md z-10">
              {castType.map((castType, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!showCastArr.includes(castType)) setShowCastArr([...showCastArr, castType]);
                  }}
                  className={!showCastArr.includes(castType) ? "w-full py-2 px-4 hover:bg-gray-100 cursor-pointer text-sm" : ""}
                >
                  {!showCastArr.includes(castType) && castType}
                </div>
              ))}
            </div>
          )}

          {/* Validation */}
          {save && showCastArr.length === 0 && (
            <p className="text-red-600 text-sm mt-1">Fill Category<span>*</span></p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-100 px-4 py-1 rounded border"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="btn-primary bg-gray-700 text-white px-4 py-1 rounded"
            onClick={handleAdd}
          >
            Save
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 md:full bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Fees Category List</h2>
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Category</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{cat.name}</td>
                <td className="p-2">
                  {cat.casteCategory.map((tempCast, i) => (
                    <span key={i} className="inline-block bg-gray-100 px-2 py-1 rounded text-sm mr-1">{tempCast}</span>
                  ))}
                </td>
                <td className="p-2 flex items-center gap-2">
                  <Pencil className="w-4 h-4 cursor-pointer" />
                  <X
                    className="w-4 h-4 cursor-pointer text-red-500"
                    onClick={() => handleDelete(cat.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeCategoryManager;

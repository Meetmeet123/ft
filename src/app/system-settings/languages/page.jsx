"use client";
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { getLanguage, deleteLanguages, addNewData } from "./languageDetails";

export default function LanguageList() {
  const [languages, setLanguages] = useState([]);
  const [addLanguages, setAddLanguages] = useState({ language: '', short_code: '', country_code: '' })
  const [addLanguagesToggle, setAddLanguagesToggle] = useState(false);

  const fetchData = async () => {
      try {
        const res = await getLanguage();
        console.log(res.data)
        setLanguages(res?.data || []);
      } catch (err) {
        console.log("Fetch error:", err);
        setLanguages([]); // fallback to empty array
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleActive = (id) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.id === id ? { ...lang, is_active: lang.is_active === "yes" ? "no" : "yes" } : lang
      )
    );
  };

  const toggleAction = (id) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.id === id ? { ...lang, action: !lang.action } : lang
      )
    );
  };

  const updateField = (id, value, field) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const deleteData = async (id) => {
    const res = await deleteLanguages(id);
    console.log(res);
    setLanguages(languages.filter(lang => lang.id !== id))
  }

  const AddNewData = async() => {
    const res = await addNewData(addLanguages);
    console.log(res);
    setAddLanguagesToggle(false)
    fetchData();
  }

  const handleNewDataChanges = (e) => {
    const temp = {...addLanguages, [e.target.name]:e.target.value}
    setAddLanguages(temp)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Language List</h1>
          {!addLanguagesToggle && <button
            onClick={() => setAddLanguagesToggle(true)}
            className="btn btn-primary flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm">
            <Plus size={16} />
            Add
          </button>}
          {addLanguagesToggle && <button
            onClick={() => setAddLanguagesToggle(false)}
            className="btn btn-primary flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm">
            <X size={16} />
          </button>}
        </div>

        {/* Alert/Info Box */}
        <div className="p-4 bg-yellow-50 border-b border-yellow-100 text-yellow-800 text-sm sm:text-base overflow-x-auto">
          <p>
            To change language key phrases, go to your language directory e.g. for English language go edit file
            <code className="text-xs break-all block sm:inline">
              {" "}
              /application/language/English/app_files/system_lang.php
            </code>
          </p>
        </div>

        {addLanguagesToggle &&
          <div className=" border border-gray-300 rounded-md shadow-sm p-6 bg-white">
            <div className="flex justify-evenly my-6" >
            <div className="flex flex-col w-1/3 px-2">
              <label className="mb-2 font-semibold text-gray-700">Languages</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                name='language'
                onChange={handleNewDataChanges}
              />
            </div>
            <div className="flex flex-col w-1/3 px-2">
              <label className="mb-2 font-semibold text-gray-700">Short Code</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                name="short_code"
                onChange={handleNewDataChanges}
              />
            </div>
            <div className="flex flex-col w-1/3 px-2">
              <label className="mb-2 font-semibold text-gray-700">Country Code</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                name="country_code"
                onChange={handleNewDataChanges}
              />
            </div>
          </div>
          <div className="flex justify-end" >
            <button className="btn btn-primary" onClick={AddNewData} >Save</button>
          </div>
          </div>
        }

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[768px] w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["#", "Language", "Short Code", "Country Code", "Status", "Active", "Action"].map((heading, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(languages) &&
                languages.map((language) => (
                  <tr key={language.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{language.id}.</td>
                    <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
                      {/* {language.language} */}
                      <input
                        type="text"
                        value={language?.language || ""}
                        onChange={(e) => updateField(language.id, e.target.value, 'language')}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
                      {/* {language.short_code} */}
                      <input
                        type="text"
                        value={language?.short_code || ""}
                        onChange={(e) => updateField(language.id, e.target.value, 'short_code')}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-700 whitespace-nowrap min-w-[120px]">
                      <input
                        type="text"
                        value={language?.country_code || ""}
                        onChange={(e) => updateField(language.id, e.target.value, 'country_code')}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-center text-gray-700 whitespace-nowrap">
                      {language.is_deleted !== "yes" && (
                        <span className="text-white bg-red-500 px-2 py-1 rounded text-xs">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <input
                        type="radio"
                        checked={language?.is_active === "yes"}
                        onChange={() => toggleActive(language.id)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap min-w-[100px]">
                      <button
                        onClick={() => toggleAction(language.id)}
                        className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="sr-only">Toggle action state</span>
                        <span
                          className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${language.action ? "bg-green-600" : "bg-gray-300"
                            }`}
                        />
                        <span
                          className="absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out"
                          style={{
                            left: "2px",
                            transform: language.action ? "translateX(20px)" : "translateX(0)",
                          }}
                        />
                      </button>
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap relative">
                      <X
                        size={18}
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                        onClick={() => {
                          const confirmDelete = window.confirm("Are you sure you want to delete this item?");
                          if (confirmDelete) {
                            deleteData(language.id);
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end my-4" >
        <button className="btn btn-primary" >Save</button>
      </div>
    </div>
  );
}

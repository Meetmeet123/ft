"use client";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { language } from './languageDetails';

export default function LanguageList() {
  const [languages, setLanguages] = useState(language);

  const toggleActive = (id) => {
    setLanguages(languages.map((lang) =>
      lang.id === id ? { ...lang, active: !lang.active } : lang
    ));
  };

  const toggleAction = (id) => {
    setLanguages(languages.map((lang) =>
      lang.id === id ? { ...lang, action: !lang.action } : lang
    ));
  };

  const toggleStatus = (id) => {
    setLanguages(languages.map((lang) =>
      lang.id === id ? { ...lang, status: !lang.status } : lang
    ));
  };

  const toggleRtl = (id) => {
    setLanguages(languages.map((lang) =>
      lang.id === id ? { ...lang, isRtl: !lang.isRtl } : lang
    ));
  };

  const updateCountryCode = (id, value) => {
    setLanguages(languages.map((lang) =>
      lang.id === id ? { ...lang, countryCode: value } : lang
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Language List</h1>
          <button className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm">
            <Plus size={16} />
            Add
          </button>
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

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[768px] w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["#", "Language", "Short Code", "Country Code", "Status", "Active", "Is Rtl", "Action"].map((heading, i) => (
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
              {languages.map((language) => (
                <tr key={language.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{language.id}.</td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{language.name}</td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{language.shortCode}</td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap min-w-[120px]">
                    <input
                      type="text"
                      value={language.countryCode}
                      onChange={(e) => updateCountryCode(language.id, e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 text-center text-gray-700 whitespace-nowrap">
                    {language.status && (
                      <span className="text-white bg-red-500 px-2 py-1 rounded text-xs">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <input
                      type="radio"
                      checked={language.active}
                      onChange={() => toggleActive(language.id)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={language.isRtl}
                      onChange={() => toggleRtl(language.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap min-w-[100px]">
                    <button
                      onClick={() => toggleAction(language.id)}
                      className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Toggle action state</span>
                      <span
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${
                          language.action ? "bg-green-600" : "bg-gray-300"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

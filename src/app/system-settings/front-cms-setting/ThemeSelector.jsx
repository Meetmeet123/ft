"use client";
import { useState } from "react";
import Image from "next/image";

import img from "./assets/theme_default.jpg";
import img2 from "./assets/theme_yellow.jpg";
import img3 from "./assets/theme_darkgray.jpg";
import img4 from "./assets/theme_bold_blue.jpg";
import img5 from "./assets/theme_shadow_white.jpg";
import img6 from "./assets/theme_material_pink.jpg";

const images = [img, img2, img3, img4, img5, img6];

const themes = [
  { id: "default", label: "default" },
  { id: "yellow", label: "yellow" },
  { id: "darkgray", label: "darkgray" },
  { id: "bold_blue", label: "bold_blue" },
  { id: "shadow_white", label: "shadow_white" },
  { id: "material_pink", label: "material_pink" },
];

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("material_pink");

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleSave = () => {
    console.log("Theme saved:", selectedTheme);
    // Add API call or logic to persist theme here
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Theme</h2>

      <div className="flex sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {themes.map((theme, index) => (
          <div
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`border rounded shadow hover:shadow-lg cursor-pointer transition-all overflow-hidden ${
              selectedTheme === theme.id ? "ring-4 ring-green-500" : ""
            }`}
          >
            <Image
              src={images[index]}
              alt={theme.label}
              className="w-full h-auto object-cover"
              placeholder="blur"
            />
            <div
              className={`text-center py-2 text-sm font-medium capitalize ${
                selectedTheme === theme.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {theme.label.replace("_", " ")}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center sm:justify-end">
        <button
          onClick={handleSave}
          className="btn btn-primary px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}

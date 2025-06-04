"use client";
import { useState } from "react";
import Image from "next/image";

const images: string[] = [
  "/theme_default.jpg",
  "/theme_yellow.jpg",
  "/theme_darkgray.jpg",
  "/theme_bold_blue.jpg",
  "/theme_shadow_white.jpg",
  "/theme_material_pink.jpg",
];

interface Theme {
  id: string;
  label: string;
}

const themes: Theme[] = [
  { id: "default", label: "default" },
  { id: "yellow", label: "yellow" },
  { id: "darkgray", label: "darkgray" },
  { id: "bold_blue", label: "bold_blue" },
  { id: "shadow_white", label: "shadow_white" },
  { id: "material_pink", label: "material_pink" },
];

interface ThemeSelectorProps {
  handleThemeChange: (themeId: string) => void;
  currentTheme: string;
}

export default function ThemeSelector({ handleThemeChange, currentTheme }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme);

  const handleTheme = (themeId: string): void => {
    setSelectedTheme(themeId);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Theme</h2>

      <div className="flex flex-wrap gap-4">
        {themes.map((theme: Theme, index: number) => (
          <div
            key={theme.id}
            onClick={() => {
              handleTheme(theme.id);
              handleThemeChange(theme.id);
            }}
            className={`border rounded shadow hover:shadow-lg cursor-pointer transition-all overflow-hidden w-40 ${selectedTheme === theme.id ? "ring-4 ring-green-500" : ""
              }`}
          >
            <div className="w-full">
              <Image
                src={images[index]}
                alt="My Photo"
                width={300}
                height={200}
              />
            </div>
            <div
              className={`text-center py-2 text-sm font-medium ${currentTheme === theme.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300"
                }`}
            >
              {theme.label.replace("_", " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
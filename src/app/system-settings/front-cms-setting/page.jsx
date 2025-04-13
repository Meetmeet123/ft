"use client";
import { useState, useCallback } from "react";
import ThemeSelector from "./ThemeSelector";

const FileUpload = ({ label, onFileSelect }) => {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 rounded-lg p-5 text-center cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          id={label}
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor={label} className="block">
          <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
        </label>
      </div>
    </div>
  );
};

const SimpleFrontCMSSettings = () => {
  const [settings, setSettings] = useState({
    frontCMS: true,
    sidebar: false,
    languageRTL: false,
    sidebarOptions: {
      news: true,
      complain: true,
    },
    language: "English",
    logoUrl: "",
    faviconUrl: "",
    footerText: "© Mount Carmel School 2023 All rights reserved",
    cookieConsent: "",
    googleAnalyticsCode: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'GA_TRACKING_ID');\n</script>`,
    socialLinks: {
      whatsapp: "https://www.whatsapp.com/a",
      facebook: "https://www.facebook.com/a",
      twitter: "https://twitter.com/a",
      youtube: "https://www.youtube.com/a",
      googlePlus: "https://plus.google.com/a",
      linkedin: "https://www.linkedin.com/a",
      instagram: "https://www.instagram.com/a",
      pinterest: "https://in.pinterest.com/a",
    },
  });

  const toggleField = (field) =>
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));

  const toggleSidebarOption = (key) =>
    setSettings((prev) => ({
      ...prev,
      sidebarOptions: {
        ...prev.sidebarOptions,
        [key]: !prev.sidebarOptions[key],
      },
    }));

  const updateField = (field, value) =>
    setSettings((prev) => ({ ...prev, [field]: value }));

  const updateSocialLink = (platform, value) =>
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));

  const handleFileSelect = (field, file) => {
    const url = URL.createObjectURL(file);
    setSettings((prev) => ({ ...prev, [field]: url }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-6">Front CMS Settings</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="space-y-6 w-full lg:w-1/2">
          {["frontCMS", "sidebar", "languageRTL"].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <span className="capitalize font-medium text-gray-700">
                {field.replace(/([A-Z])/g, " $1")}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  id={`toggle-${field}`}
                  checked={settings[field]}
                  onChange={() => toggleField(field)}
                  className="hidden"
                />
                <div onClick={() => toggleField(field)} className="cursor-pointer">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                      settings[field] ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings[field] ? "left-5" : "left-0.5"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {/* Sidebar Options */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Sidebar Options
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(settings.sidebarOptions).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-gray-700 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => toggleSidebarOption(key)}
                    className="accent-blue-600"
                  />
                  {key}
                </label>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateField("language", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {["English", "Spanish", "French", "German"].map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* File Uploads */}
          <FileUpload
            label="Logo (369px X 76px)"
            onFileSelect={(file) => handleFileSelect("logoUrl", file)}
          />
          <FileUpload
            label="Favicon (32px X 32px)"
            onFileSelect={(file) => handleFileSelect("faviconUrl", file)}
          />

          {/* Text Inputs */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Footer Text
            </label>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => updateField("footerText", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Textareas */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Cookie Consent
            </label>
            <textarea
              value={settings.cookieConsent}
              onChange={(e) => updateField("cookieConsent", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Google Analytics Code
            </label>
            <textarea
              value={settings.googleAnalyticsCode}
              onChange={(e) => updateField("googleAnalyticsCode", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-28 font-mono text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 w-full lg:w-1/2">
          {Object.entries(settings.socialLinks).map(([platform, url]) => (
            <div key={platform}>
              <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                {platform} URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => updateSocialLink(platform, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ThemeSelector />
      </div>
    </div>
  );
};

export default SimpleFrontCMSSettings;

"use client";
import { useState, useCallback, useEffect } from "react";
import ThemeSelector from "./ThemeSelector";
import { getFrontCMSSettingDetails, postFrontCMS } from "./FrontCMSDetails";

const FileUpload = ({ label, onFileSelect, logoUrl }) => {
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
        <img src={logoUrl} />
        <label htmlFor={label} className="block w-full h-full cursor-pointer border p-10 rounded-lg">
          <p className="text-sm text-gray-500">Select image to upload</p>
        </label>
      </div>
    </div>
  );
};

const SimpleFrontCMSSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
  const fetchSettings = async () => {
    try {
      const response = await getFrontCMSSettingDetails();
      const settingsData = response?.data?.[0] || {};
      console.log(response.data)
      const defaultSettings = {
        id:settingsData.id,
        theme:settingsData.theme,
        frontCMS: settingsData?.is_active_front_cms === 1,
        sidebar: settingsData?.is_active_sidebar === 1,
        languageRTL: settingsData?.is_active_language_rtl === 1,
        sidebarOptions: {
          news: true,
          complain: true,
        },
        language: "English",
        logo: settingsData?.logo,
        faviconUrl: settingsData.fav_icon,
        footerText: settingsData?.footer_text,
        cookieConsent: settingsData?.cookie_consent,
        googleAnalyticsCode:
          settingsData.google_analytics,
        socialLinks: {
          whatsapp: settingsData.whatsapp_url,
          facebook: settingsData.fb_url,
          twitter: settingsData.twitter_url,
          youtube: settingsData.youtube_url,
          googlePlus: settingsData.google_plus,
          linkedin: settingsData.linkedin_url,
          instagram: settingsData.instagram_url,
          pinterest: settingsData.pinterest_url,
        },
      };
      // console.log(defaultSettings)
      setSettings(defaultSettings);
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  fetchSettings();
}, []);

  if (!settings) return <div className="p-4">Loading...</div>;

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

  const handleThemeChange = (newTheme) => {
    const temp = {...settings, theme : newTheme}
    setSettings(temp);
  }

  const handleSave = async() => {
    const data = {id: settings.id, theme: settings.theme, is_active_front_cms: settings.frontCMS ? 1 : 0}
    const res = await postFrontCMS(data)
    console.log(res)
  }

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
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${settings[field] ? "bg-green-500" : "bg-gray-300"
                      }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${settings[field] ? "left-5" : "left-0.5"
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
            logoUrl={settings.logo}
          />
          <FileUpload
            label="Favicon (32px X 32px)"
            onFileSelect={(file) => handleFileSelect("faviconUrl", file)}
            logoUrl={settings.fav_icon}
          />

          {/* Footer Text */}
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

          {/* Cookie Consent */}
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

          {/* Google Analytics Code */}
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
          {Object.entries(settings.socialLinks).map(([platform, url], index) => (
            <div key={index}>
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
        <ThemeSelector handleThemeChange={handleThemeChange} currentTheme={settings.theme} />
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
};

export default SimpleFrontCMSSettings;

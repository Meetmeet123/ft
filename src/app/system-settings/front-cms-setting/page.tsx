"use client";
import { useCallback, useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";
import { getFrontCMSSettingDetails, postFrontCMS } from "./FrontCMSDetails";
import { toast, ToastContainer } from "react-toastify";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
  logoUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect, logoUrl }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <img src={logoUrl} alt="Preview" />
        <label htmlFor={label} className="block w-full h-full cursor-pointer border p-10 rounded-lg">
          <p className="text-sm text-gray-500">Select image to upload</p>
        </label>
      </div>
    </div>
  );
};

interface Settings {
  id: number;
  theme: string;
  frontCMS: boolean;
  sidebar: boolean;
  languageRTL: boolean;
  sidebarOptions: {
    news: boolean;
    complain: boolean;
    [key: string]: boolean;
  };
  language: string;
  logo: string;
  faviconUrl: string;
  footerText: string;
  cookieConsent: string;
  googleAnalyticsCode: string;
  socialLinks: {
    whatsapp: string;
    facebook: string;
    twitter: string;
    youtube: string;
    googlePlus: string;
    linkedin: string;
    instagram: string;
    pinterest: string;
    [key: string]: string;
  };
}

const SimpleFrontCMSSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getFrontCMSSettingDetails();
        const settingsData = response?.data?.[0] || {};

        const defaultSettings: Settings = {
          id: settingsData.id,
          theme: settingsData.theme,
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
          googleAnalyticsCode: settingsData.google_analytics,
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

        setSettings(defaultSettings);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };

    fetchSettings();
  }, []);

  if (!settings) return <div className="p-4">Loading...</div>;

  const toggleField = (field: keyof Settings) =>
    setSettings((prev) => prev ? { ...prev, [field]: !prev[field] } : prev);

  const toggleSidebarOption = (key: string) =>
    setSettings((prev) =>
      prev
        ? {
          ...prev,
          sidebarOptions: {
            ...prev.sidebarOptions,
            [key]: !prev.sidebarOptions[key],
          },
        }
        : prev
    );

  const updateField = (field: keyof Settings, value: any) =>
    setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));

  const updateSocialLink = (platform: string, value: string) =>
    setSettings((prev) =>
      prev
        ? {
          ...prev,
          socialLinks: { ...prev.socialLinks, [platform]: value },
        }
        : prev
    );

  const handleFileSelect = (field: "logo" | "faviconUrl", file: File) => {
    const url = URL.createObjectURL(file);
    setSettings((prev) => (prev ? { ...prev, [field]: url } : prev));
  };

  const handleThemeChange = (newTheme: string) => {
    setSettings((prev) => (prev ? { ...prev, theme: newTheme } : prev));
  };

  const handleSave = async () => {
  if (!settings) return;

  const data = {
    id: settings.id,
    theme: settings.theme,
    is_active_front_cms: settings.frontCMS ? 1 : 0,
    is_active_sidebar: settings.sidebar ? 1 : 0,
    is_active_language_rtl: settings.languageRTL ? 1 : 0,
    sidebar_options: JSON.stringify(
      Object.keys(settings.sidebarOptions).filter((key) => settings.sidebarOptions[key])
    ),
    logo: settings.logo,
    fav_icon: settings.faviconUrl,
    footer_text: settings.footerText,
    cookie_consent: settings.cookieConsent,
    google_analytics: settings.googleAnalyticsCode,
    whatsapp_url: settings.socialLinks.whatsapp,
    fb_url: settings.socialLinks.facebook,
    twitter_url: settings.socialLinks.twitter,
    youtube_url: settings.socialLinks.youtube,
    google_plus: settings.socialLinks.googlePlus,
    linkedin_url: settings.socialLinks.linkedin,
    instagram_url: settings.socialLinks.instagram,
    pinterest_url: settings.socialLinks.pinterest
  };

  console.log("Settings Payload:", data);

  try {
    const res = await postFrontCMS(data) as { status: number };
    if (res.status === 200) {
      toast.success("Updated Successfully");
    }
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Failed to Update");
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <ToastContainer />
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
                  checked={settings[field as keyof Settings] as boolean}
                  onChange={() => toggleField(field as keyof Settings)}
                  className="hidden"
                />
                <div onClick={() => toggleField(field as keyof Settings)} className="cursor-pointer">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${settings[field as keyof Settings] ? "bg-green-500" : "bg-gray-300"
                      }`}
                  ></div>
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${settings[field as keyof Settings] ? "left-5" : "left-0.5"
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
                <label key={key} className="flex items-center gap-2 text-gray-700 capitalize">
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
            onFileSelect={(file) => handleFileSelect("logo", file)}
            logoUrl={settings.logo}
          />
          <FileUpload
            label="Favicon (32px X 32px)"
            onFileSelect={(file) => handleFileSelect("faviconUrl", file)}
            logoUrl={settings.faviconUrl}
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

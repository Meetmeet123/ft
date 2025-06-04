// pages/file-settings.tsx
"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getFileTypeData } from "./FileTypeData";

interface FileTypeData {
  data: {
    file_extension: string;
    file_mime: string;
    file_size: string;
    image_extension: string;
    image_mime: string;
    image_size: string;
  };
}

export default function FileSettings() {
  const [fileExtensions, setFileExtensions] = useState<string>("");
  const [fileMimeTypes, setFileMimeTypes] = useState<string>("");
  const [fileUploadSize, setFileUploadSize] = useState<string>("100048576");

  const [imageExtensions, setImageExtensions] = useState<string>(
    "jfif, png, jpe, jpeg, jpg, bmp, gif, svg"
  );
  const [imageMimeTypes, setImageMimeTypes] = useState<string>(
    "image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml"
  );
  const [imageUploadSize, setImageUploadSize] = useState<string>("10048576");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: FileTypeData = await getFileTypeData();
        setFileExtensions(data.data.file_extension);
        setFileMimeTypes(data.data.file_mime);
        setFileUploadSize(data.data.file_size);
        setImageExtensions(data.data.image_extension);
        setImageMimeTypes(data.data.image_mime);
        setImageUploadSize(data.data.image_size);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>File Types</title>
        <meta name="description" content="File types settings page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-normal text-gray-700 mb-6">File Types</h1>

        {/* Setting For Files Section */}
        <section>
          <h2 className="text-xl font-normal text-gray-700 mb-4">
            Setting For Files
          </h2>

          <div className="border-t border-gray-200 pt-4 pb-8">
            {/* Allowed Extension */}
            <div className="mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Extension <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fileExtensions}
                onChange={(e) => setFileExtensions(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Allowed MIME Type */}
            <div className="border-t border-gray-200 pt-4 mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed MIME Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fileMimeTypes}
                onChange={(e) => setFileMimeTypes(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Upload Size */}
            <div className="border-t border-gray-200 pt-4 mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Size (In Bytes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={fileUploadSize}
                onChange={(e) => setFileUploadSize(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Setting For Image Section */}
        <section>
          <h2 className="text-xl font-normal text-gray-700 mb-4">
            Setting For Image
          </h2>

          <div className="border-t border-gray-200 pt-4 pb-8">
            {/* Allowed Extension */}
            <div className="mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Extension <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={imageExtensions}
                onChange={(e) => setImageExtensions(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Allowed MIME Type */}
            <div className="border-t border-gray-200 pt-4 mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed MIME Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={imageMimeTypes}
                onChange={(e) => setImageMimeTypes(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Upload Size */}
            <div className="border-t border-gray-200 pt-4 mb-12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Size (In Bytes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={imageUploadSize}
                onChange={(e) => setImageUploadSize(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="btn btn-primary px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

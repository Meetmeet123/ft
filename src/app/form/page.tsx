// src/app/form/page.tsx
"use client"; // Mark as Client Component

import React, { useState } from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Since this is now a Client Component, we don't need dynamic import for SSR control
const Form = () => {
  return (
    <>
      <Head>
        <title>Regular Form - Enigma Admin Template</title>
        <meta name="description" content="Enigma admin is super flexible, powerful, clean & modern responsive tailwind admin template with unlimited possibilities." />
        <meta name="keywords" content="admin template, Enigma Admin Template, dashboard template, flat admin template, responsive admin template, web app" />
        <meta name="author" content="LEFT4CODE" />
        <link rel="stylesheet" href="/dist/css/app.css" />
      </Head>
      
      <div className="py-5 md:py-0 min-h-screen bg-gray-100 dark:bg-darkmode-600">
        {/* Top Bar */}
        <div className="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
          <div className="h-full flex items-center">
            <a href="/" className="logo -intro-x hidden md:flex xl:w-[180px]">
              <img alt="Enigma Logo" className="w-6" src="/dist/images/logo.svg" />
              <span className="logo__text text-white text-lg ml-3">Enigma</span>
            </a>
            <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
              <ol className="breadcrumb breadcrumb-light">
                <li className="breadcrumb-item"><a href="#">Application</a></li>
                <li className="breadcrumb-item active" aria-current="page">Form</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex overflow-hidden mt-[70px] md:mt-0">

          {/* Form Content */}
          <div className="content flex-1 p-5 md:p-10">
            <div className="intro-y">
              <h2 className="text-lg font-medium mb-5">Unified Regular Form</h2>
              
              <div className="intro-y box p-5 bg-white dark:bg-darkmode-700 rounded-md shadow-md">
                <form className="grid grid-cols-12 gap-6">
                  {/* Input Section */}
                  <div className="col-span-12 lg:col-span-6">
                    <h3 className="text-base font-medium mb-3">Basic Inputs</h3>
                    <div className="mb-4">
                      <label htmlFor="input-text" className="form-label">Input Text</label>
                      <input id="input-text" type="text" className="form-control" placeholder="Input text" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-rounded" className="form-label">Rounded</label>
                      <input id="input-rounded" type="text" className="form-control form-control-rounded" placeholder="Rounded" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-help" className="form-label">With Help</label>
                      <input id="input-help" type="text" className="form-control" placeholder="With help" />
                      <div className="form-help">Lorem Ipsum is simply dummy text.</div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-password" className="form-label">Password</label>
                      <input id="input-password" type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-disabled" className="form-label">Disabled</label>
                      <input id="input-disabled" type="text" className="form-control" placeholder="Disabled" disabled />
                    </div>

                    {/* Input Sizing */}
                    <h3 className="text-base font-medium mb-3 mt-6">Input Sizing</h3>
                    <input type="text" className="form-control form-control-lg mb-2" placeholder=".form-control-lg" />
                    <input type="text" className="form-control mb-2" placeholder="Default input" />
                    <input type="text" className="form-control form-control-sm" placeholder=".form-control-sm" />

                    {/* Input Groups */}
                    <h3 className="text-base font-medium mb-3 mt-6">Input Groups</h3>
                    <div className="input-group mb-2">
                      <div className="input-group-text">@</div>
                      <input type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-group mb-2">
                      <input type="text" className="form-control" placeholder="Price" />
                      <div className="input-group-text">.00</div>
                    </div>
                    <div className="input-group">
                      <div className="input-group-text">@</div>
                      <input type="text" className="form-control" placeholder="Price" />
                      <div className="input-group-text">.00</div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-12 lg:col-span-6">
                    {/* Input State */}
                    <h3 className="text-base font-medium mb-3">Input States</h3>
                    <div className="mb-4">
                      <label htmlFor="input-success" className="form-label">Input Success</label>
                      <input id="input-success" type="text" className="form-control border-success" placeholder="Input text" />
                      <div className="text-success mt-2">Strong password</div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-warning" className="form-label">Input Warning</label>
                      <input id="input-warning" type="text" className="form-control border-warning" placeholder="Input text" />
                      <div className="text-warning mt-2">Attempting to reconnect...</div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-error" className="form-label">Input Error</label>
                      <input id="input-error" type="text" className="form-control border-danger" placeholder="Input text" />
                      <div className="text-danger mt-2">This field is required</div>
                    </div>

                    {/* Select Options */}
                    <h3 className="text-base font-medium mb-3 mt-6">Select Options</h3>
                    <select className="form-select mb-2">
                      <option>Chris Evans</option>
                      <option>Liam Neeson</option>
                      <option>Daniel Craig</option>
                    </select>

                    {/* Checkbox & Switch */}
                    <h3 className="text-base font-medium mb-3 mt-6">Checkbox & Switch</h3>
                    <div className="form-check mb-2">
                      <input id="checkbox-1" className="form-check-input" type="checkbox" value="" />
                      <label className="form-check-label" htmlFor="checkbox-1">Chris Evans</label>
                    </div>
                    <div className="form-check mb-2">
                      <input id="checkbox-2" className="form-check-input" type="checkbox" value="" />
                      <label className="form-check-label" htmlFor="checkbox-2">Liam Neeson</label>
                    </div>
                    <div className="form-check form-switch">
                      <input id="switch-1" className="form-check-input" type="checkbox" />
                      <label className="form-check-label" htmlFor="switch-1">Toggle Switch</label>
                    </div>

                    {/* Radio Buttons */}
                    <h3 className="text-base font-medium mb-3 mt-6">Radio Buttons</h3>
                    <div className="form-check mb-2">
                      <input id="radio-1" className="form-check-input" type="radio" name="radio_group" value="chris" />
                      <label className="form-check-label" htmlFor="radio-1">Chris Evans</label>
                    </div>
                    <div className="form-check mb-2">
                      <input id="radio-2" className="form-check-input" type="radio" name="radio_group" value="liam" />
                      <label className="form-check-label" htmlFor="radio-2">Liam Neeson</label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary mt-6">Submit Form</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Switcher */}
        <div className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
          <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
          <div className="dark-mode-switcher__toggle border"></div>
        </div>
      </div>

      {/* Scripts */}
      <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js" async />
      <script src="https://maps.googleapis.com/maps/api/js?key=your-google-map-api&libraries=places" async />
      <script src="/dist/js/app.js" async />
    </>
  );
};

export default Form;
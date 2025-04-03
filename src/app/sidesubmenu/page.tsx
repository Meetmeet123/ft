"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  DollarSign,
  File,
  Calendar,
  Wifi,
  Book,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample images (replace with actual paths in your project)
const profileImages = [
  "/images/profile-1.jpg",
  "/images/profile-2.jpg",
  "/images/profile-6.jpg",
  "/images/profile-7.jpg",
  "/images/profile-10.jpg",
  "/images/profile-14.jpg",
];

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (from the third image) */}
      <div
        className={`bg-gray-100 dark:bg-gray-800 p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className={`text-lg font-bold ${isSidebarOpen ? "block" : "hidden"}`}>DLT</div>
          <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-300">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Home className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Current Sessions"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <File className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Quick Links"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Home className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Front Office"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Student Information"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <DollarSign className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Fees Collection"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <DollarSign className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Income"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <DollarSign className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Expenses"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Attendance"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Book className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Examinations"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Book className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Academic/Term"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Wifi className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Online Examinations"}
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center text-gray-700 dark:text-gray-300">
                <Book className="w-5 h-5 mr-2" />
                {isSidebarOpen && "Competitive Exams"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content (Dashboard content from the third image) */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Main Content Area */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-4">
              {/* Notification */}
              <div className="col-span-12 mt-6 -mb-6">
                <div className="alert alert-dismissible show box bg-primary text-white flex items-center mb-6">
                  <span>
                    Download now at{" "}
                    <a
                      href="https://themeforest.net"
                      className="underline ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      themeforest.net
                    </a>
                    .
                  </span>
                  <button
                    type="button"
                    className="btn-close text-white"
                    data-tw-dismiss="alert"
                    aria-label="Close"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* General Report (Visitors in the third image) */}
              <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">Visitors</h2>
                  <select className="ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom-date">Custom Date</option>
                  </select>
                </div>
                <div className="report-box-2 mt-12 sm:mt-5">
                  <div className="box sm:flex">
                    <div className="px-8 py-12 flex flex-col justify-center flex-1 border-t sm:border-t-0 sm:border-r border-slate-200 dark:border-darkmode-300 border-dashed">
                      <div className="text-slate-500 text-xs">TOTAL TRANSACTION</div>
                      <div className="mt-1.5 flex items-center">
                        <div className="text-base">4.501</div>
                        <div
                          className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="2% Lower than last month"
                        >
                          2% <ChevronDown className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-slate-500 text-xs mt-5">CANCELATION CASE</div>
                      <div className="mt-1.5 flex items-center">
                        <div className="text-base">2</div>
                        <div
                          className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="0.1% Lower than last month"
                        >
                          0.1% <ChevronDown className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-slate-500 text-xs mt-5">GROSS RENTAL VALUE</div>
                      <div className="mt-1.5 flex items-center">
                        <div className="text-base">$72.000</div>
                        <div
                          className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="49% Higher than last month"
                        >
                          49% <ChevronUp className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-slate-500 text-xs mt-5">GROSS RENTAL PROFIT</div>
                      <div className="mt-1.5 flex items-center">
                        <div className="text-base">$54.000</div>
                        <div
                          className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="52% Higher than last month"
                        >
                          52% <ChevronUp className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                      <div className="text-slate-500 text-xs mt-5">NEW USERS</div>
                      <div className="mt-1.5 flex items-center">
                        <div className="text-base">2.500</div>
                        <div
                          className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="52% Higher than last month"
                        >
                          52% <ChevronUp className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visitors (from the third image) */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">Visitors</h2>
                  <Link href="#" className="ml-auto text-primary truncate">
                    View on Map
                  </Link>
                </div>
                <div className="report-box-2 mt-5">
                  <div className="box p-5">
                    <div className="flex items-center">
                      Realtime active users
                      <div className="dropdown ml-auto">
                        <button
                          className="dropdown-toggle w-5 h-5 block -mr-2"
                          aria-expanded="false"
                          data-tw-toggle="dropdown"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        </button>
                        <div className="dropdown-menu w-40">
                          <ul className="dropdown-content">
                            <li>
                              <Link href="#" className="dropdown-item">
                                <File className="w-4 h-4 mr-2" /> Export
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <File className="w-4 h-4 mr-2" /> Settings
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-medium mt-2">214</div>
                    <div className="border-b border-slate-200 flex pb-2 mt-4">
                      <div className="text-slate-500 text-xs">Page views per second</div>
                      <div
                        className="text-success flex text-xs font-medium tooltip cursor-pointer ml-auto"
                        title="49% Lower than last month"
                      >
                        49% <ChevronUp className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                    <div className="mt-2 border-b border-slate-200">
                      <div className="-mb-1.5 -ml-2.5">
                        <div className="h-[79px]">
                          {/* Placeholder for report-bar-chart */}
                          <canvas id="report-bar-chart"></canvas>
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs border-b border-slate-200 flex mb-2 pb-2 mt-4">
                      <div>Top Active Pages</div>
                      <div className="ml-auto">Active Users</div>
                    </div>
                    <div className="flex">
                      <div>/letz-lara…review/2653</div>
                      <div className="ml-auto">472</div>
                    </div>
                    <div className="flex mt-1.5">
                      <div>/midone…review/1674</div>
                      <div className="ml-auto">294</div>
                    </div>
                    <div className="flex mt-1.5">
                      <div>/profile…review/46789</div>
                      <div className="ml-auto">83</div>
                    </div>
                    <div className="flex mt-1.5">
                      <div>/profile…review/24357</div>
                      <div className="ml-auto">21</div>
                    </div>
                    <button className="btn btn-outline-secondary border-dashed w-full py-1 px-2 mt-4">
                      Real-Time Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Users By Age (from the third image) */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2 lg:mt-6 xl:mt-2">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">Users By Age</h2>
                  <Link href="#" className="ml-auto text-primary truncate">
                    Show More
                  </Link>
                </div>
                <div className="report-box-2 mt-5">
                  <div className="box p-5">
                    <ul
                      className="nav nav-pills w-4/5 bg-slate-100 dark:bg-black/20 rounded-md mx-auto"
                      role="tablist"
                    >
                      <li
                        id="active-users-tab"
                        className="nav-item flex-1"
                        role="presentation"
                      >
                        <button
                          className="nav-link w-full py-1.5 px-2 active"
                          data-tw-toggle="pill"
                          data-tw-target="#active-users"
                          type="button"
                          role="tab"
                          aria-controls="active-users"
                          aria-selected="true"
                        >
                          Active
                        </button>
                      </li>
                      <li
                        id="inactive-users-tab"
                        className="nav-item flex-1"
                        role="presentation"
                      >
                        <button
                          className="nav-link w-full py-1.5 px-2"
                          data-tw-toggle="pill"
                          data-tw-target="#inactive-users"
                          type="button"
                          role="tab"
                          aria-selected="false"
                        >
                          Inactive
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content mt-6">
                      <div
                        className="tab-pane active"
                        id="active-users"
                        role="tabpanel"
                        aria-labelledby="active-users-tab"
                      >
                        <div className="relative">
                          <div className="h-[208px]">
                            {/* Placeholder for report-donut-chart */}
                            <canvas className="mt-3" id="report-donut-chart"></canvas>
                          </div>
                          <div className="flex flex-col justify-center items-center absolute w-full h-full top-0 left-0">
                            <div className="text-2xl font-medium">2.501</div>
                            <div className="text-slate-500 mt-0.5">Active Users</div>
                          </div>
                        </div>
                        <div className="w-52 sm:w-auto mx-auto mt-5">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="truncate">17 - 30 Years old</span>
                            <span className="font-medium ml-auto">62%</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                            <span className="truncate">31 - 50 Years old</span>
                            <span className="font-medium ml-auto">33%</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                            <span className="truncate">{'>'}= 50 Years old</span>
                            <span className="font-medium ml-auto">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content Area */}
          <div className="col-span-12 2xl:col-span-3">
            <div className="2xl:border-l -mb-10 pb-10">
              <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
                {/* Important Notes */}
                <div className="col-span-12 md:col-span-6 xl:col-span-12 mt-3 2xl:mt-8">
                  <div className="flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-auto">Important Notes</h2>
                    <button
                      data-carousel="important-notes"
                      data-target="prev"
                      className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      data-carousel="important-notes"
                      data-target="next"
                      className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-5">
                    <div className="box zoom-in">
                      <div className="tiny-slider" id="important-notes">
                        {[1, 2].map((_, index) => (
                          <div key={index} className="p-5">
                            <div className="text-base font-medium truncate">
                              Lorem Ipsum is simply dummy text
                            </div>
                            <div className="text-slate-400 mt-1">20 Hours ago</div>
                            <div className="text-slate-500 text-justify mt-1">
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s.
                            </div>
                            <div className="font-medium flex mt-5">
                              <button
                                type="button"
                                className="btn btn-secondary py-1 px-2"
                              >
                                View Notes
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary py-1 px-2 ml-auto"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
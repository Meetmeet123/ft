"use client";

import React from "react";
import {
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  MapPin,
  MoreVertical,
  FileText,
  CheckSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
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
const previewImages = [
  "/images/preview-1.jpg",
  "/images/preview-2.jpg",
  "/images/preview-3.jpg",
  "/images/preview-4.jpg",
  "/images/preview-5.jpg",
  "/images/preview-6.jpg",
  "/images/preview-7.jpg",
  "/images/preview-8.jpg",
  "/images/preview-9.jpg",
  "/images/preview-10.jpg",
  "/images/preview-11.jpg",
  "/images/preview-14.jpg",
];

const DashboardPage: React.FC = () => {
  return (
    <div className="content p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="col-span-12 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* Notification */}
            <div className="col-span-12 mt-6 -mb-6">
              <div className="alert alert-dismissible show box bg-primary text-white flex items-center mb-6">
                <span>
                  Introducing new dashboard! Download now at{" "}
                  <a
                    href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
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

            {/* General Report */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
              <div className="flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  General Report
                </h2>
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
                  <div className="px-8 py-12 flex flex-col justify-center flex-1">
                    <ShoppingBag className="w-10 h-10 text-warning" />
                    <div className="relative text-3xl font-medium mt-12 pl-4 ml-0.5">
                      <span className="absolute text-2xl font-medium top-0 left-0 -ml-0.5">
                        $
                      </span>
                      54.143
                    </div>
                    <div
                      className="report-box-2__indicator bg-success tooltip cursor-pointer"
                      title="47% Higher than last month"
                    >
                      47% <ChevronUp className="w-4 h-4 ml-0.5 inline" />
                    </div>
                    <div className="mt-4 text-slate-500">
                      Sales earnings this month after associated author fees, &
                      before taxes.
                    </div>
                    <button className="btn btn-outline-secondary relative justify-start rounded-full mt-12">
                      Download Reports
                      <span className="w-8 h-8 absolute flex justify-center items-center bg-primary text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                  <div className="px-8 py-12 flex flex-col justify-center flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
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
                    <div className="text-slate-500 text-xs mt-5">
                      CANCELATION CASE
                    </div>
                    <div className="mt-1.5 flex items-center">
                      <div className="text-base">2</div>
                      <div
                        className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                        title="0.1% Lower than last month"
                      >
                        0.1% <ChevronDown className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs mt-5">
                      GROSS RENTAL VALUE
                    </div>
                    <div className="mt-1.5 flex items-center">
                      <div className="text-base">$72.000</div>
                      <div
                        className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                        title="49% Higher than last month"
                      >
                        49% <ChevronUp className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs mt-5">
                      GROSS RENTAL PROFIT
                    </div>
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

            {/* Visitors */}
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
                        <MoreVertical className="w-5 h-5 text-slate-500" />
                      </button>
                      <div className="dropdown-menu w-40">
                        <ul className="dropdown-content">
                          <li>
                            <Link href="#" className="dropdown-item">
                              <FileText className="w-4 h-4 mr-2" /> Export
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item">
                              <FileText className="w-4 h-4 mr-2" /> Settings
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-medium mt-2">214</div>
                  <div className="border-b border-slate-200 flex pb-2 mt-4">
                    <div className="text-slate-500 text-xs">
                      Page views per second
                    </div>
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

            {/* Users By Age */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2 lg:mt-6 xl:mt-2">
              <div className="flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Users By Age
                </h2>
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
                          <div className="text-slate-500 mt-0.5">
                            Active Users
                          </div>
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
                          <span className="truncate">&gt;= 50 Years old</span>
                          <span className="font-medium ml-auto">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Store */}
            <div className="col-span-12 lg:col-span-8 mt-6">
              <div className="block sm:flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Official Store
                </h2>
                <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                  <MapPin className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                  <input
                    type="text"
                    className="form-control sm:w-56 box pl-10"
                    placeholder="Filter by city"
                  />
                </div>
              </div>
              <div className="box p-5 mt-12 sm:mt-5">
                <div>
                  250 Official stores in 21 countries, click the marker to see
                  location details.
                </div>
                <div
                  className="report-maps mt-5 bg-slate-200 rounded-md"
                  data-center="-6.2425342, 106.8626478"
                  data-sources="/dist/json/location.json"
                >
                  {/* Placeholder for Google Maps */}
                </div>
              </div>
            </div>

            {/* Weekly Best Sellers */}
            <div className="col-span-12 xl:col-span-4 mt-6">
              <div className="flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Weekly Best Sellers
                </h2>
              </div>
              <div className="mt-5">
                {[
                  {
                    name: "Charlize Theron",
                    date: "27 July 2022",
                    image: profileImages[3],
                  },
                  {
                    name: "Robert De Niro",
                    date: "14 August 2021",
                    image: profileImages[2],
                  },
                  {
                    name: "Arnold Schwarzenegger",
                    date: "7 August 2021",
                    image: profileImages[0],
                  },
                  {
                    name: "Charlize Theron",
                    date: "29 April 2022",
                    image: profileImages[3],
                  },
                ].map((seller, index) => (
                  <div key={index} className="intro-y">
                    <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                      <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                        <Image
                          alt="Midone - HTML Admin Template"
                          src={seller.image}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4 mr-auto">
                        <div className="font-medium">{seller.name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {seller.date}
                        </div>
                      </div>
                      <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                        137 Sales
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="#"
                  className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >
                  View More
                </Link>
              </div>
            </div>

            {/* Ads 1 */}
            <div className="col-span-12 lg:col-span-6 mt-6">
              <div className="box p-8 relative overflow-hidden bg-primary intro-y">
                <div className="leading-[2.15rem] w-full sm:w-72 text-white text-xl -mt-3">
                  Transact safely with Lender’s Fund Account (RDL)
                </div>
                <div className="w-full sm:w-72 leading-relaxed text-white/70 dark:text-slate-500 mt-3">
                  Apply now, quick registration.
                </div>
                <button className="btn w-32 bg-white dark:bg-darkmode-800 dark:text-white mt-6 sm:mt-10">
                  Start Now
                </button>
                <Image
                  className="hidden sm:block absolute top-0 right-0 w-2/5 -mt-3 mr-2"
                  alt="Midone - HTML Admin Template"
                  src="/images/woman-illustration.svg"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            {/* Ads 2 */}
            <div className="col-span-12 lg:col-span-6 mt-6">
              <div className="box p-8 relative overflow-hidden intro-y">
                <div className="leading-[2.15rem] w-full sm:w-52 text-primary dark:text-white text-xl -mt-3">
                  Invite friends to get <span className="font-medium">FREE</span>{" "}
                  bonuses!
                </div>
                <div className="w-full sm:w-60 leading-relaxed text-slate-500 mt-2">
                  Get a IDR 100,000 voucher by inviting your friends to fund
                  #BecomeMember
                </div>
                <div
                  className="w-48 relative mt-6 cursor-pointer tooltip"
                  title="Copy referral link"
                >
                  <input
                    type="text"
                    className="form-control"
                    value="https://dashboard.in"
                    readOnly
                  />
                  <Copy className="absolute right-0 top-0 bottom-0 my-auto mr-4 w-4 h-4" />
                </div>
                <Image
                  className="hidden sm:block absolute top-0 right-0 w-1/2 mt-1 -mr-12"
                  alt="Midone - HTML Admin Template"
                  src="/images/phone-illustration.svg"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            {/* Weekly Top Products */}
            <div className="col-span-12 mt-6">
              <div className="block sm:flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Weekly Top Products
                </h2>
                <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
                    <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
                    to Excel
                  </button>
                  <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
                    <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
                    to PDF
                  </button>
                </div>
              </div>
              <div className="overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                <table className="table table-report sm:mt-2">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">IMAGES</th>
                      <th className="whitespace-nowrap">PRODUCT NAME</th>
                      <th className="text-center whitespace-nowrap">STOCK</th>
                      <th className="text-center whitespace-nowrap">STATUS</th>
                      <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        images: [
                          previewImages[3],
                          previewImages[1],
                          previewImages[6],
                        ],
                        name: "Apple MacBook Pro 13",
                        category: "PC & Laptop",
                        stock: 74,
                        status: "Active",
                        statusClass: "text-success",
                        dates: [
                          "27 July 2022",
                          "10 November 2022",
                          "23 June 2020",
                        ],
                      },
                      {
                        images: [
                          previewImages[7],
                          previewImages[0],
                          previewImages[5],
                        ],
                        name: "Samsung Q90 QLED TV",
                        category: "Electronic",
                        stock: 196,
                        status: "Active",
                        statusClass: "text-success",
                        dates: [
                          "14 August 2021",
                          "17 May 2020",
                          "12 May 2021",
                        ],
                      },
                      {
                        images: [
                          previewImages[8],
                          previewImages[10],
                          previewImages[9],
                        ],
                        name: "Apple MacBook Pro 13",
                        category: "PC & Laptop",
                        stock: 127,
                        status: "Inactive",
                        statusClass: "text-danger",
                        dates: [
                          "7 August 2021",
                          "17 May 2020",
                          "29 March 2022",
                        ],
                      },
                      {
                        images: [
                          previewImages[4],
                          previewImages[2],
                          previewImages[8],
                        ],
                        name: "Nikon Z6",
                        category: "Photography",
                        stock: 197,
                        status: "Inactive",
                        statusClass: "text-danger",
                        dates: [
                          "29 April 2022",
                          "25 April 2021",
                          "29 December 2022",
                        ],
                      },
                    ].map((product, index) => (
                      <tr key={index} className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            {product.images.map((img, idx) => (
                              <div
                                key={idx}
                                className={`w-10 h-10 image-fit zoom-in ${
                                  idx > 0 ? "-ml-5" : ""
                                }`}
                              >
                                <Image
                                  alt="Midone - HTML Admin Template"
                                  className="tooltip rounded-full"
                                  src={img}
                                  width={40}
                                  height={40}
                                  title={`Uploaded at ${product.dates[idx]}`}
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          <Link href="#" className="font-medium whitespace-nowrap">
                            {product.name}
                          </Link>
                          <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            {product.category}
                          </div>
                        </td>
                        <td className="text-center">{product.stock}</td>
                        <td className="w-40">
                          <div
                            className={`flex items-center justify-center ${product.statusClass}`}
                          >
                            <CheckSquare className="w-4 h-4 mr-2" />{" "}
                            {product.status}
                          </div>
                        </td>
                        <td className="table-report__action w-56">
                          <div className="flex justify-center items-center">
                            <Link
                              href="#"
                              className="flex items-center mr-3"
                            >
                              <CheckSquare className="w-4 h-4 mr-1" /> Edit
                            </Link>
                            <Link
                              href="#"
                              className="flex items-center text-danger"
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                <nav className="w-full sm:w-auto sm:mr-auto">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        ...
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link" href="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        ...
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  </ul>
                </nav>
                <select className="w-20 form-select box mt-3 sm:mt-0">
                  <option>10</option>
                  <option>25</option>
                  <option>35</option>
                  <option>50</option>
                </select>
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
                  <h2 className="text-lg font-medium truncate mr-auto">
                    Important Notes
                  </h2>
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
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="p-5">
                          <div className="text-base font-medium truncate">
                            Lorem Ipsum is simply dummy text
                          </div>
                          <div className="text-slate-400 mt-1">20 Hours ago</div>
                          <div className="text-slate-500 text-justify mt-1">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry&apos;s standard dummy text ever since the
                            1500s.
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

              {/* Recent Activities */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Recent Activities
                  </h2>
                  <Link href="#" className="ml-auto text-primary truncate">
                    Show More
                  </Link>
                </div>
                <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                  <div className="relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <Image
                          alt="Midone - HTML Admin Template"
                          src={profileImages[1]}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">Morgan Freeman</div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has joined the team
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <Image
                          alt="Midone - HTML Admin Template"
                          src={profileImages[3]}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">Al Pacino</div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500">
                        <div className="mt-1">Added 3 new photos</div>
                        <div className="flex mt-2">
                          <div
                            className="tooltip w-8 h-8 image-fit mr-1 zoom-in"
                            title="Apple MacBook Pro 13"
                          >
                            <Image
                              alt="Midone - HTML Admin Template"
                              className="rounded-md border border-white"
                              src={previewImages[6]}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div
                            className="tooltip w-8 h-8 image-fit mr-1 zoom-in"
                            title="Samsung Q90 QLED TV"
                          >
                            <Image
                              alt="Midone - HTML Admin Template"
                              className="rounded-md border border-white"
                              src={previewImages[11]}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div
                            className="tooltip w-8 h-8 image-fit mr-1 zoom-in"
                            title="Apple MacBook Pro 13"
                          >
                            <Image
                              alt="Midone - HTML Admin Template"
                              className="rounded-md border border-white"
                              src={previewImages[9]}
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-500 text-xs text-center my-4">
                    12 November
                  </div>
                  <div className="relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <Image
                          alt="Midone - HTML Admin Template"
                          src={profileImages[5]}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">Sylvester Stallone</div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has changed{" "}
                        <Link href="#" className="text-primary">
                          Apple MacBook Pro 13
                        </Link>{" "}
                        price and description
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <Image
                          alt="Midone - HTML Admin Template"
                          src={profileImages[4]}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">Angelina Jolie</div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has changed{" "}
                        <Link href="#" className="text-primary">
                          Oppo Find X2 Pro
                        </Link>{" "}
                        description
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Transactions
                  </h2>
                </div>
                <div className="mt-5">
                  {[
                    {
                      name: "Charlize Theron",
                      date: "27 July 2022",
                      amount: "+$46",
                      amountClass: "text-success",
                      image: profileImages[3],
                    },
                    {
                      name: "Robert De Niro",
                      date: "14 August 2021",
                      amount: "+$39",
                      amountClass: "text-success",
                      image: profileImages[2],
                    },
                    {
                      name: "Arnold Schwarzenegger",
                      date: "7 August 2021",
                      amount: "-$77",
                      amountClass: "text-danger",
                      image: profileImages[0],
                    },
                    {
                      name: "Charlize Theron",
                      date: "29 April 2022",
                      amount: "-$51",
                      amountClass: "text-danger",
                      image: profileImages[3],
                    },
                    {
                      name: "Kate Winslet",
                      date: "22 August 2022",
                      amount: "+$100",
                      amountClass: "text-success",
                      image: profileImages[0],
                    },
                  ].map((transaction, index) => (
                    <div key={index} className="intro-x">
                      <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                          <Image
                            alt="Midone - HTML Admin Template"
                            src={transaction.image}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {transaction.date}
                          </div>
                        </div>
                        <div className={transaction.amountClass}>
                          {transaction.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="#"
                    className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                  >
                    View More
                  </Link>
                </div>
              </div>

              {/* Schedules */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
                <div className="flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Schedules
                  </h2>
                  <Link
                    href="#"
                    className="ml-auto text-primary truncate flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add New Schedules
                  </Link>
                </div>
                <div className="mt-5">
                  <div className="box">
                    <div className="p-5">
                      <div className="flex">
                        <ChevronLeft className="w-5 h-5 text-slate-500" />
                        <div className="font-medium text-base mx-auto">April</div>
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      </div>
                      <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                          (day, index) => (
                            <div key={index} className="font-medium">
                              {day}
                            </div>
                          )
                        )}
                        {[
                          { day: "29", class: "text-slate-500" },
                          { day: "30", class: "text-slate-500" },
                          { day: "31", class: "text-slate-500" },
                          { day: "1", class: "" },
                          { day: "2", class: "" },
                          { day: "3", class: "" },
                          { day: "4", class: "" },
                          { day: "5", class: "" },
                          { day: "6", class: "bg-success/20 dark:bg-success/30" },
                          { day: "7", class: "" },
                          { day: "8", class: "bg-primary text-white" },
                          { day: "9", class: "" },
                          { day: "10", class: "" },
                          { day: "11", class: "" },
                          { day: "12", class: "" },
                          { day: "13", class: "" },
                          { day: "14", class: "" },
                          { day: "15", class: "" },
                          { day: "16", class: "" },
                          { day: "17", class: "" },
                          { day: "18", class: "" },
                          { day: "19", class: "" },
                          { day: "20", class: "" },
                          { day: "21", class: "" },
                          { day: "22", class: "" },
                          { day: "23", class: "bg-pending/20 dark:bg-pending/30" },
                          { day: "24", class: "" },
                          { day: "25", class: "" },
                          { day: "26", class: "" },
                          { day: "27", class: "bg-primary/10 dark:bg-primary/50" },
                          { day: "28", class: "" },
                          { day: "29", class: "" },
                          { day: "30", class: "" },
                          { day: "1", class: "text-slate-500" },
                          { day: "2", class: "text-slate-500" },
                          { day: "3", class: "text-slate-500" },
                          { day: "4", class: "text-slate-500" },
                          { day: "5", class: "text-slate-500" },
                          { day: "6", class: "text-slate-500" },
                          { day: "7", class: "text-slate-500" },
                          { day: "8", class: "text-slate-500" },
                          { day: "9", class: "text-slate-500" },
                        ].map((date, index) => (
                          <div
                            key={index}
                            className={`py-0.5 rounded relative ${date.class}`}
                          >
                            {date.day}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-slate-200/60 p-5">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                        <span className="truncate">UI/UX Workshop</span>
                        <span className="font-medium xl:ml-auto">23th</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="truncate">
                          VueJs Frontend Development
                        </span>
                        <span className="font-medium xl:ml-auto">10th</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                        <span className="truncate">Laravel Rest API</span>
                        <span className="font-medium xl:ml-auto">31th</span>
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
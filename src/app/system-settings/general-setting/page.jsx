"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Feespage from "./fees/Fees/Feespage";

import { ToastContainer, toast } from 'react-toastify';
const GeneralSettings = () => {
    const notify = () => toast.success("Record Saved Successfully!");
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState("general-setting");

    // Set the active link based on the current pathname
    useEffect(() => {
        const path = pathname.toLowerCase();
        if (path.includes("general-setting")) {
            setActiveLink("general-setting");
        } else if (path.includes("logo")) {
            setActiveLink("logo");
        } else if (path.includes("signature")) {
            setActiveLink("signature");
        } else if (path.includes("login-page-background")) {
            setActiveLink("login-page-background");
        } else if (path.includes("backend-theme")) {
            setActiveLink("backend-theme");
        } else if (path.includes("mobile-app")) {
            setActiveLink("mobile-app");
        } else if (path.includes("student-gurdian-panel")) {
            setActiveLink("student-gurdian-panel");
        } else if (path.includes("fees")) {
            setActiveLink("fees");
        } else if (path.includes("id-auto-generation")) {
            setActiveLink("id-auto-generation");
        } else if (path.includes("attendance-type")) {
            setActiveLink("attendance-type");
        } else if (path.includes("whatsapp-settings")) {
            setActiveLink("whatsapp-settings");
        } else if (path.includes("maintenance")) {
            setActiveLink("maintenance");
        } else if (path.includes("miscellaneous")) {
            setActiveLink("miscellaneous");
        }
    }, [pathname]);

    // Function to render content based on the active link
    const renderContent = () => {
        switch (activeLink) {
            case "general-setting":
                return <div className="flex flex-row gap-6">
                    <div className="col-span-12 lg:col-span-6 flex-1 ">
                        <div className="intro-y box p-1 pb-10 mb-4 w-[850]">
                            <div className="flex flex-col sm:flex-row items-center p-1 pb-4 border-b border-slate-200/60 dark:border-darkmode-400">
                                <h2 className="font-normal text-base mr-auto">General Setting</h2>

                            </div>
                            <div className='p-3 m-3' style={{ backgroundColor: '#dae8f2', color: "#3498db", borderColor: "a3c8e3" }}>
                                <h4>Note: After saving General Setting please once logout then relogin so changes will be come in effect.</h4>
                            </div>
                            <form className="pb-6">
                                <div className='pb-6 border-b border-slate-200/60 dark:border-darkmode-400 '>
                                    <div className="flex space-x-4 pt-2">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-30">School Name <span className='text-red-400'>*</span></label>
                                            <input type="text" className="text-xs w-70 border border-gray-300 px-2 py-1" defaultValue={"Mount Carmel School"} />
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-24">School Code</label>
                                            <input type="text" className="text-xs w-72 border border-gray-300 py-1" defaultValue={"ACT-487438"} />
                                        </div>

                                    </div>
                                    <div className="flex space-x-4 pt-2">
                                        <div className="flex items-center col-start-1">
                                            <label htmlFor="" className=" mr-2 w-30">Address <span className='text-red-400'>*</span></label>
                                            <input type="text" className="text-xs w-170 border border-gray-300 py-1" defaultValue={"25 Kings Street, CA"} />
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 pt-2">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-30">Phone <span className='text-red-400'>*</span></label>
                                            <input type="text" className="text-xs w-70 border border-gray-300 px-2 py-1" defaultValue={"89562423934"} />
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-24"> Email <span className='text-red-400'> *</span></label>
                                            <input type="text" className="text-xs w-72 border border-gray-300 py-1" defaultValue={"mountcarmelmailtest@gmail.com"} />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                        <h2 className="font-normal text-base mr-auto">Academic Session</h2>
                                    </div>

                                    <div className="flex space-x-4 pt-2 pb-4 border-b border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-30">Session <span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className="py-1 text-xs block w-70 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="2024-25"
                                            >
                                                <option value="2024-25">2024-25</option>
                                                <option value="2020-22">2020-22</option>
                                                <option value="2021-20">2021-20</option>
                                                <option value="2022-23">2022-23</option>
                                                <option value="2023-24">2023-24</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-35">Session Start Month <span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className="py-1 text-xs block w-65 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="January"
                                            >
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                        <h2 className="font-normal text-base mr-auto">Date Time</h2>
                                    </div>
                                    <div className="flex space-x-4 pt-2 pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-21">Date Format<span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className="py-1 block w-45 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="mm.dd.yyyy"
                                            >
                                                <option value="mm.dd.yyyy">mm.dd.yyyy</option>
                                                <option value="dd.mm.yy">dd.mm.yy</option>
                                                <option value="mm.d.yy">mm.d.yy</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-19">Timezone <span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className=" py-1 block w-43 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="(GMT+05:30)Asia,Kolkata"
                                            >
                                                <option value="(GMT+05:30)Asia,Kolkata">(GMT+05:30)Asia,Kolkata</option>
                                                <option value="GMT+(05:00)Asia,Dubai">GMT+(05:00)Asia,Dubai</option>
                                                <option value="GMT+(05:00)Asia,Dubai">GMT+(05:00)Asia,Dubai</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-30">Start Day Of Week<span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className="py-1 block w-40 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="Monday"
                                            >
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-6 border-b border-slate-200/60 dark:border-darkmode-400'>
                                    <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                        <h2 className="font-normal text-base mr-auto">Currency</h2>
                                    </div>
                                    <div className="flex space-x-4 pt-2">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-30">Currency Format <span className='text-red-400'>*</span></label>
                                            <select
                                                id="small"
                                                className=" py-1 block w-70 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue="30,3330"
                                            >
                                                <option value="30,3330">30,3330</option>
                                                <option value="12,34859">12,34859</option>
                                                <option value="1,23,48590">1,23,48590</option>
                                                <option value="1,24859">1,24859</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-6 border-b border-slate-200/60 dark:border-darkmode-400'>
                                    <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                        <h2 className="font-normal text-base mr-auto">File Upload Path</h2>
                                    </div>
                                    <div className="flex space-x-4 pt-2">
                                        <div className="flex items-center">
                                            <label htmlFor="" className="mr-2 w-30">Base Url  <span className='text-red-400'>*</span></label>
                                            <input type="text" className=" text-xs w-70 border border-gray-300 px-2 py-1" defaultValue={"https://demo.smart-school.in/"} />
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="" className="w-30">File Upload Path <span className='text-red-400'>*</span></label>
                                            <input type="text" className=" text-xs w-70 border border-gray-300 py-1" defaultValue={"/var/www/demo.smart-school.in2b53Vh4Dy7G/public_html/"} />
                                        </div>
                                    </div>
                                </div>


                                <div className="absolute right-4 bottom-4 size-16 justify-center">
                                    <button onClick={notify} type="submit" className="btn btn-primary mt-8 bg-blue-500 text-white p-1 px-2 rounded">
                                        Save
                                    </button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>;
            case "logo":
                return <div>Logo Content</div>;
            case "login-page-background":
                return <div>Login Page Background Content</div>;
            case "signature":
                return <div>Signature</div>;

            case "backend-theme":
                return <div>Backend Theme Content</div>;
            case "mobile-app":
                return <div>Mobile App Content</div>;
            case "student-gurdian-panel":
                return <div>Student Guardian Panel Content</div>;
            case "fees":
                return <div><Feespage /></div>;
            case "id-auto-generation":
                return <div>ID Auto Generation Content</div>;
            case "attendance-type":
                return <div>Attendance Type Content</div>;
            case "whatsapp-settings":
                return <div>WhatsApp Settings Content</div>;
            case "maintenance":
                return <div>Maintenance Content</div>;
            case "miscellaneous":
                return <div>Miscellaneous Content</div>;
            default:
                return <div>Please select an option from the menu.</div>;
        }
    };

    return (
        <div className="mt-6 h-fit flex flex-row px-0 intro-y">
            {/* Side Submenu (20%) */}
            <div className="w-1/5 bg-white mr-2  h-130">
                <div className="relative min-h-[200px]">
                    <div className="border-solid border-l-2 border-[#164f63]/60 p-2">
                        {/* Green active indicator */}
                     
                        <div
                            className="absolute left-0 w-[2.4px] h-6 bg-green-600 transition-all duration-300 ease-in-out"
                            style={{
                                top: {
                                  "general-setting": "3px",
                                    "logo": "42px",
                                    "signature": "80px",
                                    "login-page-background": "110px",
                                    "backend-theme": "144px",
                                    "mobile-app": "183px",
                                    "student-gurdian-panel": "218px",
                                    "fees": "252px",
                                    "id-auto-generation": "290px",
                                    "attendance-type": "330px",
                                    "whatsapp-settings": "360px", 
                                    "session-settings": "400px",
                                    "maintenance": "432px",
                                    "miscellaneous": "470px",
                                }[activeLink],
                            }}
                        />

                        <div className="flex flex-col gap-4">
                            <Link
                                href="/system-settings/general-setting"
                                className={`text-blue-600 hover:underline ${activeLink === "general-setting" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("general-setting")}
                            >
                                General Setting
                            </Link>
                            <Link
                                href="/system-settings/general-setting/logo"
                                className={`text-blue-600 hover:underline ${activeLink === "logo" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("logo")}
                            >
                                Logo
                            </Link>
                            <Link
                                href="/system-settings/general-setting/signature"
                                className={`text-blue-600 hover:underline ${activeLink === "signature" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("signature")}
                            >
                                Signature
                            </Link>
                            <Link
                                href="/system-settings/general-setting/login-page-background"
                                className={`text-blue-600 hover:underline ${activeLink === "login-page-background" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("login-page-background")}
                            >
                                Login Page Background
                            </Link>
                            <Link
                                href="/system-settings/general-setting/backend-theme"
                                className={`text-blue-600 hover:underline ${activeLink === "backend-theme" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("backend-theme")}
                            >
                                Backend Theme
                            </Link>
                            <Link
                                href="/system-settings/general-setting/mobile-app"
                                className={`text-blue-600 hover:underline ${activeLink === "mobile-app" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("mobile-app")}
                            >
                                Mobile App
                            </Link>
                            <Link
                                href="/system-settings/general-setting/student-gurdian-panel"
                                className={`text-blue-600 hover:underline ${activeLink === "student-gurdian-panel" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("student-gurdian-panel")}
                            >
                                Student / Guardian Panel
                            </Link>
                            <Link
                                href="/system-settings/general-setting/fees"
                                className={`text-blue-600 hover:underline ${activeLink === "fees" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("fees")}
                            >
                                Fees
                            </Link>
                            <Link
                                href="/system-settings/general-setting/id-auto-generation"
                                className={`text-blue-600 hover:underline ${activeLink === "id-auto-generation" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("id-auto-generation")}
                            >
                                ID Auto Generation
                            </Link>
                            <Link
                                href="/system-settings/general-setting/attendance-type"
                                className={`text-blue-600 hover:underline ${activeLink === "attendance-type" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("attendance-type")}
                            >
                                Attendance Type
                            </Link>
                            <Link
                                href="/system-settings/general-setting/whatsapp-settings"
                                className={`text-blue-600 hover:underline ${activeLink === "whatsapp-settings" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("whatsapp-settings")}
                            >
                                WhatsApp Settings
                            </Link>
                            <Link
                                href="/system-settings/general-setting/session-settings"
                                className={`text-blue-600 hover:underline ${activeLink === "session-settings" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("session-settings")}
                            >
                                Session Settings
                            </Link>
                            <Link
                                href="/system-settings/general-setting/maintenance"
                                className={`text-blue-600 hover:underline ${activeLink === "maintenance" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("maintenance")}
                            >
                                Maintenance
                            </Link>
                            <Link
                                href="/system-settings/general-setting/miscellaneous"
                                className={`text-blue-600 hover:underline ${activeLink === "miscellaneous" ? "font-bold text-blue-800" : ""}`}
                                onClick={() => setActiveLink("miscellaneous")}
                            >
                                Miscellaneous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Content Section (80%) */}
            <div className="w-4/5">{renderContent()}</div>
        </div>
    );
};

export default GeneralSettings;

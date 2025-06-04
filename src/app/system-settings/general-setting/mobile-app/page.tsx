"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileThemepage from "./MobileTheme/MobileThemepage";

const GeneralSettings = () => {
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState("mobile-app");

    // Set the active link based on the current pathname
    useEffect(() => {
        if(!pathname) return;
        
        const path = pathname.toLowerCase();
        if (path.includes("mobile-app")) {
            setActiveLink("mobile-app");
        } else if (path.includes("general-setting")) {
            setActiveLink("general-setting");
        } else if (path.includes("logo")) {
            setActiveLink("logo");
        } else if (path.includes("signature")) {
            setActiveLink("signature");
        } else if (path.includes("login-page-background")) {
            setActiveLink("login-page-background");
        } else if (path.includes("backend-theme")) {
            setActiveLink("backend-theme");
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
                return <div>General Setting Content</div>;
            case "logo":
                return <div></div>
            case "signature":
                return <div></div>
            case "login-page-background":
                return <div>Login Page Background Content</div>;
            case "backend-theme":
                return <div>backend-theme Content</div>;
            case "mobile-app":
                return <div>
                    <MobileThemepage />
                </div>;
            case "student-gurdian-panel":
                return <div>Student Guardian Panel Content</div>;
            case "fees":
                return <div>Fees Content</div>;
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
        <div className="mt-10 h-fit flex flex-row intro-y ">
            {/* Side Submenu (20%) */}
            <div className="lg:w-1/5 md:w-1/3 bg-white mr-2">
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

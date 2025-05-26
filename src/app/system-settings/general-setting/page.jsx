"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Feespage from "./fees/Fees/Feespage";
import { ToastContainer, toast } from 'react-toastify';
import { getGeneralSettingDetails } from "./GeneralSettingData";
import { updateSettingURL } from './GeneralSettingData';

const GeneralSettings = () => {
    const notify = () => toast.success("Record Saved Successfully!");
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState("general-setting");
    const [settingDetails, setSettingDetails] = useState();
    const [updatedData, setUpdatedData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setIsLoading(true);
                const data = await getGeneralSettingDetails();
                setSettingDetails(data);
            } catch (error) {
                console.error('Error fetching settings:', error);
                toast.error('Failed to load settings');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChanges = (field, e) => {
        const tempData = { ...settingDetails, [field]: e.target.value }
        setSettingDetails(tempData);
    }

    const handleSubmit = async() => {
        try {
            setLoading(true);
            setError(null);

            const temp = {
                "id": 1,
                "sch_session_id": settingDetails?.session_id || 18,
                "fee_due_days": 30,
                "sch_name": settingDetails?.name || "Up School Name",
                "sch_phone": settingDetails?.phone || "9876543210",
                "sch_start_month": settingDetails?.start_month || "April",
                "sch_start_week": settingDetails?.start_week || "Monday",
                "sch_address": settingDetails?.address || "dhumi School Lane, City",
                "sch_email": settingDetails?.email || "school@example.com",
                "sch_lang_id": settingDetails?.lang_id || 1,
                "sch_currency_symbol": settingDetails?.currency_place || "$",
                "sch_timezone": settingDetails?.timezone || "UTC",
                "sch_currency": settingDetails?.currency || "USD",
                "currency_place": settingDetails?.currency_place || "before",
                "sch_date_format": settingDetails?.date_format || "Y-m-d",
                "sch_is_rtl": settingDetails?.is_rtl || "disabled",
                "theme": settingDetails?.theme || "default",
                "attendence_type": settingDetails?.attendance_type || 1,
                "is_duplicate_fees_invoice": settingDetails?.is_duplicate_fees_invoice || 0,
                "adm_auto_insert": settingDetails?.adm_auto_insert || 1,
                "adm_prefix": settingDetails?.adm_prefix || "ADM",
                "adm_start_from": settingDetails?.adm_start_from || 1000,
                "adm_no_digit": settingDetails?.adm_no_digit || 4,
                "staffid_auto_insert": settingDetails?.staffid_auto_insert || 1,
                "staffid_prefix": settingDetails?.staffid_prefix || "STF",
                "staffid_start_from": settingDetails?.staffid_start_from || 500,
                "staffid_no_digit": settingDetails?.staffid_no_digit || 3,
                "pan_number": settingDetails?.pan_number || "ABCDE1234F",
                "gst_no": settingDetails?.gst_no || "22ABCDE1234F1Z5",
                "service_tax_no": settingDetails?.service_tax_no || "ABCDE1234F123",
                "vat_no": settingDetails?.vat_no || "12345678901",
                "cin_no": settingDetails?.cin_no || "U12345MH2020PLC123456",
                "sch_dise_code": settingDetails?.sch_dise_code || "123456789",
                "app_primary_color_code": settingDetails?.app_primary_color_code || "#FF0000",
                "app_secondary_color_code": settingDetails?.app_secondary_color_code || "#00FF00",
                "mobile_api_url": settingDetails?.mobile_api_url || "https://api.example.com",
                "mytradinglink": settingDetails?.mytradinglink || "https://example.com",
                "my_question": settingDetails?.my_question || "Sample question",
                "sch_soc_name": settingDetails?.sch_soc_name || "School Society",
                "sch_name_primary": settingDetails?.sch_name_primary || "Primary School Name",
                "sch_name_secondary": settingDetails?.sch_name_secondary || "Secondary School Name",
                "sch_recog_primary": settingDetails?.sch_recog_primary || "Recognized",
                "sch_recog_secondary": settingDetails?.sch_recog_secondary || "Recognized",
                "sch_udise_primary": settingDetails?.sch_udise_primary || "12345678901",
                "sch_udise_secondary": settingDetails?.sch_udise_secondary || "12345678902",
                "sch_city": settingDetails?.sch_city || "City",
                "sch_state": settingDetails?.sch_state || "State",
                "sch_medium": ["English", "Hindi"],
                "sch_board": ["CBSE"],
                "principal_sign": settingDetails?.principal_sign || "principal_sign.jpg",
                "clerk_sign": settingDetails?.clerk_sign || "clerk_sign.jpg",
                "examiner_sign": settingDetails?.examiner_sign || "examiner_sign.jpg",
                "sch_establish": settingDetails?.sch_establish || "2000",
                "alt_phone": settingDetails?.alt_phone || "9876543211",
                "alt_email": settingDetails?.alt_email || "alt@example.com",
                "sch_name_high_secondary": settingDetails?.sch_name_high_secondary || "High Secondary School",
                "sch_recog_high_secondary": settingDetails?.sch_recog_high_secondary || "Recognized",
                "sch_udise_high_secondary": settingDetails?.sch_udise_high_secondary || "12345678903",
                "certificate_print_lang": settingDetails?.certificate_print_lang || 4,
                "biometric": settingDetails?.biometric || 0,
                "biometric_device": settingDetails?.biometric_device || null,
                "class_teacher": settingDetails?.class_teacher || "John Doe"
            };

            const finalPayload = { ...temp };
            const res = await updateSettingURL(finalPayload);
            
            if(res.status === 'success') {
                notify();
            } else {
                throw new Error(res.message || 'Update failed');
            }
        } catch (err) {
            setError(err.message || 'Failed to update settings');
            toast.error(err.message || 'Failed to update settings');
        } finally {
            setLoading(false);
        }
    };


    // Function to render content based on the active link
    const renderContent = () => {
        switch (activeLink) {
            case "general-setting":
                return <div className="flex w-full flex-row gap-6">
                    <div className="w-full flex-1">
                        <div className="intro-y box p-1 pb-10 mb-4 ">
                            <div className="flex flex-col sm:flex-row items-center p-1 pb-4 border-b border-slate-200/60 dark:border-darkmode-400">
                                <h2 className="font-normal text-base mr-auto">General Setting</h2>
                            </div>
                            <div className='p-3 m-3 text-blue-600 bg-blue-50 text-center w-full'>
                                <h4>Note: After saving General Setting please once logout then relogin so changes will be come in effect.</h4>
                            </div>
                            <form className="pb-6">
                            <div className='pb-6 border-b border-slate-200/60 dark:border-darkmode-400 '>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 sm:grid-cols-1 space-x-4 pt-2">
                                    <div className="grid w-full lg:grid-cols-2 md:grid-cols-1 justify-start items-center gap-0">
                                        <label htmlFor="" className="mr-2 col-span-1">School Name <span className='text-red-400'>*</span></label>
                                        <input
                                            type="text"
                                            className="text-xs w-full border border-gray-300 px-2 py-1"
                                            defaultValue={settingDetails?.name ? settingDetails.name : "Mount Carmel School"}
                                            onChange={(e) => handleChanges('name', e)}
                                        />
                                    </div>
                                    <div className="grid w-full lg:grid-cols-2 md:grid-cols-1 justify-start items-center gap-0">
                                        <label htmlFor="" className="">School Code</label>
                                        <input
                                            type="text"
                                            className="text-xs w-full border border-gray-300 py-1"
                                            defaultValue={settingDetails?.code ? settingDetails.code : "ACT-487438"}
                                            onChange={(e) => handleChanges('code', e)}
                                        />
                                    </div>

                                </div>
                                <div className="flex space-x-4 pt-2">
                                    <div className="lg:flex gap-5 md:block sm:block items-center w-full">
                                        <label htmlFor="" className="w-1/3">Address <span className='text-red-400'>*</span></label>
                                        <input
                                            type="text"
                                            id="small-input"
                                            className="block p-2 w-full text-gray-900 bg-gray-50 border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={settingDetails?.address || ''}
                                            onChange={(e) => handleChanges('address', e)}
                                        />
                                    </div>
                                </div>
                                <div className="lg:flex md:block sm:block space-x-4 pt-2">
                                    <div className="flex items-center gap-5 lg:w-1/2 md:w-full sm:w-full mb-5">
                                        <label htmlFor="" className="w-1/3 ">Phone <span className='text-red-400'>*</span></label>
                                        <input
                                            type="text"
                                            id="small-input"
                                            className="block p-2 w-full text-gray-900 bg-gray-50 border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={settingDetails?.phone || ''}
                                            onChange={(e) => handleChanges('phone', e)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-5 lg:w-1/2 md:w-full sm-w-full mb-5">
                                        <label htmlFor="" className="w-1/3"> Email <span className='text-red-400'> *</span></label>
                                        <input
                                            type="text"
                                            className="text-xs w-full border border-gray-300 py-1"
                                            defaultValue={settingDetails?.email ? settingDetails.email : "mountcarmelmailtest@gmail.com"}
                                            onChange={(e) => handleChanges('email', e)}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                    <h2 className="font-normal text-base mr-auto">Academic Session</h2>
                                </div>

                                <div className="lg:flex md:block sm:block space-x-4 pt-2 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <div className="flex items-center w-full">
                                        <label htmlFor="" className="w-1/3">Session <span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className="py-1 text-xs block w-full "
                                            defaultValue={settingDetails?.session ? settingDetails.session : "2024-25"}
                                            onChange={(e) => handleChanges('session', e)}
                                        >
                                            <option value="2024-25">2024-25</option>
                                            <option value="2020-22">2020-22</option>
                                            <option value="2021-20">2021-20</option>
                                            <option value="2022-23">2022-23</option>
                                            <option value="2023-24">2023-24</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <label htmlFor="" className="w-1/3">Session Start Month <span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className="py-1 text-xs block w-full text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={settingDetails?.start_month || "January"}
                                            onChange={(e) => handleChanges('start_month', e)}
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
                                <div className="lg:flex md:block sm:block space-x-4 pt-2 pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <div className="flex items-center w-full mb-5">
                                        <label htmlFor="" className="w-full ">Date Format<span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className="py-1 block w-full text-xs text-gray-900 border border-gray-300 bg-gray-50 
                                                            focus:ring-blue-500 focus:border-blue-500 
                                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={settingDetails?.date_format || "mm.dd.yyyy"}
                                            onChange={(e) => handleChanges('date_format', e)}
                                        >
                                            <option value={settingDetails?.date_format} >{settingDetails?.date_format}</option>
                                            <option value="mm.dd.yyyy">mm.dd.yyyy</option>
                                            <option value="dd.mm.yy">dd.mm.yy</option>
                                            <option value="mm.d.yy">mm.d.yy</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center w-full mb-5">
                                        <label htmlFor="" className="w-full">Timezone <span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className=" py-1 block w-full text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={settingDetails?.timezone || "(GMT+05:30)Asia,Kolkata"}
                                            onChange={(e) => handleChanges('timezone', e)}
                                        >
                                            <option value={settingDetails?.timezone} >{settingDetails?.timezone}</option>
                                            <option value="(GMT+05:30)Asia,Kolkata">(GMT+05:30)Asia,Kolkata</option>
                                            <option value="GMT+(05:00)Asia,Dubai">GMT+(05:00)Asia,Dubai</option>
                                            <option value="GMT+(05:00)Asia,Dubai">GMT+(05:00)Asia,Dubai</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center w-full mb-5">
                                        <label htmlFor="" className="w-full">Start Day Of Week<span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className="py-1 block w-full text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={settingDetails?.start_week || "Monday"}
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
                                    <div className="flex items-center w-full">
                                        <label htmlFor="" className="mr-2 w-1/3">Currency Format <span className='text-red-400'>*</span></label>
                                        <select
                                            id="small"
                                            className="py-1 block w-full text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={settingDetails?.currency_format || "30,3330"}
                                            onChange={(e) => handleChanges('currency_format', e)}
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
                                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 space-x-4 pt-2">
                                    <div className="flex items-center w-full">
                                        <label htmlFor="" className="w-full">Base Url  <span className='text-red-400'>*</span></label>
                                        <input
                                            type="text"
                                            className="text-xs w-full border border-gray-300 px-2 py-1"
                                            value={settingDetails?.base_url || "https://demo.smart-school.in/"}
                                            onChange={(e) => handleChanges('base_url', e)}
                                        />
                                    </div>
                                    <div className="flex items-center w-full">
                                        <label htmlFor="" className="w-full">File Upload Path <span className='text-red-400'>*</span></label>
                                        <input 
                                            type="text" 
                                            className="text-xs w-full border border-gray-300 py-1" 
                                            value={settingDetails?.file_upload_path || "/var/www/demo.smart-school.in2b53Vh4Dy7G/public_html/"} 
                                            onChange={(e) => handleChanges('file_upload_path', e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='pb-6 border-b border-slate-200/60 dark:border-darkmode-400'>
                                <div className="flex flex-col sm:flex-row items-center p-1 pt-2">
                                    <h2 className="font-normal text-base mr-auto">Position Left</h2>
                                </div>
                                <div className="flex space-x-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            id="default-radio-1" 
                                            type="radio" 
                                            value="Yes" 
                                            name="position-left" 
                                            checked={settingDetails?.position_left === 'Yes'}
                                            onChange={(e) => handleChanges('position_left', e)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        />
                                        <label htmlFor="default-radio-1" className="text-sm text-gray-700 dark:text-gray-300">Yes</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            id="default-radio-2" 
                                            type="radio" 
                                            value="No" 
                                            name="position-left" 
                                            checked={settingDetails?.position_left === 'No'}
                                            onChange={(e) => handleChanges('position_left', e)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        />
                                        <label htmlFor="default-radio-2" className="text-sm text-gray-700 dark:text-gray-300">No</label>
                                    </div>
                                </div>
                            </div>


                            <div className="absolute right-4 bottom-4 size-16 justify-center">
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-8 bg-blue-500 text-white p-1 px-2 rounded">
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="mt-6 h-fit lg:flex sm:flex-row px-5 md:block intro-y ">
            {/* Side Submenu (20%) */}
            <div className="lg:w-1/5 md:w-1/3 bg-white mr-2 ">
                <div className="relative min-h-[200px]">
                    <div className="border-solid border-l-2 border-[#164f63]/60 p-2">
                        {/* Green active indicator */}

                        <div
                            className="absolute left-0 w-[2.4px] h-6 bg-green-600 transition-all duration-300 ease-in-out"
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
            <div className="w-full">{renderContent()}</div>
        </div>
    );
};

export default GeneralSettings;

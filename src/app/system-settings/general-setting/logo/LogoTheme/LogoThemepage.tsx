"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { getGeneralSettingDetails, updateLogo, updateAdminLogo, updateAppLogo, updateSmallLogo } from '../../GeneralSettingData'

const LogoThemepage = () => {

    interface SettingDetails {
        id?: string | number;
        admin_logo?: string;
        admin_small_logo?: string;
        app_logo?: string;
        certificate_logo?: string;
        // Add other properties of the settingDetails object here if needed
    }
    
    const [settingDetails, setSettingDetails] = useState<SettingDetails | null>(null);
    const [loading, setLoading] = useState<string | null>(null);

    const [printLogoFile, setPrintLogoFile] = useState<File | null>(null);
    const [adminLogoFile, setAdminLogoFile] = useState<File | null>(null);
    const [adminSmallLogoFile, setAdminSmallLogoFile] = useState<File | null>(null);
    const [appLogoFile, setAppLogoFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
          try {
            const data = await getGeneralSettingDetails();
            setSettingDetails(data);
            console.log(data)
          } catch (err) {
            console.log(err)
          }
        };
    
        fetchSettings();
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = event.target.files?.[0] || null;
        setFile(file);
    };

    const handlePrintLogo = async () => {
        if (!printLogoFile || !settingDetails?.id) return;
        
        setLoading('print');
        try {
            const formData = new FormData();
            formData.append('id', settingDetails.id.toString());
            formData.append('file', printLogoFile); // Changed from 'printLogoFile' to 'file'
            
            const response = await updateLogo(formData);
            console.log('Print logo updated successfully:', response);
            
            // Refresh settings to get updated logo URL
            const updatedData = await getGeneralSettingDetails();
            setSettingDetails(updatedData);
            setPrintLogoFile(null); // Clear selected file
            
            // Reset file input
            const fileInput = document.getElementById('printLogoInput') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error('Error updating print logo:', error);
        } finally {
            setLoading(null);
        }
    };

    const handleAdminLogo = async () => {
        if (!adminLogoFile || !settingDetails?.id) return;
        
        setLoading('admin');
        try {
            const formData = new FormData();
            formData.append('id', settingDetails.id.toString());
            formData.append('file', adminLogoFile); // Changed from 'adminLogoFile' to 'file'
            
            const response = await updateAdminLogo(formData);
            console.log('Admin logo updated successfully:', response);
            
            // Refresh settings to get updated logo URL
            const updatedData = await getGeneralSettingDetails();
            setSettingDetails(updatedData);
            setAdminLogoFile(null); // Clear selected file
            
            // Reset file input
            const fileInput = document.getElementById('adminLogoInput') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error('Error updating admin logo:', error);
        } finally {
            setLoading(null);
        }
    };

    const handleAdminSmallLogo = async () => {
        if (!adminSmallLogoFile || !settingDetails?.id) return;
        
        setLoading('adminSmall');
        try {
            const formData = new FormData();
            formData.append('id', settingDetails.id.toString());
            formData.append('file', adminSmallLogoFile); // Changed from 'adminSmallLogoFile' to 'file'
            
            const response = await updateSmallLogo(formData);
            console.log('Admin small logo updated successfully:', response);
            
            // Refresh settings to get updated logo URL
            const updatedData = await getGeneralSettingDetails();
            setSettingDetails(updatedData);
            setAdminSmallLogoFile(null); // Clear selected file
            
            // Reset file input
            const fileInput = document.getElementById('adminSmallLogoInput') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error('Error updating admin small logo:', error);
        } finally {
            setLoading(null);
        }
    };

    const handleAppLogo = async () => {
        if (!appLogoFile || !settingDetails?.id) return;
        
        setLoading('app');
        try {
            const formData = new FormData();
            formData.append('id', settingDetails.id.toString());
            formData.append('file', appLogoFile); // Changed from 'appLogoFile' to 'file'
            
            const response = await updateAppLogo(formData);
            console.log('App logo updated successfully:', response);
            
            // Refresh settings to get updated logo URL
            const updatedData = await getGeneralSettingDetails();
            setSettingDetails(updatedData);
            setAppLogoFile(null); // Clear selected file
            
            // Reset file input
            const fileInput = document.getElementById('appLogoInput') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error('Error updating app logo:', error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className='w-full h-full'>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 bg-white shadow-sm p-2">
                {/* Print Logo Card */}
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-900">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Print Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src={settingDetails?.certificate_logo || "https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850"} alt="" />
                        <input 
                            id="printLogoInput"
                            type='file' 
                            accept='image/png,image/jpeg,image/jpg,image/gif'
                            onChange={(e) => handleFileChange(e, setPrintLogoFile)}
                            className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {printLogoFile && (
                            <p className="text-sm text-green-600 mb-2">Selected: {printLogoFile.name}</p>
                        )}
                        <p className="mb-3 pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end items-end'>
                        <button 
                            type="button" 
                            onClick={handlePrintLogo}
                            disabled={loading === 'print' || !printLogoFile}
                            className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
                        >
                            {loading === 'print' ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>

                {/* Admin Logo Card */}
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Admin Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src={settingDetails?.admin_logo || "https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850"} alt="" />
                        <input 
                            id="adminLogoInput"
                            type='file' 
                            accept='image/png,image/jpeg,image/jpg,image/gif'
                            onChange={(e) => handleFileChange(e, setAdminLogoFile)}
                            className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {adminLogoFile && (
                            <p className="text-sm text-green-600 mb-2">Selected: {adminLogoFile.name}</p>
                        )}
                        <p className="mb-3 pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type="button" 
                            onClick={handleAdminLogo}
                            disabled={loading === 'admin' || !adminLogoFile}
                            className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
                        >
                            {loading === 'admin' ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>

                {/* Admin Small Logo Card */}
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Admin Small Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2" src={settingDetails?.admin_small_logo || "https://demo.smart-school.in/uploads/school_content/admin_small_logo/1.png?1743242850"} alt="" />
                        <input 
                            id="adminSmallLogoInput"
                            type='file' 
                            accept='image/png,image/jpeg,image/jpg,image/gif'
                            onChange={(e) => handleFileChange(e, setAdminSmallLogoFile)}
                            className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {adminSmallLogoFile && (
                            <p className="text-sm text-green-600 mb-2">Selected: {adminSmallLogoFile.name}</p>
                        )}
                        <p className="mb-3 pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type="button" 
                            onClick={handleAdminSmallLogo}
                            disabled={loading === 'adminSmall' || !adminSmallLogoFile}
                            className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
                        >
                            {loading === 'adminSmall' ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>

                {/* App Logo Card */}
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>App Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src={settingDetails?.app_logo || "https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850"} alt="" />
                        <input 
                            id="appLogoInput"
                            type='file' 
                            accept='image/png,image/jpeg,image/jpg,image/gif'
                            onChange={(e) => handleFileChange(e, setAppLogoFile)}
                            className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {appLogoFile && (
                            <p className="text-sm text-green-600 mb-2">Selected: {appLogoFile.name}</p>
                        )}
                        <p className="mb-3 pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type="button" 
                            onClick={handleAppLogo}
                            disabled={loading === 'app' || !appLogoFile}
                            className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
                        >
                            {loading === 'app' ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoThemepage;
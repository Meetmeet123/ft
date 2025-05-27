"use client"
import React from 'react';
import { Eye, Image, EyeOff } from "lucide-react";
import { getGeneralSettingDetails, updateClerkSignature, updateExaminerSignature, updatePrincipalSignature, updateClassTeacherSignature } from '../../GeneralSettingData';
import { useState, useEffect } from 'react';

const Signature = () => {
  const [settingDetails, setSettingDetails] = useState(null);
  const [loading, setLoading] = useState(null);

  // File state for each signature
  const [clerkSignFile, setClerkSignFile] = useState(null);
  const [examinerSignFile, setExaminerSignFile] = useState(null);
  const [principalSignFile, setPrincipalSignFile] = useState(null);
  const [classTeacherSignFile, setClassTeacherSignFile] = useState(null);

  // Visibility state for each signature
  const [clerkVisible, setClerkVisible] = useState(false);
  const [examinerVisible, setExaminerVisible] = useState(false);
  const [principalVisible, setPrincipalVisible] = useState(false);
  const [classTeacherVisible, setClassTeacherVisible] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getGeneralSettingDetails();
        console.log(data);
        setSettingDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSettings();
  }, []);

  const handleFileChange = async (event, setFile) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  // You'll need to implement these functions in your GeneralSettingData file
  const handleClerkSignatureUpdate = async () => {
    if (!clerkSignFile || !settingDetails?.id) return;
    
    setLoading('clerk');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', clerkSignFile);
      
      const response = await updateClerkSignature(formData);
      // console.log('Clerk signature updated successfully');
      console.log(response);
      
      // Refresh settings to get updated signature URL
      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setClerkSignFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('clerkSignInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error updating clerk signature:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleExaminerSignatureUpdate = async () => {
    if (!examinerSignFile || !settingDetails?.id) return;
    
    setLoading('examiner');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', examinerSignFile);
      
      const response = await updateExaminerSignature(formData);
      // console.log('Examiner signature updated successfully');
      console.log(response);
      
      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setExaminerSignFile(null);
      
      const fileInput = document.getElementById('examinerSignInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error updating examiner signature:', error);
    } finally {
      setLoading(null);
    }
  };

  const handlePrincipalSignatureUpdate = async () => {
    if (!principalSignFile || !settingDetails?.id) return;
    
    setLoading('principal');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', principalSignFile);
      
      const response = await updatePrincipalSignature(formData);
      // console.log('Principal signature updated successfully');
      console.log(response);
      
      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setPrincipalSignFile(null);
      
      const fileInput = document.getElementById('principalSignInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error updating principal signature:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleClassTeacherSignatureUpdate = async () => {
    if (!classTeacherSignFile || !settingDetails?.id) return;
    
    setLoading('classTeacher');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', classTeacherSignFile);
      
      const response = await updateClassTeacherSignature(formData);
      // console.log('Class teacher signature updated successfully');
      console.log(response);
      
      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setClassTeacherSignFile(null);
      
      const fileInput = document.getElementById('classTeacherSignInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error updating class teacher signature:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='w-full h-full'>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 bg-white shadow-sm p-2">
        
        {/* Clerk Signature Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm font-semibold'>Clerk Signature</h1>
            <div 
              className='flex w-10 h-6 bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'
              onClick={() => setClerkVisible(!clerkVisible)}
            >
              {clerkVisible ? <Eye className='h-4 w-4' /> : <EyeOff className='w-4 h-4' />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {clerkVisible && (
              <img 
                className="m-3 w-45 border border-solid rounded-md p-1" 
                src={settingDetails?.clerk_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} 
                alt="Clerk Signature" 
              />
            )}
            <input
              id="clerkSignInput"
              type='file'
              accept='image/png,image/jpeg,image/jpg,image/gif'
              onChange={(e) => handleFileChange(e, setClerkSignFile)}
              className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {clerkSignFile && (
              <p className="text-sm text-green-600 mb-2">Selected: {clerkSignFile.name}</p>
            )}
            <div className='justify-center'>
              <button 
                type="button" 
                onClick={handleClerkSignatureUpdate}
                disabled={loading === 'clerk' || !clerkSignFile}
                className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
              >
                <Image className="mr-1" />
                {loading === 'clerk' ? 'Updating...' : 'Edit Sign'}
              </button>
            </div>
            <div>
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px)</p>
            </div>
          </div>
        </div>

        {/* Examiner Signature Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm font-semibold'>Examiner Signature</h1>
            <div 
              className='flex w-10 h-6 bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'
              onClick={() => setExaminerVisible(!examinerVisible)}
            >
              {examinerVisible ? <Eye className='h-4 w-4' /> : <EyeOff className='w-4 h-4' />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {examinerVisible && (
              <img 
                className="m-3 w-45 border border-solid rounded-md p-1" 
                src={settingDetails?.examiner_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} 
                alt="Examiner Signature" 
              />
            )}
            <input
              id="examinerSignInput"
              type='file'
              accept='image/png,image/jpeg,image/jpg,image/gif'
              onChange={(e) => handleFileChange(e, setExaminerSignFile)}
              className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {examinerSignFile && (
              <p className="text-sm text-green-600 mb-2">Selected: {examinerSignFile.name}</p>
            )}
            <div className='justify-center'>
              <button 
                type="button" 
                onClick={handleExaminerSignatureUpdate}
                disabled={loading === 'examiner' || !examinerSignFile}
                className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
              >
                <Image className="mr-1" />
                {loading === 'examiner' ? 'Updating...' : 'Edit Sign'}
              </button>
            </div>
            <div>
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px)</p>
            </div>
          </div>
        </div>

        {/* Principal Signature Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm font-semibold'>Principal Signature</h1>
            <div 
              className='flex w-10 h-6 bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'
              onClick={() => setPrincipalVisible(!principalVisible)}
            >
              {principalVisible ? <Eye className='h-4 w-4' /> : <EyeOff className='w-4 h-4' />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {principalVisible && (
              <img 
                className="m-3 w-45 border border-solid rounded-md p-1" 
                src={settingDetails?.principal_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} 
                alt="Principal Signature" 
              />
            )}
            <input
              id="principalSignInput"
              type='file'
              accept='image/png,image/jpeg,image/jpg,image/gif'
              onChange={(e) => handleFileChange(e, setPrincipalSignFile)}
              className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {principalSignFile && (
              <p className="text-sm text-green-600 mb-2">Selected: {principalSignFile.name}</p>
            )}
            <div className='justify-center'>
              <button 
                type="button" 
                onClick={handlePrincipalSignatureUpdate}
                disabled={loading === 'principal' || !principalSignFile}
                className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
              >
                <Image className="mr-1" />
                {loading === 'principal' ? 'Updating...' : 'Edit Sign'}
              </button>
            </div>
            <div>
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px)</p>
            </div>
          </div>
        </div>

        {/* Class Teacher Signature Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm font-semibold'>Class Teacher</h1>
            <div 
              className='flex w-10 h-6 bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'
              onClick={() => setClassTeacherVisible(!classTeacherVisible)}
            >
              {classTeacherVisible ? <Eye className='h-4 w-4' /> : <EyeOff className='w-4 h-4' />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {classTeacherVisible && (
              <img 
                className="m-3 w-45 border border-solid rounded-md p-1" 
                src={settingDetails?.class_teacher || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} 
                alt="Class Teacher Signature" 
              />
            )}
            {/* <input
              id="classTeacherSignInput"
              type='file'
              accept='image/png,image/jpeg,image/jpg,image/gif'
              onChange={(e) => handleFileChange(e, setClassTeacherSignFile)}
              className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            /> */}
            {classTeacherSignFile && (
              <p className="text-sm text-green-600 mb-2">Selected: {classTeacherSignFile.name}</p>
            )}
            <div className='justify-center'>
              <button 
                type="button" 
                onClick={handleClassTeacherSignatureUpdate}
                disabled={loading === 'classTeacher' || !classTeacherSignFile}
                className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none disabled:bg-gray-400"
              >
                <Image className="mr-1" />
                {loading === 'classTeacher' ? 'Updating...' : 'Edit Sign'}
              </button>
            </div>
            <div>
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signature;
"use client"
import React, { useState, useEffect } from 'react';
import { Eye, Image, EyeOff } from "lucide-react";
import {
  getGeneralSettingDetails,
  updateClerkSignature,
  updateExaminerSignature,
  updatePrincipalSignature,
  updateClassTeacherSignature
} from '../../GeneralSettingData';
import { toast, ToastContainer } from 'react-toastify';

interface SettingDetails {
  id: number;
  clerk_sign?: string;
  examiner_sign?: string;
  principal_sign?: string;
  class_teacher?: string;
}

type LoadingType = 'clerk' | 'examiner' | 'principal' | 'classTeacher' | null;

const Signature: React.FC = () => {
  const [settingDetails, setSettingDetails] = useState<SettingDetails | null>(null);
  const [loading, setLoading] = useState<LoadingType>(null);

  // File state for each signature
  const [clerkSignFile, setClerkSignFile] = useState<File | null>(null);
  const [examinerSignFile, setExaminerSignFile] = useState<File | null>(null);
  const [principalSignFile, setPrincipalSignFile] = useState<File | null>(null);
  const [classTeacherSignFile, setClassTeacherSignFile] = useState<File | null>(null);

  // Visibility state for each signature
  const [clerkVisible, setClerkVisible] = useState<boolean>(false);
  const [examinerVisible, setExaminerVisible] = useState<boolean>(false);
  const [principalVisible, setPrincipalVisible] = useState<boolean>(false);
  const [classTeacherVisible, setClassTeacherVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async (): Promise<void> => {
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ): Promise<void> => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const handleClerkSignatureUpdate = async (): Promise<void> => {
    if (!clerkSignFile || !settingDetails?.id) return;

    setLoading('clerk');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', clerkSignFile);

      const response = await updateClerkSignature(formData);

      if (response.success) {
        toast.success("Signature uploaded successfully");
      }

      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setClerkSignFile(null);

      const fileInput = document.getElementById('clerkSignInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      const errStatus = (error as any)?.status;

      if (errStatus === 422) {
        toast.error("Signature can't be uploaded");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(null);
    }
  };


  const handleExaminerSignatureUpdate = async (): Promise<void> => {
    if (!examinerSignFile || !settingDetails?.id) return;

    setLoading('examiner');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', examinerSignFile);

      const response = await updateExaminerSignature(formData);

      if (response.success) {
        toast.success("Signature uploaded successfully");
      }

      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setExaminerSignFile(null);

      const fileInput = document.getElementById('examinerSignInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      const errStatus = (error as any)?.status;

      if (errStatus === 422) {
        toast.error("Signature can't be uploaded");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(null);
    }
  };

  const handlePrincipalSignatureUpdate = async (): Promise<void> => {
    if (!principalSignFile || !settingDetails?.id) return;

    setLoading('principal');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', principalSignFile);

      const response = await updatePrincipalSignature(formData);

      if (response.success) {
        toast.success("Signature uploaded successfully");
      }

      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setPrincipalSignFile(null);

      const fileInput = document.getElementById('principalSignInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      const errStatus = (error as any)?.status;

      if (errStatus === 422) {
        toast.error("Signature can't be uploaded");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(null);
    }
  };

  const handleClassTeacherSignatureUpdate = async (): Promise<void> => {
    if (!classTeacherSignFile || !settingDetails?.id) return;

    setLoading('classTeacher');
    try {
      const formData = new FormData();
      formData.append('id', settingDetails.id.toString());
      formData.append('file', classTeacherSignFile);

      const response = await updateClassTeacherSignature(formData);
      console.log(response);
      if (response.success) {
        toast.success("Signature uploaded successfully");
      }

      const updatedData = await getGeneralSettingDetails();
      setSettingDetails(updatedData);
      setClassTeacherSignFile(null);

      const fileInput = document.getElementById('classTeacherSignInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.log(error)
      const errStatus = (error as any)?.status;

      if (errStatus === 422) {
        toast.error("Signature can't be uploaded");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(null);
    }
  };

  const defaultImageUrl = "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png";

  return (
    <div className='w-full h-full'>
      <ToastContainer />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 bg-white shadow-sm p-2">

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
                src={settingDetails?.clerk_sign || defaultImageUrl}
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
                src={settingDetails?.examiner_sign || defaultImageUrl}
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
                src={settingDetails?.principal_sign || defaultImageUrl}
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
        {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
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
                src={settingDetails?.class_teacher || defaultImageUrl}
                alt="Class Teacher Signature"
              />
            )}
            <input
              id="classTeacherSignInput"
              type='file'
              accept='image/png,image/jpeg,image/jpg,image/gif'
              onChange={(e) => handleFileChange(e, setClassTeacherSignFile)}
              className="mb-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
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
        </div> */}
      </div>
    </div>
  );
};

export default Signature;
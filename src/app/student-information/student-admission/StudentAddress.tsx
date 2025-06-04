// components/StudentAddressForm.tsx
"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  file: File | null;
}

interface FormData {
  isGuardianAddressCurrent: boolean;
  isPermanentAddressCurrent: boolean;
  currentAddress: string;
  permanentAddress: string;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
  nationalIdNumber: string;
  localIdNumber: string;
  rte: 'Yes' | 'No';
  previousSchoolDetails: string;
  note: string;
  documents: Document[];
}

export default function StudentAddressForm() {
  const [formData, setFormData] = useState<FormData>({
    isGuardianAddressCurrent: false,
    isPermanentAddressCurrent: false,
    currentAddress: '',
    permanentAddress: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    nationalIdNumber: '',
    localIdNumber: '',
    rte: 'Yes',
    previousSchoolDetails: '',
    note: '',
    documents: [
      { id: 1, title: '', file: null },
      { id: 2, title: '', file: null },
      { id: 3, title: '', file: null },
      { id: 4, title: '', file: null },
    ]
  });

  const [displayStudentAddressForm, setDisplayStudentAddressForm] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (id: number, e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      documents: formData.documents.map(doc => 
        doc.id === id ? { ...doc, file } : doc
      )
    });
  };

  const handleTitleChange = (id: number, e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFormData({
      ...formData,
      documents: formData.documents.map(doc => 
        doc.id === id ? { ...doc, title: value } : doc
      )
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You would typically send this data to an API endpoint here
  };

  return (
    <div className="w-full">
      <div 
        onClick={() => setDisplayStudentAddressForm(!displayStudentAddressForm)}
        className='w-full flex items-center justify-between p-4 bg-blue-200 h-20 mt-5 mb-10 cursor-pointer text-xl'
      >
        <h2 className='bold'>Add More Details</h2>
        <button type="button"><Plus /></button>
      </div>
      
      {displayStudentAddressForm && (
        <div className="max-w-6xl mx-auto mt-4 p-6 bg-white rounded shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Student Address Details */}
            <div className="border rounded mb-6">
              <div className="bg-gray-100 p-3 border-b">
                <h2 className="text-lg font-semibold">Student Address Details</h2>
              </div>
              <div className="p-4">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
                  {/* Guardian Address Section */}
                  <div className="w-full">
                    <div className="mb-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="isGuardianAddressCurrent"
                          checked={formData.isGuardianAddressCurrent}
                          onChange={handleInputChange}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">If Guardian Address Is Current Address</span>
                      </label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Current Address</label>
                      <input
                        type="text"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                  </div>

                  {/* Permanent Address Section */}
                  <div className="w-full">
                    <div className="mb-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="isPermanentAddressCurrent"
                          checked={formData.isPermanentAddressCurrent}
                          onChange={handleInputChange}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">If Permanent Address Is Current Address</span>
                      </label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Permanent Address</label>
                      <input
                        type="text"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Miscellaneous Details */}
            <div className="border rounded mb-6">
              <div className="bg-gray-100 p-3 border-b">
                <h2 className="text-lg font-semibold">Miscellaneous Details</h2>
              </div>
              <div className="p-4">
                {/* Bank details section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Bank Account Number</label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">IFSC Code</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                </div>

                {/* ID and RTE section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">National Identification Number</label>
                    <input
                      type="text"
                      name="nationalIdNumber"
                      value={formData.nationalIdNumber}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Local Identification Number</label>
                    <input
                      type="text"
                      name="localIdNumber"
                      value={formData.localIdNumber}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">RTE</label>
                    <div className="flex flex-wrap space-x-4 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="rte"
                          value="Yes"
                          checked={formData.rte === 'Yes'}
                          onChange={handleInputChange}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="rte"
                          value="No"
                          checked={formData.rte === 'No'}
                          onChange={handleInputChange}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Textarea section */}
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Previous School Details</label>
                    <textarea
                      name="previousSchoolDetails"
                      value={formData.previousSchoolDetails}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Note</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 h-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="border rounded mb-6">
              <div className="bg-gray-100 p-3 border-b">
                <h2 className="text-lg font-semibold">Upload Documents</h2>
              </div>
              <div className="p-4">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4">
                  {[1, 2].map((num) => (
                    <div key={`doc-${num}`} className="flex items-center">
                      <div className="w-12 text-center">{num}.</div>
                      <div className="flex-grow mr-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={formData.documents.find(d => d.id === num)?.title || ''}
                          onChange={(e) => handleTitleChange(num, e)}
                          className="w-full border rounded p-2"
                        />
                      </div>
                      <div className="flex-grow">
                        <label className="flex items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span className="ml-2 text-sm text-gray-500">
                              {formData.documents.find(d => d.id === num)?.file ? 
                                formData.documents.find(d => d.id === num)?.file?.name : 
                                'Drag and drop a file here or click'}
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(num, e)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4 mt-4">
                  {[3, 4].map((num) => (
                    <div key={`doc-${num}`} className="flex items-center">
                      <div className="w-12 text-center">{num}.</div>
                      <div className="flex-grow mr-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={formData.documents.find(d => d.id === num)?.title || ''}
                          onChange={(e) => handleTitleChange(num, e)}
                          className="w-full border rounded p-2"
                        />
                      </div>
                      <div className="flex-grow">
                        <label className="flex items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span className="ml-2 text-sm text-gray-500">
                              {formData.documents.find(d => d.id === num)?.file ? 
                                formData.documents.find(d => d.id === num)?.file?.name : 
                                'Drag and drop a file here or click'}
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(num, e)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
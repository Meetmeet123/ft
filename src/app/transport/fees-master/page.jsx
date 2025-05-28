"use client";
import { useState } from 'react';

export default function TransportFeesMaster() {
  const months = [
    'April', 'May', 'June', 'July', 'August', 'September', 
    'October', 'November', 'December', 'January', 'February', 'March'
  ];

  const [selectFineType,setSelectFineType] = useState(false);
  const [recordSaved, setRecordSaved] = useState(false);

  const [copyAll, setCopyAll] = useState(false);
  const [feeDetails, setFeeDetails] = useState(
    months.map(month => ({
      month,
      dueDate: getDefaultDueDate(month),
      fineType: selectFineType ? 'percentage' : 'none',
      percentage: '10.00',
      fixAmount: ''
    }))
  );

  function getDefaultDueDate(month) {
    const monthMap = {
      'April': '04/05/2025',
      'May': '05/05/2025',
      'June': '06/05/2025',
      'July': '07/05/2025',
      'August': '08/05/2025',
      'September': '09/05/2025',
      'October': '10/05/2025',
      'November': '11/05/2025',
      'December': '12/05/2025',
      'January': '01/05/2026',
      'February': '02/05/2026',
      'March': '03/05/2026',
    };
    return monthMap[month];
  }

  const handleFineTypeChange = (index, type) => {
    const updatedFeeDetails = [...feeDetails];
    updatedFeeDetails[index].fineType = type;
    setFeeDetails(updatedFeeDetails);

    if (copyAll && index === 0) {
      const newDetails = feeDetails.map((detail, i) => {
        if (i > 0) {
          return { ...detail, fineType: type };
        }
        return detail;
      });
      setFeeDetails(newDetails);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedFeeDetails = [...feeDetails];
    updatedFeeDetails[index][field] = value;
    setFeeDetails(updatedFeeDetails);

    if (copyAll && index === 0) {
      const newDetails = feeDetails.map((detail, i) => {
        if (i > 0) {
          return { ...detail, [field]: value };
        }
        return detail;
      });
      setFeeDetails(newDetails);
    }
  };

  const handleCopyAllChange = (e) => {
    setCopyAll(e.target.checked);
    setSelectFineType(!selectFineType);
    if (e.target.checked) {
      const firstMonthDetails = feeDetails[0];
      const newDetails = feeDetails.map((detail, index) => {
        if (index > 0) {
          return {
            ...detail,
            fineType: 'percentage',
            percentage: firstMonthDetails.percentage,
            fixAmount: firstMonthDetails.fixAmount
          };
        }
        return detail;
      });
      setFeeDetails(newDetails);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 w-full mx-auto">
      <h1 className="text-lg md:text-xl font-medium text-gray-800 mb-4">Transport Fees Master</h1>
      {recordSaved && <div className="w-full bg-green-100 border border-green-300 rounded-md p-4 md:p-6 mx-auto mb-3">
        <h3 className="text-green-700 text-center font-medium text-sm md:text-base">
            ✅ Record Saved Successfully
        </h3>
        </div>}
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={copyAll}
            onChange={handleCopyAllChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Copy First Fees Detail For All Months</span>
        </label>
      </div>

      <div className="border-t border-gray-200">
        {feeDetails.map((detail, index) => (
          <div key={detail.month} className="border-b border-gray-200 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-start">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 font-medium text-gray-700">{detail.month}</div>
              <div className='lg:flex md:block sm:block justify-center gap-10 items-center'>
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <div className="space-y-1">
                    <label className="block text-sm text-gray-700">Due Date</label>
                    <input
                      type="text"
                      value={detail.dueDate}
                      onChange={(e) => handleInputChange(index, 'dueDate', e.target.value)}
                      className="block w-[100px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="space-y-1">
                    <label className="block text-sm text-gray-700">Fine Type</label>
                    <div className="lg:flex md:block sm:block items-center gap-10 sm:items-center">
                      <div className="flex items-center">
                        <input
                          id={`none-${index}`}
                          type="radio"
                          name={`fine-type-${index}`}
                          checked={detail.fineType === 'none'}
                          onChange={() => handleFineTypeChange(index, 'none')}
                          className="h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={`none-${index}`} className="ml-2 block text-sm text-gray-700">
                          None
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id={`percentage-${index}`}
                          type="radio"
                          name={`fine-type-${index}`}
                          checked={detail.fineType === 'percentage'}
                          onChange={() => handleFineTypeChange(index, 'percentage')}
                          className="h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={`percentage-${index}`} className="ml-2 block text-sm text-gray-700">
                          Percentage (%)
                        </label>
                        <div className="ml-2 w-36">
                          <input
                            type="text"
                            value={detail.percentage}
                            onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
                            disabled={detail.fineType !== 'percentage'}
                            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id={`fixAmount-${index}`}
                          type="radio"
                          name={`fine-type-${index}`}
                          checked={detail.fineType === 'fixAmount'}
                          onChange={() => handleFineTypeChange(index, 'fixAmount')}
                          className="h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={`fixAmount-${index}`} className="ml-2 block text-sm text-gray-700">
                          Fix Amount ($)
                        </label>
                        <div className="ml-2 w-36">
                          <input
                            type="text"
                            value={detail.fixAmount}
                            onChange={(e) => handleInputChange(index, 'fixAmount', e.target.value)}
                            disabled={detail.fineType !== 'fixAmount'}
                            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='w-full my-10 flex justify-end' >
            <button
            onClick={()=>{
                setRecordSaved(true);
                setTimeout(() => {
                    setRecordSaved(false);
                }, 3000);
            }}
            className='btn btn-primary' >Save</button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState,useEffect } from 'react';
import { ChevronLeft, Printer, Download, Plus, FileText, Copy, Database, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import fees from './FeesDetails';
import { notEqual } from 'assert';

export default function StudentFees() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [student,setStudent] = useState();
  const searchParams=useSearchParams();
  const [showFeesCollect,setFeesCollect]=useState(false);
  const [showAddFees,setShowAddFees]=useState(false);

  const studentInfo = fees;
  
  interface Fee {
    id: number;
    description: string;
    dueDate: string;
    status: string;
    amount: number;
    additional: number;
    discount: number;
    fine: number;
    paid: number;
    balance: number;
    [key: string]: any;
  }

  interface CollectFeesProps {
    onClose: () => void;
  }

  interface AddFeesModelProps {
    onClose: () => void;
  }

  const toggleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  const toggleSelectAll = () => {
    if (selectedRows.length === fees.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(fees.map(fee => fee.id));
    }
  };
  
  const currentDate = "04/16/2025";

  const handlePrintSelected=()=>{
    if (!studentInfo || studentInfo.length === 0) return;
  
    // const headers = Object.keys(studentInfo[0]);
    // let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // // Headers
    // headers.forEach(header => {
    //   table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    // });
    // table += '</tr></thead><tbody>';
  
    // // Rows
    // studentInfo.forEach(row => {
    //   table += '<tr>';
    //   headers.forEach(header => {
    //     selectedRows.includes(row.id) && (table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`);
    //   });
    //   table += '</tr>';
    // });
  
    // table += '</tbody></table>';
  
    // const printWindow = window.open('', '_blank');
    // if (printWindow) {
    //   printWindow.document.write(`
    //     <html>
    //       <head>
    //         <title>Fees Collection</title>
    //       </head>
    //       <body>
    //         <h2>Collect Fees</h2>
    //         ${table}
    //         <script>
    //           window.onload = function () {
    //             window.print();
    //             window.onafterprint = function () {
    //               window.close();
    //             };
    //           };
    //         </script>
    //       </body>
    //     </html>
    //   `);
    //   printWindow.document.close();
    // }
  };

  const handleExportExcel=()=>{
    if(!studentInfo || studentInfo.length===0) return;

    const headers = Object.keys(studentInfo[0]);
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    studentInfo.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        selectedRows.includes(row.id) && (table += `<td>${(row as Record<string, any>)[header] ?? ''}</td>`);
      });
      table += '</tr>';
    });
  
    table += '</table>';
  
    const blob = new Blob([`
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>${table}</body></html>
    `], {
      type: 'application/vnd.ms-excel'
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fees.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  const handleCopy = () => {
    if (!studentInfo || studentInfo.length === 0) return;
  
    const jsonText = JSON.stringify(studentInfo, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  interface CollectFeesProps {
    onClose: () => void;
  }

  function CollectFees(props: CollectFeesProps) {
    return (
      <div className="fixed inset-0 flex items-center shadow-10 justify-center p-4 z-50">
        <div className="w-1/2 max-w-xl bg-white p-6 shadow-lg rounded space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Collect Fees</h2>
            <button>
              <X className="w-5 h-5" onClick={() => { props.onClose() }} />
            </button>
          </div>

          {/* Form Body */}
          <div className="space-y-4">
            {/* Date Input */}
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input type="text" className="w-full border p-2 rounded" />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-medium mb-1">Payment</label>
              <div className="grid lg:grid-cols-5 md-grid-cols-2 sm:grid-cols-1 gap-2 p-0">
                {['Check', 'DD', 'Bank Transfer', 'UPI', 'Card'].map((method: string, index: number) => (
                  <label key={index} className="flex items-center gap-1">
                    <input type="radio" name="payment" /> {method}
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block font-medium mb-1">Note</label>
              <textarea className="w-full border p-2 rounded h-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  interface AddFeesModelProps {
    onClose: () => void;
  }

  interface PaymentModeOption {
    label: string;
    value: string;
  }

  const paymentModes: PaymentModeOption[] = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Cheque', value: 'Cheque' },
    { label: 'DD', value: 'DD' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Card', value: 'Card' },
  ];

  function AddFeesModel(props: AddFeesModelProps) {
    const [selectedMode, setSelectedMode] = useState<string>('Cash');
    const [fees, setFees] = useState<number>(350.00); // Assuming fees is 350
    const [date, setDate] = useState<string>('4/10/2025');
    const [payingAmount, setPayingAmount] = useState<number>(10000);
    const [availableCount, setAvailableCount] = useState<number>(10); // Sample value
    const [value, setValue] = useState<number>(100.00); // Sample value
    const [discount, setDiscount] = useState<number>(120);
    const [fine, setFine] = useState<number>(98);
    const [note, setNote] = useState<string>('None');

    const exportExcel = (): void => {
      const headers: string[] = ["Fees", "Date", "Paying Amount", "Available Count", "Value", "Discount", "Fine", "Note"];

      let table = '<table><tr>';
      headers.forEach(header => {
        table += `<th>${header}</th>`;
      });
      table += '</tr>';

      table += '<tr>';
      // [fees,date,payingAmount,availableCount,value,discount,fine,note].forEach(temp=>{
      //   table+=`<td>${temp}</td>`
      // })
      table += '</tr>';
      const blob = new Blob([`
        <html xmlns:o="urn:schemas-microsoft-com:office:office" 
              xmlns:x="urn:schemas-microsoft-com:office:excel" 
              xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="UTF-8"></head>
        <body>${table}</body></html>
      `], {
        type: 'application/vnd.ms-excel'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fees';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    return (
      <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white w-full max-w-4xl rounded shadow-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg md:text-xl font-semibold">
              Class 1 General (May Month Fees): <span className="font-normal">may-month-fees</span>
            </h2>
            <button onClick={() => props.onClose()}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-4 text-sm md:text-base">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Fees ($)</label>
                <span>{fees.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="border rounded p-2 w-2/3"
                  value={date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Paying Amount ($) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border rounded p-2 w-2/3"
                  value={payingAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayingAmount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Discount Section */}
            <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="font-medium">Discount Group</label>
                <div className="flex items-center mt-2 space-x-2">
                  <input type="checkbox" id="topper" />
                  <label htmlFor="topper" className="text-sm">
                    Class Topper Discount (cls-top-disc)
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="block font-medium">Available Count</label>
                  <p>{availableCount}</p>
                </div>
                <div>
                  <label className="block font-medium">Value</label>
                  <p>${value.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Discount and Fine Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">
                  Discount ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  value={discount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block font-medium">
                  Fine ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  value={fine}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFine(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block font-medium mb-1">Payment Mode</label>
              <div className="flex flex-wrap gap-4">
                {paymentModes.map((mode) => (
                  <label key={mode.value} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="payment"
                      value={mode.value}
                      checked={selectedMode === mode.value}
                      onChange={() => setSelectedMode(mode.value)}
                    />
                    {mode.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block font-medium">Note</label>
              <textarea
                className="border rounded p-2 w-full h-24"
                value={note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
              />
            </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-between items-center mt-4">
          <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
          <div className="flex gap-2">
            <button className="btn btn-primary bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              $ Collect Fees
            </button>
            <button 
            onClick={handlePrintSelected}
            className="btn btn-primary bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              $ Collect & Print
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Student Fees</h1>
          <button
          onClick={()=>window.history.back()}
           className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md flex items-center text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>
        
        

        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 md:p-6 grid lg:grid-cols-3 md-grid-cols-2 sm:grid-cols-1">
            <div className="flex-none mb-4 md:mb-0 md:mr-6">
              <div className="bg-gray-200 w-24 h-full w-1/2 rounded-lg flex items-center justify-center">
                <svg className="text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <p className="font-medium text-gray-600">Emma Thomas</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Class (Section)</p>
                <p className="font-medium text-gray-600">5</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Father Name</p>
                <p className="font-medium text-gray-600">Father</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Admission No</p>
                <p className="font-medium text-gray-600">1200037</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Mobile Number</p>
                <p className="font-medium text-gray-600">9783749223</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Roll Number</p>
                <p className="font-medium text-gray-600">422988338923</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">Category</p>
                <p className="font-medium text-gray-600">None</p>
              </div>
              <div className='grid grid-cols-2 items-center gap-5' >
                <p className="text-gray-600 text-sm mb-1">RTE</p>
                <p className="font-medium text-red-500 text-gray-600">rtee</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions Bar */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex space-x-2 gap-4">
            <button 
            onClick={handlePrintSelected}
            className=" bg-gray-200 border hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-md flex items-center text-sm">
              <Printer className="h-4 w-4 mr-2"/>
              Print Selected
            </button>
            <button 
            onClick={()=>setFeesCollect(true)}
            className=" bg-yellow-500 border hover:bg-yellow-600 px-3 py-2 rounded-md flex items-center text-sm">
              Collect Selected
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Date: {currentDate}
          </div>
        </div>
        
        {showFeesCollect && <CollectFees onClose={()=>setFeesCollect(false)} />}

        {/* Document Icons */}
        <div className="flex justify-end mb-4 space-x-2 gap-4">
          {[<Database className='w-5 h-5' />,
           <Download className='w-5 h-5'/>, 
           <Copy className='w-5 h-5' />, 
           <Printer className='w-5 h-5' />].map((type, index) => (
            <button key={index} 
            onClick={()=>{
              if(index===0 || index===1) handleExportExcel();
              else if(index===2) handleCopy();
              else handlePrintSelected();
            }}
            className="text-gray-500 hover:text-gray-700">
              {type}
            </button>
          ))}
        </div>
        
        {/* Fees Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4"
                    checked={selectedRows.length === fees.length && fees.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fees</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Due Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount ($)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mode</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Discount ($)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fine ($)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Paid ($)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Balance ($)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4"
                      checked={selectedRows.includes(fee.id)}
                      onChange={() => toggleSelectRow(fee.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm">{fee.description}</td>
                  <td className="px-4 py-3 text-sm">{fee.dueDate}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {fee.amount}
                    {fee.additional > 0 && <span className="text-red-500"> + {fee.additional}</span>}
                  </td>
                  <td className="px-4 py-3 text-sm"></td>
                  <td className="px-4 py-3 text-sm"></td>
                  <td className="px-4 py-3 text-sm"></td>
                  <td className="px-4 py-3 text-sm">{fee.discount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{fee.fine.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{fee.paid.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{fee.balance.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-4 space-x-1">
                      <button
                      onClick={()=>setShowAddFees(true)}
                       className="text-blue-500 hover:text-blue-700">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button 
                      onClick={handlePrintSelected}
                      className="text-gray-500 hover:text-gray-700">
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAddFees && <AddFeesModel onClose={()=>setShowAddFees(false)} />}
      </div>
    </div>
  );
}
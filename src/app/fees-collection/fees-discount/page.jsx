'use client';
import { useState } from 'react';
import { Edit, Trash2, Search, Download, FileText, Printer, Grid, Copy, TagIcon } from 'lucide-react';
import Link from 'next/link';

export default function FeesDiscount() {
  const [discountType, setDiscountType] = useState('fixed');
  const [name,setName]=useState("");
  const [discountCode,setDiscountCode]=useState("");
  const [amount,setAmount]=useState("");
  const [useNumberCount,setUseNumberCount]=useState("");
  const [save,setSave]=useState(false);

  const [showContent,setShowContent]=useState(Array(7).fill(true))
  const [showGrid,setShowGrid]=useState(false);

  const [discounts,setDiscounts] = useState([
    { name: 'Sibling Discount', code: 'sibling-disc', percentage: '', amount: '500.00', count: 5, expiry: '04/10/2025' },
    { name: 'Handicapped Discount', code: 'handicap-disc', percentage: '', amount: '1000.00', count: 5, expiry: '04/15/2025' },
    { name: 'Class Topper Discount', code: 'cls-top-disc', percentage: '', amount: '100.00', count: 10, expiry: '' }
  ]);


const handleExportExcel = () => {
    if (discounts.length === 0) return;
  
    const headers = Object.keys(discounts[0]);
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    discounts.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td>${row[header] ?? ''}</td>`;
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
    a.download = 'Fees Discount.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  


  const handlePrint = () => {
    if (!discounts || discounts.length === 0) return;
  
    const headers = Object.keys(discounts[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    discounts.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });
  
    table += '</tbody></table>';
  
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Payment Requests</title>
        </head>
        <body>
          <h2>Fees Discount</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopy = () => {
    if (!discounts || discounts.length === 0) return;
  
    const jsonText = JSON.stringify(discounts, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };
  

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="lg:flex md:block w-full gap-6">
        {/* Form */}
        <div className="bg-white lg:w-1/3 rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Fees Discount</h2>

          <div className="mb-4">
            <label className="block font-medium">Name <span className="text-red-500">*</span></label>
            <input type="text" className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
            {(save && name==="") && <p className="text-sm text-red-600 mt-1">The Name field is required.</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Discount Code <span className="text-red-500">*</span></label>
            <input type="text" className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
            {(save && discountCode==="") && <p className="text-sm text-red-600 mt-1">The Discount Code field is required.</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Discount Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountType"
                  value="percentage"
                  checked={discountType === 'percentage'}
                  onChange={() => setDiscountType('percentage')}
                />
                Percentage
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountType"
                  value="fixed"
                  checked={discountType === 'fixed'}
                  onChange={() => setDiscountType('fixed')}
                />
                Fix Amount
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Percentage (%)</label>
              <input type="text" disabled={discountType !== 'percentage'} className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
            </div>
            <div>
              <label className="block font-medium">Amount ($) <span className="text-red-500">*</span></label>
              <input type="text" disabled={discountType !== 'fixed'} className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
              {(save && amount!=="") && <p className="text-sm text-red-600 mt-1">The Amount field is required.</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Number Of Use Count <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
              {(save && useNumberCount==="") && <p className="text-sm text-red-600 mt-1">The Number Of Use Count field is required.</p>}
            </div>
            <div>
              <label className="block font-medium">Expiry Date</label>
              <input type="date" className="input w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea rows={3} className="input w-full border p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white"></textarea>
          </div>

          <div 
          onClick={()=>setSave(true)}
          className='flex justify-end' >
            <button className="btn btn-primary bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 focus:outline-none focus:bg-blue-600 focus:text-white">
                Save
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded shadow p-6 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Fees Discount List</h2>
            <div className="flex gap-2">
              <Download onClick={handleExportExcel} size={18} className="text-gray-600 hover:text-black cursor-pointer" />
              <FileText onClick={handleExportExcel} size={18} className="text-gray-600 hover:text-black cursor-pointer" />
              <Copy onClick={handleCopy} size={18} className='text-gray-600 hover:text-black cursor-pointer' />
              <Printer onClick={handlePrint} size={18} className="text-gray-600 hover:text-black cursor-pointer" />
              <Grid onClick={()=>setShowGrid(!showGrid)} size={18} className="text-gray-600 hover:text-black cursor-pointer" />
            </div>
          </div>

          {showGrid && <div className='relative flex justify-end w-full items-center gap-4 m-4'>
            {
                ["Name","Discount Code","Percentage","Amount","No. of Count","Expire","Action"].map((btnName,index)=>(
                    <button 
                    key={index} 
                    onClick={()=>{
                        const temp=[...showContent]
                        temp[index]=!temp[index]
                        setShowContent(temp)
                    }}
                    className={`p-3 rounded focus:outline-none focus:ring-none ${showContent[index] && 'btn-primary'} `} >{btnName}</button>
                ))
            }
            </div>}

          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white"
            />
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                <tr>
                    {
                        ["Name","Discount Code","Percentage","Amount","No. of Count","Expire","Action"].map((btnName,index)=>(
                            showContent[index] && <th className="px-4 py-2 text-left" key={index}>{btnName}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {discounts.map((item, idx) => (
                    <tr key={idx} className="border-t">
                    {showContent[0] && <td className="px-4 py-2">{item.name}</td>}
                    {showContent[1] && <td className="px-4 py-2">{item.code}</td>}
                    {showContent[2] && <td className="px-4 py-2">{item.percentage}</td>}
                    {showContent[3] && <td className="px-4 py-2">{item.amount}</td>}
                    {showContent[4] && <td className="px-4 py-2">{item.count}</td>}
                    {showContent[5] && <td className="px-4 py-2">{item.expiry}</td>}
                    {showContent[6] && <td className="px-4 py-2">
                        <div className="flex gap-2">
                        <button>
                            <Link href='/fees-collection/fees-discount/assign-fees-discount' >
                                <TagIcon size={16} className='text-blue-600 hover:text-blue-800' />
                            </Link>
                        </button>
                        <button>
                            <Edit size={16} className="text-blue-600 hover:text-blue-800" />
                        </button>
                        <button>
                            <Trash2
                            onClick={()=>{
                                setDiscounts(discounts.filter((_,i)=>i!==idx))
                            }}
                             size={16} className="text-red-600 hover:text-red-800" />
                        </button>
                        </div>
                    </td>}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>


          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
            <div>Records: 1 to 3 of 3</div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded">‹</button>
              <span className="px-3 py-1 border rounded bg-gray-100">1</span>
              <button className="px-2 py-1 border rounded">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

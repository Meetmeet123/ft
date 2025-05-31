"use client";
import React, { useState } from 'react';
import { Download, Database, Printer, Copy, Grid, Edit } from "lucide-react";

function BankAccount() {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [feesTypeList, setFeesTypeList] = useState([
    {
      accountHolder: "asr",
      bankAccountNumber: "032411011003",
      bankName: "bank of india",
      bankBranchName: "BODA",
      status: false,
    },
    {
      accountHolder: "Ashok Singh Rajput",
      bankAccountNumber: "03211100023",
      bankName: "",
      bankBranchName: "bkid009969",
      status: true,
    },
    {
      accountHolder: "ashok",
      bankAccountNumber: "098765433",
      bankName: "",
      bankBranchName: "india",
      status: false,
    },
    {
      accountHolder: "Roshan",
      bankAccountNumber: "1233245345",
      bankName: "ICICI bank",
      bankBranchName: "Hyderabad",
      status: true,
    },
  ]);

  const [showGrid, setShowGrid] = useState(Array(6).fill(true));
  const [toggleGrid, setToggleGrid] = useState(false);

  const downloadCSV = () => {
    const headers = [
      "Account Holder",
      "Bank Account Number",
      "Bank Name",
      "Bank Branch Name",
      "Status",
    ];
    const rows = feesTypeList.map((item) => [
      item.accountHolder,
      item.bankAccountNumber,
      item.bankName,
      item.bankBranchName,
      item.status ? "Active" : "Inactive",
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bankAccounts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    if (!feesTypeList.length) return;
    const jsonText = JSON.stringify(feesTypeList, null, 2);
    navigator.clipboard
      .writeText(jsonText)
      .then(() => alert("JSON data copied to clipboard"))
      .catch((err) => console.error("Failed to copy JSON: ", err));
  };

  const handlePrint = () => {
    if (!feesTypeList.length) return;
    const headers = Object.keys(feesTypeList[0]);
    let table =
      '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
    headers.forEach((header) => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += "</tr></thead><tbody>";
    feesTypeList.forEach((row) => {
      table += "<tr>";
      headers.forEach((header) => {
        table += `<td style="padding: 8px;">${row[header] ?? ""}</td>`;
      });
      table += "</tr>";
    });
    table += "</tbody></table>";
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Print Bank Accounts</title></head>
        <body>
          <h2>Bank Account Details</h2>
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

  const filteredList = feesTypeList.filter(
    (item) =>
      item.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bankAccountNumber.includes(searchTerm) ||
      item.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bankBranchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:flex md:block gap-4">
      {/* Form */}
      <div className="lg:w-1/3 md:w-full shadow p-4">
        <h3 className="py-4 text-xl font-semibold">Add Bank Account</h3>
        <div className="space-y-4">
          <div>
            <label>Account Holder Name <span className="text-red-600">*</span></label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full mt-1 rounded border px-3 py-2"
            />
          </div>
          <div>
            <label>Bank Account Number <span className="text-red-600">*</span></label>
            <input
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
              type="text"
              className="w-full mt-1 rounded border px-3 py-2"
            />
          </div>
          <div>
            <label>IFSC Code <span className="text-red-600">*</span></label>
            <input
              onChange={(e) => setIFSCCode(e.target.value)}
              value={IFSCCode}
              type="text"
              className="w-full mt-1 rounded border px-3 py-2"
            />
          </div>
          <div>
            <label>Bank Name <span className="text-red-600">*</span></label>
            <input
              onChange={(e) => setBankName(e.target.value)}
              value={bankName}
              type="text"
              className="w-full mt-1 rounded border px-3 py-2"
            />
          </div>
          <div>
            <label>Bank Branch Name <span className="text-red-600">*</span></label>
            <input
              onChange={(e) => setBranchName(e.target.value)}
              value={branchName}
              type="text"
              className="w-full mt-1 rounded border px-3 py-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
            />
            <label>Is Primary</label>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                // Save logic can be implemented here
                alert("Bank account saved (logic to be implemented)");
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full mt-6 lg:mt-0">
        <h3 className="py-4 text-xl font-semibold">Bank Account List</h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <input
            placeholder="Search..."
            className="border-b px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-3">
            <button onClick={downloadCSV}><Database size={18} /></button>
            <button onClick={downloadCSV}><Download size={18} /></button>
            <button onClick={handleCopy}><Copy size={18} /></button>
            <button onClick={handlePrint}><Printer size={18} /></button>
            <button onClick={() => setToggleGrid(!toggleGrid)}><Grid size={18} /></button>
          </div>
        </div>

        {/* Column Toggle */}
        {toggleGrid && (
          <div className="mt-4 mb-5 flex flex-wrap gap-2">
            {["Account Holder", "Bank Account Number", "Bank Name", "Bank Branch Name", "Status", "Action"].map((heading, index) => (
              <button
                key={index}
                onClick={() => {
                  const updatedGrid = [...showGrid];
                  updatedGrid[index] = !updatedGrid[index];
                  setShowGrid(updatedGrid);
                }}
                className={`btn px-3 py-1 rounded border ${showGrid[index] ? "bg-blue-600 text-white" : "bg-white border-gray-300"}`}
              >
                {heading}
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="overflow-auto mt-4">
          <table className="w-full min-w-[700px] border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {["Account Holder", "Bank Account Number", "Bank Name", "Bank Branch Name", "Status", "Action"].map((head, index) =>
                  showGrid[index] ? (
                    <th key={index} className="px-4 py-3 text-left border-b font-semibold">{head}</th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  {showGrid[0] && <td className="px-4 py-2">{item.accountHolder}</td>}
                  {showGrid[1] && <td className="px-4 py-2">{item.bankAccountNumber}</td>}
                  {showGrid[2] && <td className="px-4 py-2">{item.bankName}</td>}
                  {showGrid[3] && <td className="px-4 py-2">{item.bankBranchName}</td>}
                  {showGrid[4] && (
                    <td className="px-4 py-2">
                      <div
                        onClick={() => {
                          const updated = [...feesTypeList];
                          updated[index].status = !updated[index].status;
                          setFeesTypeList(updated);
                        }}
                        className={`h-7 w-14 border rounded-full cursor-pointer flex items-center px-1 transition-all duration-300 ${
                          item.status ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`relative h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                            item.status ? "left-7" : "left-0"
                          }`}
                        ></div>
                      </div>
                    </td>
                  )}
                  {showGrid[5] && (
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline">
                        <Edit size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BankAccount;

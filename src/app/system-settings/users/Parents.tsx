import React, { useState, useEffect } from "react";
import parentsData from "./ParentsData";
import { ChevronDown, Printer, Database, Download } from "lucide-react";

interface ParentType {
  "Guardian Name": string;
  "Guardian Phone": string;
  Username: string;
  Action: boolean;
}

function Parents() {
  const [parents, setParents] = useState<ParentType[]>(parentsData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredParents, setFilteredParents] = useState<ParentType[]>(parentsData);

  useEffect(() => {
    const filtered = parents.filter((p) =>
      Object.values(p).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredParents(filtered);
  }, [searchQuery, parents]);

  const toggleAction = (username: string) => {
    const updated = parents.map((p) =>
      p.Username === username ? { ...p, Action: !p.Action } : p
    );
    setParents(updated);
  };

  const handleCopyClick = () => {
    const text = JSON.stringify(filteredParents, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert("Data copied to clipboard!");
    });
  };

  const handleDownloadClick = () => {
    const csv = [
      ["Guardian Name", "Guardian Phone", "Username", "Action"],
      ...filteredParents.map(p => [
        p["Guardian Name"],
        p["Guardian Phone"],
        p.Username,
        p.Action ? "Active" : "Inactive"
      ])
    ]
    .map(row => row.map(value => `"${value}"`).join(","))
    .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "parents_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = () => {
    const printContent = document.getElementById("print-section")?.innerHTML;
    if (!printContent) return;
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f9f9f9; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      {/* Search Field */}
      <div className="relative flex w-full sm:w-1/3 mb-4">
        <input
          type="text"
          placeholder="Search Parents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/4 pl-10 pr-4 py-2 border rounded w-full"
        />
        <div className="ml-auto flex items-center gap-4 pr-3 mt-2">
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy JSON">
            <Database size={18} />
          </button>
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download CSV">
            <Download size={18} />
          </button>
          <button onClick={handlePrintClick} className="text-gray-500" title="Print">
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" id="print-section">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Guardian Name", "Guardian Phone", "Username", "Action"].map(
                    (title, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center">
                          {title}
                          {title !== "Action" && (
                            <ChevronDown size={14} className="ml-1" />
                          )}
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredParents.map((parent) => (
                  <tr key={parent.Username}>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {parent["Guardian Name"]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {parent["Guardian Phone"]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {parent.Username}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <label
                        className="inline-flex relative items-center cursor-pointer"
                        onClick={() => toggleAction(parent.Username)}
                      >
                        <div
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            parent.Action ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ${
                              parent.Action ? "left-7" : "left-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
                {filteredParents.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center px-4 py-3 text-sm text-gray-500"
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parents;

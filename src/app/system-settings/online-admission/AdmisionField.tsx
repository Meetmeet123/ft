import React, { useState, useEffect } from "react";
import { Search, Database, Download, FileText, Printer } from "lucide-react";

const fields: string[] = [
  "Last Name", "Category", "Religion", "Caste", "Mobile Number", "Email", "Student Photo",
  "House", "Blood Group", "Height", "Weight", "Measurement Date",
  "Father Name", "Father Phone", "Father Occupation", "Father Photo"
];

const OnlineAdmissionFormFields: React.FC = () => {
  const [toggles, setToggles] = useState<boolean[]>(Array(fields.length).fill(false));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFields, setFilteredFields] = useState<string[]>(fields);

  useEffect(() => {
    const filtered = fields.filter((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFields(filtered);
  }, [searchQuery]);

  const toggleField = (index: number) => {
    setToggles((prev) => {
      const newToggles = [...prev];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  const handleCopyClick = () => {
    const text = filteredFields.join(", ");
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDownloadClick = () => {
    const csvContent = [
      ['Field Name'],
      ...filteredFields.map((field) => [field])
    ];
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admission_fields.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSONClick = () => {
    const json = JSON.stringify(filteredFields, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied JSON to clipboard!');
  };

  const handlePrintClick = () => {
    const contentElement = document.getElementById('fields-table');
    if (!contentElement) return;
    const content = contentElement.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(content);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Online Admission Form Fields</h2>

      <div className="flex border-b flex-wrap items-center gap-2 p-4">
        <div className="relative w-1/4 md:w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-full"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 pr-3">
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy to clipboard">
            <Database size={18} />
          </button>
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download CSV">
            <Download size={18} />
          </button>
          <button onClick={handleCopyJSONClick} className="text-gray-500" title="Copy JSON">
            <FileText size={18} />
          </button>
          <button onClick={handlePrintClick} className="text-gray-500" title="Print">
            <Printer size={18} />
          </button>
        </div>
      </div>

      <table id="fields-table" className="table-auto w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-right p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFields.map((field, index) => (
            <tr key={field} className="border-t">
              <td className="p-2">{field}</td>
              <td className="p-2 text-right">
                <label className="inline-flex items-center cursor-pointer relative w-11 h-6">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={toggles[index]}
                    onChange={() => toggleField(index)}
                  />
                  <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                  <div className={`absolute ${toggles[index] ? 'top-0.5 right-0.5' : 'top-0.5 left-0.5'} h-5 w-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5`} />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineAdmissionFormFields;

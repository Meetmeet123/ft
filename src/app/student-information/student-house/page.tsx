"use client";
import { useState, useRef } from "react";
import {
  Search,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Printer,
  Grid,
} from "lucide-react";

interface Role {
  Name: string;
  Description: string;
  "House ID": number;
}

export default function StudentHouse() {
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([
    { Name: "Blue", Description: "", "House ID": 1 },
    { Name: "Red", Description: "", "House ID": 2 },
    { Name: "Green", Description: "", "House ID": 3 },
    { Name: "Yellow", Description: "", "House ID": 4 },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rolesPerPage = 6;
  const [displaySection, setDisplaySection] = useState<boolean[]>(Array(4).fill(true));
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const filteredRoles = roles.filter((role) =>
    role.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = () => {
    if (roleName.trim()) {
      const newRole: Role = {
        Name: roleName,
        Description: description,
        "House ID": roles.length + 1,
      };
      setRoles([...roles, newRole]);
      setRoleName("");
      setDescription("");
    }
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role["House ID"] !== id));
  };

  const handleExcelExport = () => {
    let table = `<table border="1"><tr><th>Name</th><th>Description</th><th>House ID</th></tr>`;
    roles.forEach((role) => {
      table += `<tr><td>${role.Name}</td><td>${role.Description}</td><td>${role["House ID"]}</td></tr>`;
    });
    table += `</table>`;

    const blob = new Blob([table], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "houses.xls";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!tableRef.current) return;
    const printContents = tableRef.current.innerHTML;
    const printWindow = window.open("", "", "height=500,width=800");
    if (!printWindow) return;
    printWindow.document.write(
      `<html><head><title>Print Houses</title></head><body>${printContents}</body></html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Add School House</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-2 h-30 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded"
            >
              Save
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">School House List</h2>
          <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleExcelExport}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Export to Excel"
              >
                <Download size={18} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Export to PDF"
              >
                <FileText size={18} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Print"
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="View as Grid"
              >
                <Grid size={18} />
              </button>

              {showGrid && (
                <div className="absolute block right-0 mt-10 bg-white border shadow rounded p-2">
                  {["Name", "Description", "House ID", "Action"].map((label, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-1 text-sm rounded border mr-2"
                      onClick={() => {
                        const updated = [...displaySection];
                        updated[idx] = !updated[idx];
                        setDisplaySection(updated);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead>
                <tr>
                  {displaySection[0] && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  )}
                  {displaySection[1] && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Description
                    </th>
                  )}
                  {displaySection[2] && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      House Id
                    </th>
                  )}
                  {displaySection[3] && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoles.map((role) => (
                  <tr key={role["House ID"]}>
                    {displaySection[0] && (
                      <td className="px-4 py-3 text-sm text-gray-700">{role.Name}</td>
                    )}
                    {displaySection[1] && (
                      <td className="px-4 py-3 text-sm text-gray-700">{role.Description}</td>
                    )}
                    {displaySection[2] && (
                      <td className="px-4 py-3 text-sm text-gray-700">{role["House ID"]}</td>
                    )}
                    {displaySection[3] && (
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-4">
                          <button
                            className="text-gray-600 hover:text-red-600"
                            onClick={() => handleDelete(role["House ID"])}
                          >
                            <Trash size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-blue-600">
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div>
              Records: {indexOfFirstRole + 1} to{" "}
              {Math.min(indexOfLastRole, filteredRoles.length)} of {filteredRoles.length}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded">{currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLibraryCardPopup, setShowLibraryCardPopup] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [libraryCardInput, setLibraryCardInput] = useState("");
  const [actionType, setActionType] = useState("add");

  const fetchStaff = async () => {
    try {
      const res = await axios.get("/api/add-staff-member");
      setStaff(res.data);
    } catch (err) {
      console.error("Failed to load staff:", err);
      toast.error("Failed to load staff");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddLibraryCardClick = (staff, action = "add") => {
    setCurrentStaff(staff);
    setLibraryCardInput(staff.library_card_no || "");
    setShowLibraryCardPopup(true);
    setActionType(action);
  };

  const handleSubmitLibraryCard = async () => {
    try {
      if (!currentStaff || !currentStaff.id) {
        throw new Error("No staff member selected");
      }

      if (actionType === "add" && !libraryCardInput) {
        throw new Error("Library card number is required");
      }

      const response = await axios.put("/api/add-staff-member", {
        id: currentStaff.id,
        library_card_no: actionType === "add" ? libraryCardInput : null,
        action: actionType,
      });

      if (response.data.success) {
        toast.success(
          actionType === "add"
            ? "Library details updated successfully!"
            : "Library card removed!"
        );

        setStaff((prevStaff) =>
          prevStaff.map((s) =>
            s.id === currentStaff.id
              ? {
                  ...s,
                  library_card_no:
                    actionType === "add"
                      ? response.data.library_card_no
                      : null,
                  member_id:
                    actionType === "add"
                      ? response.data.member_id
                      : null,
                }
              : s
          )
        );

        setShowLibraryCardPopup(false);
      }
    } catch (err) {
      console.error("Failed to update:", err);
      toast.error(
        err.response?.data?.error || "Failed to update library details"
      );
    }
  };

  const filteredStaff = staff.filter((staff) =>
    Object.values(staff).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(filteredStaff);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Staff List");
    writeFile(workbook, "staff_list.xlsx");
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = utils.json_to_sheet(filteredStaff);
    const csv = utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "staff_list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Member ID",
      "Library Card No.",
      "Staff Name",
      "Email",
      "Date of Birth",
      "Phone",
    ];
    const tableRows = [];

    filteredStaff.forEach((staff) => {
      const rowData = [
        staff.member_id || "",
        staff.library_card_no || "",
        staff.staff_name,
        staff.email,
        staff.date_of_birth,
        staff.phone,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("staff_list.pdf");
  };

  return (
    <div
      className="p-4"
      style={{ position: "relative", right: "30px", width: "1030px" }}
    >
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Staff Member List</h1> */}
        <div className="flex gap-2">
          
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-black px-3 py-2 rounded-md hover:bg-green-700"
          >
            Export Excel
          </button>
          <button
            onClick={exportToCSV}
            className="bg-yellow-500 text-black px-3 py-2 rounded-md hover:bg-yellow-600"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-600 text-black px-3 py-2 rounded-md hover:bg-red-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {showLibraryCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">
              {actionType === "add"
                ? "Add Library Card"
                : "Remove Library Card"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Staff Name
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
                value={currentStaff?.staff_name || ""}
                readOnly
              />
            </div>
            {actionType === "add" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Library Card No.
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  value={libraryCardInput}
                  onChange={(e) => setLibraryCardInput(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowLibraryCardPopup(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 ${
                  actionType === "add"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white rounded-md`}
                onClick={handleSubmitLibraryCard}
              >
                {actionType === "add" ? "Submit" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Member ID</th>
              <th className="px-4 py-2 border">Library Card No.</th>
              <th className="px-4 py-2 border">Staff Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date of Birth</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td className="px-4 py-2 border">
                  {staff.member_id || (
                    <span className="text-gray-400"></span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {staff.library_card_no || "-"}
                </td>
                <td className="px-4 py-2 border">{staff.staff_name}</td>
                <td className="px-4 py-2 border">{staff.email}</td>
                <td className="px-4 py-2 border">{staff.date_of_birth}</td>
                <td className="px-4 py-2 border">{staff.phone}</td>
                <td className="px-4 py-2 border text-center">
                  {!staff.library_card_no ? (
                    <button
                      className="text-blue-600 hover:text-blue-800 text-xl font-bold"
                      onClick={() => handleAddLibraryCardClick(staff, "add")}
                      title="Add Library Card"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="fas fa-arrow-left" 
                      title="Remove Library Card"
                      onClick={() => handleAddLibraryCardClick(staff, "remove")}
                    >
                &#8630;
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

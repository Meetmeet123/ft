"use client";
import { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getLeaveTypeDetails, updateLeaveType, deleteLeaveType } from "../LeaveTypeDetails";
import { toast, ToastContainer } from "react-toastify";

const LeaveTypeList = () => {
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLeaveType, setEditingLeaveType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [newLeaveTypeName , setNewLeaveTypeName ] = useState();

  useEffect(() => {
    const fetchLeaveTypeData = async () => {
      try {
        setLoading(true);
        const res = await getLeaveTypeDetails();
        console.log(res.data.data);

        // Transform the backend data to match your component's expected structure
        const transformedData = res.data.data
          .map(leave => ({
            id: leave.id,
            name: leave.type, // Map 'type' field to 'name'
            is_active: leave.is_active
          }));

        setLeaveTypes(transformedData);
      } catch (err) {
        console.log(err);
        // Fallback to empty array if API fails
        setLeaveTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveTypeData();
  }, []);

  const filteredLeaveTypes = leaveTypes.filter((leave) =>
    leave.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (isActive) => (
        <span className={`px-2 py-1 rounded text-xs ${isActive === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {isActive === 'yes' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex space-x-2 justify-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 ml-5 hover:text-red-700"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    const text = filteredLeaveTypes.map((row) => row.name).join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>Name</th><th>Status</th>`;
      const rows = filteredLeaveTypes
        .map((row) => `<tr><td>${row.name}</td><td>${row.is_active === 'yes' ? 'Active' : 'Inactive'}</td></tr>`)
        .join("");

      printWindow.document.write(`
        <html>
          <head>
            <title>Leave Records</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h2>Leave Records</h2>
            <table>
              <thead>
                <tr>${headers}</tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredLeaveTypes.map(({ name, is_active }) => ({
        name,
        status: is_active === 'yes' ? 'Active' : 'Inactive'
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Records");
    XLSX.writeFile(wb, "LeaveRecords.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Name", "Status"].join(","),
      ...filteredLeaveTypes
        .map((row) => [row.name, row.is_active === 'yes' ? 'Active' : 'Inactive'])
        .map((data) => data.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "LeaveRecords.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Status"]],
      body: filteredLeaveTypes.map((row) => [
        row.name,
        row.is_active === 'yes' ? 'Active' : 'Inactive'
      ]),
      startY: 20,
    });
    doc.text("Leave Records", 14, 10);
    doc.save("LeaveRecords.pdf");
  };

  const handleEdit = (record) => {
    setEditingLeaveType(record);
    // setNewLeaveTypeName(record.name);
    setIsEditing(true);
  };

  const handleDelete = async(id) => {
    // You might want to call an API to delete from backend
    // For now, just filtering from local state
    if(window.confirm("Delete This Type?")){
      try{
        const res = await deleteLeaveType(id);
        console.log(res)
        if(toast.status === 200){
          toast.success("Record Deleted")
        }
        setLeaveTypes(leaveTypes.filter((leave) => leave.id !== id));
      }catch(err){
        console.log(err)
        toast.success("Record cannot deleted")
      }
    }
  };

  const handleModalOk = async () => {
    if (editingLeaveType) {
      // You might want to call an API to update the backend
      // For now, just updating local state
      const payloadData = {
        leavetypeid: editingLeaveType.id,
        type: editingLeaveType.name,
        status: editingLeaveType.is_active
      }
      try {
        console.log(payloadData)
        const res = await updateLeaveType(payloadData)
        console.log(res)
        if(res.status === 200){
          toast.success("Record Updated")
        }
        setLeaveTypes((prev) =>
          prev.map((leave) =>
            leave.id === editingLeaveType.id
              ? { ...leave, name: editingLeaveType.name, is_active: editingLeaveType.is_active }
              : leave
          )
        );
        setEditingLeaveType(null);
        // setNewLeaveTypeName("");
        setIsEditing(false);
      } catch (err) {
        console.log(err);
        toast.error("Record cannot be Updated")
      }
    }
  };

  const handleModalCancel = () => {
    setIsEditing(false);
    setEditingLeaveType(null);
    // setNewLeaveTypeName("");
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex-1/2 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading leave types...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1/2 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Leave Type List</h3>
      <div className="flex items-center justify-between space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Utility buttons */}
        <div className="flex gap-2 mb-4">
          <button
            style={{ fontSize: "24px" }}
            className="text-blue-600 hover:text-blue-800"
            onClick={handleCopy}
          >
            <CopyOutlined />
          </button>
          <button
            style={{ fontSize: "24px" }}
            className="text-green-600 hover:text-green-800"
            onClick={handleExportExcel}
          >
            <FileExcelOutlined />
          </button>
          <button
            style={{ fontSize: "24px" }}
            className="text-gray-600 hover:text-gray-800"
            onClick={handleExportCSV}
          >
            <FileTextOutlined />
          </button>
          <button
            style={{ fontSize: "24px" }}
            className="text-red-600 hover:text-red-800"
            onClick={handleExportPDF}
          >
            <FilePdfOutlined />
          </button>
          <button
            style={{ fontSize: "24px" }}
            className="text-gray-600 hover:text-gray-800"
            onClick={handlePrint}
          >
            <PrinterOutlined />
          </button>
        </div>
      </div>

      {/* Show message if no data */}
      {leaveTypes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No leave types found
        </div>
      ) : (
        <div ref={tableRef}>
          <Table
            columns={columns}
            dataSource={filteredLeaveTypes}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}

      {/* Edit Section */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit Leave Type</h2>

            {/* Leave Type Input */}
            <label className="block mb-4">
              Type:
              <input
                type="text"
                value={editingLeaveType.name || ""}
                onChange={(e) =>
                  setEditingLeaveType((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter new leave type name"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </label>

            {/* Status Checkbox */}
            <label className="block mb-4">
              Status:
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  checked={editingLeaveType.is_active === "yes"}
                  onChange={(e) =>
                    setEditingLeaveType((prev) => ({
                      ...prev,
                      is_active: e.target.checked ? "yes" : "no",
                    }))
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Active</span>
              </div>
            </label>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                style={{ backgroundColor: "#164f63" }}
                className="text-white px-4 py-2 rounded mr-2"
                onClick={handleModalOk}
              >
                Save
              </button>
              <button
                style={{ backgroundColor: "red" }}
                className="text-white px-4 py-2 rounded"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypeList;
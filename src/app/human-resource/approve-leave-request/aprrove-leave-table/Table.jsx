"use client";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  EyeOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Inspect, X } from "lucide-react";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getLeaveRequestData, deleteLeaveRequest, updateStatus, getRecordById, getLeaveCount } from "../LeaveRequestDetails";
import { toast, ToastContainer } from "react-toastify";

const LeaveManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [displayGetLeave, setDisplayGetLeave] = useState(false);
  const [generalLeaveDetails, setGeneralLeaveDetails] = useState([]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Helper function to get role name (you might need to adjust this based on your role mapping)
  const getRoleName = (staffId, staffRoles) => {
    const staffRole = staffRoles?.find(role => role.staff_id === staffId);
    // You might need to map role_id to actual role names
    // For now, returning a default based on role_id
    const roleMap = {
      1: "Admin",
      7: "Manager"
    };
    return roleMap[staffRole?.role_id] || "Employee";
  };

  useEffect(() => {
    const fetchLeaveRequestData = async () => {
      try {
        setLoading(true);
        const res = await getLeaveRequestData();
        console.log(res.data.data);

        if (res.data.status === "success" && res.data.data.leave_requests) {
          const formattedData = res.data.data.leave_requests.map((request) => ({
            id: request.id.toString(),
            staff: `${request.staff.name} ${request.staff.surname || ''} (${request.staff.employee_id})`.trim(),
            role: getRoleName(request.staff_id, res.data.data.staff_roles),
            leaveType: request.leave_type.type,
            leaveFrom: formatDate(request.leave_from),
            leaveTo: formatDate(request.leave_to),
            days: request.leave_days,
            applyDate: formatDate(request.date),
            reason: request.employee_remark || "",
            note: request.admin_remark || "",
            document: request.document_file || "",
            status: request.status.charAt(0).toUpperCase() + request.status.slice(1),
            submittedBy: `${request.staff.name} ${request.staff.surname || ''} (${request.staff.employee_id})`.trim(),
            staffId: request.staff.employee_id,
            halfLeaveStatus: request.half_leave_status,
            appliedBy: request.applied_by,
            // Keep original data for reference
            originalData: request
          }));

          setLeaveData(formattedData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequestData();
  }, []);

  const handleDelete = async (id) => {
    const newData = leaveData.filter((item) => item.id === id)[0]
    const payloadData = {
      lid: parseInt(newData.id),
      id: newData.originalData.staff_id
    }
    try {
        const res = await deleteLeaveRequest(payloadData)
        toast.success("Record Deleted")
        setLeaveData(leaveData.filter((item) => item.id !== id));
        console.log(res)
      } catch (err) {
        console.log(err)
        toast.error("Record Cannot be Deleted")
      }
  };

  const handleUpdateStatus = async () => {
    // console.log(selectedLeave);
    const payloadData = {
      leave_request_id: parseInt(selectedLeave.id),
      status: selectedLeave.status.toLowerCase(),
      detailremark: selectedLeave.note
    };

    console.log(payloadData)
    try {
      const res = await updateStatus(payloadData);
      console.log(res);
      toast.success("Record Updated successfully")
      const getRes = await getLeaveRequestData();
      if (getRes.data.status === "success" && getRes.data.data.leave_requests) {
        const formattedData = getRes.data.data.leave_requests.map((request) => ({
          id: request.id.toString(),
          staff: `${request.staff.name} ${request.staff.surname || ''} (${request.staff.employee_id})`.trim(),
          role: getRoleName(request.staff_id, getRes.data.data.staff_roles),
          leaveType: request.leave_type.type,
          leaveFrom: formatDate(request.leave_from),
          leaveTo: formatDate(request.leave_to),
          days: request.leave_days,
          applyDate: formatDate(request.date),
          reason: request.employee_remark || "",
          note: request.admin_remark || "",
          document: request.document_file || "",
          status: request.status.charAt(0).toUpperCase() + request.status.slice(1),
          submittedBy: `${request.staff.name} ${request.staff.surname || ''} (${request.staff.employee_id})`.trim(),
          staffId: request.staff.employee_id,
          halfLeaveStatus: request.half_leave_status,
          appliedBy: request.applied_by,
          // Keep original data for reference
          originalData: request
        }));

        setLeaveData(formattedData);
      }
    } catch (err) {
      console.log(err);
      toast.error("Record cannot be upldated")
    } finally {
      setIsModalVisible(false)
    }
  };

  const handleView = async (record) => {
    console.log(record.id)
    try {
      const res = await getRecordById(record.id);
      console.log(res.data);
      console.log(record);
      setSelectedLeave(record);
    } catch (err) {
      console.log(err)
    }
    setIsModalVisible(true);
  };

  const handleGetLeaveCount = async (record) => {
    const payloadData = {
      lid: record.originalData.leave_type_id,
      id: record.originalData.staff_id
    }
    console.log(payloadData);
    try {
      const res = await getLeaveCount(payloadData)
      console.log(res)
      if (res.status === 200) {
        setDisplayGetLeave(true);
        setGeneralLeaveDetails(res.data.options)
        console.log(res.data.options)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLeave((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = leaveData.filter((item) =>
    item.staff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Staff", dataIndex: "staff", key: "staff" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Leave Type", dataIndex: "leaveType", key: "leaveType" },
    { title: "Leave From", dataIndex: "leaveFrom", key: "leaveFrom" },
    { title: "Leave To", dataIndex: "leaveTo", key: "leaveTo" },
    { title: "Days", dataIndex: "days", key: "days" },
    { title: "Apply Date", dataIndex: "applyDate", key: "applyDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Approved' ? 'bg-green-100 text-green-800' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
          {status}
        </span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="View"
            onClick={() => handleGetLeaveCount(record)}
          ><Inspect size={18} /></button>
          <button
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="View"
            onClick={() => handleView(record)}
          >
            <EyeOutlined />
          </button>
          <button
            className="p-2 bg-red-200 rounded hover:bg-red-300 text-red-600"
            title="Delete"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const tableRef = useRef(null);

  const handleCopy = () => {
    const text = leaveData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handleExportExcel = () => {
    const exportData = leaveData.map(({ originalData, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Data");
    XLSX.writeFile(wb, "LeaveData.xlsx");
  };

  const handleExportCSV = () => {
    const exportData = leaveData.map(({ originalData, ...rest }) => rest);
    const csvContent = [
      Object.keys(exportData[0]).join(","),
      ...exportData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "LeaveData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Staff",
          "Role",
          "Leave Type",
          "Leave From",
          "Leave To",
          "Days",
          "Apply Date",
          "Status",
        ],
      ],
      body: leaveData.map((row) => [
        row.staff,
        row.role,
        row.leaveType,
        row.leaveFrom,
        row.leaveTo,
        row.days,
        row.applyDate,
        row.status,
      ]),
      startY: 20,
    });

    doc.text("Leave Data", 14, 10);
    doc.save("LeaveData.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const printableData = leaveData
        .map(
          ({
            id,
            staff,
            role,
            leaveType,
            leaveFrom,
            leaveTo,
            days,
            applyDate,
            reason,
            note,
            status,
            submittedBy,
          }) =>
            `<tr>
          <td>${id}</td>
          <td>${staff}</td>
          <td>${role}</td>
          <td>${leaveType}</td>
          <td>${leaveFrom}</td>
          <td>${leaveTo}</td>
          <td>${days}</td>
          <td>${applyDate}</td>
          <td>${reason}</td>
          <td>${note}</td>
          <td>${status}</td>
          <td>${submittedBy}</td>
        </tr>`
        )
        .join("");

      printWindow.document.write(`
        <html>
          <head>
            <title>Leave Data</title>
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
            <h2>Leave Data</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Role</th>
                  <th>Leave Type</th>
                  <th>Leave From</th>
                  <th>Leave To</th>
                  <th>Days</th>
                  <th>Apply Date</th>
                  <th>Reason</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Submitted By</th>
                </tr>
              </thead>
              <tbody>
                ${printableData}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <div className="p-4 border-b mt-5 bg-white shadow-md rounded-lg">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading leave data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b mt-5 bg-white shadow-md rounded-lg">
      <ToastContainer/>
      <div className=" p-4 ">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchOutlined className="absolute right-3 top-2.5 text-gray-400" />
          </div>
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
        <div ref={tableRef}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={loading}
          />
        </div>
      </div>

      {isModalVisible && selectedLeave && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-opacity-50">
          <div className="bg-white max-h-[80vh] overflow-y-auto p-6 rounded shadow-md w-full max-w-3/4">
            <h2 className="text-lg font-semibold mb-4">Leave Details</h2>
            <div className="grid gap-3">
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="staff"
                  value={selectedLeave.staff}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Staff ID:{" "}
                <input
                  type="text"
                  name="staffId"
                  value={selectedLeave.staffId}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Submitted By:{" "}
                <input
                  type="text"
                  name="submittedBy"
                  value={selectedLeave.submittedBy}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Leave Type:{" "}
                <input
                  type="text"
                  name="leaveType"
                  value={selectedLeave.leaveType}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Leave:{" "}
                <input
                  type="text"
                  value={`${selectedLeave.leaveFrom} - ${selectedLeave.leaveTo} (${selectedLeave.days} Days)`}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Apply Date:{" "}
                <input
                  type="text"
                  name="applyDate"
                  value={selectedLeave.applyDate}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Status:
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1" >
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Pending"
                      checked={selectedLeave.status === "Pending"}
                      onChange={handleChange}
                      className="ml-3"
                    />{" "}
                    Pending
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Approved"
                      checked={selectedLeave.status === "Approved"}
                      onChange={handleChange}
                      className="ml-3"
                    />{" "}
                    Approved
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Disapproved"
                      checked={selectedLeave.status === "Disapproved"}
                      onChange={handleChange}
                      className="ml-3"
                    />{" "}
                    Disapproved
                  </label>
                </div>
              </label>
              <label>
                Reason:{" "}
                <input
                  type="text"
                  name="reason"
                  value={selectedLeave.reason}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Note:{" "}
                <textarea
                  name="note"
                  className="border p-2 w-full"
                  rows="2"
                  value={selectedLeave.note}
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                style={{ backgroundColor: "red" }}
                className="px-4 py-2  rounded text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "#164f63" }}
                className="px-4 py-2  text-white rounded"
                onClick={handleUpdateStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {displayGetLeave &&
        generalLeaveDetails.map((leave, index) => (
          <div
            key={index}
            className="fixed top-30 w-3/4 p-4 border border-gray-200 rounded-lg mb-4 shadow bg-gray-50 hover:shadow-md transition"
          >
            <div className="flex justify-between" >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold text-gray-800">
                  {leave.text.slice(0, leave.text.length - 4)}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${leave.selected ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                  {leave.selected ? 'Selected' : 'Not Selected'}
                </span>
              </div>
              <div>
                <X size={18} onClick={() => setDisplayGetLeave(false)} />
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Days:</strong> {leave.text.slice(leave.text.length - 4).replace(/[^\d]/g, "")}</div>
              <div><strong>Value:</strong> {leave.value}</div>
              <div className="text-gray-500 italic">Regular leave assigned for eligible employees.</div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default LeaveManagementTable;
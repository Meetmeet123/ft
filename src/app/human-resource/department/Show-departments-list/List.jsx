"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getDeprtmentDetails, updateDepartment, deleteDepartment } from "../departmentDetails";
import { toast, ToastContainer } from "react-toastify";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDeprtmentDetails();
        if (response && response.data) {
          console.log(response.data);
          setDepartments(response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleDelete = async(id) => {
    if (window.confirm("Delete Confirm?")) {
      try{
        const res = await deleteDepartment(id);
        console.log(res);
        toast.success("Record Deleted")
      }catch(err){
        console.log(err)
        toast.error("Record cannot be deleted")
      }finally{
        setDepartments(departments.filter((department) => department.id !== id));
      }
    }
  };

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDepartment(null);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Fixed: Use consistent property names and add null safety
  const filteredDepartments = departments.filter((department) => {
    const deptName = department.department_name || department.name || "";
    return deptName.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "department_name",
      key: "department_name",
      align: "center",
      // Fixed: Handle both possible property names
      render: (text, record) => record.department_name || record.name || "N/A",
    },
    {
      title: "Active",
      dataIndex: "Active",
      key: "is_active",
      align: "center",
      render: (text, record) => record.is_active || 'N/A'
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <button
            style={{ color: "blue" }}
            className="flex items-center hover:underline mr-1"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined style={{ marginRight: 4 }} />
          </button>
          <button
            className="flex items-center text-red-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            <DeleteOutlined style={{ marginRight: 4 }} />
          </button>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    // Fixed: Use consistent property names
    const text = filteredDepartments
      .map((row) => `${row.id}, ${row.department_name || row.name || ""}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>ID</th><th>Name</th>`;
      // Fixed: Use consistent property names
      const rows = filteredDepartments
        .map((row) => `<tr><td>${row.id}</td><td>${row.department_name || row.name || ""}</td></tr>`)
        .join("");

      printWindow.document.write(`
            <html>
              <head>
                <title>Department List</title>
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
                <h2>Department List</h2>
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
    // Fixed: Create properly formatted data for export
    const exportData = departments.map(dept => ({
      ID: dept.id,
      Name: dept.department_name || dept.name || "",
      Status: dept.is_active || "N/A"
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Departments");
    XLSX.writeFile(wb, "Departments.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Status"].join(","),
      // Fixed: Use consistent property names
      ...departments.map((row) => [
        row.id,
        `"${row.department_name || row.name || ""}"`,
        row.is_active || "N/A"
      ].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Departments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name", "Status"]],
      // Fixed: Use consistent property names
      body: filteredDepartments.map((row) => [
        row.id,
        row.department_name || row.name || "",
        row.is_active || "N/A"
      ]),
    });
    doc.save("Departments.pdf");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const updatedName = formData.get("name");
    const updatedStatus = formData.get("status") ? 'yes' : 'no';

    const updatedDepartmentData = {
      ...currentDepartment,
      department_name: updatedName,
      name: updatedName,
      is_active: updatedStatus,
    };

    const payloadData = {
      departmenttypeid: currentDepartment.id,
      type: updatedName,
      status: updatedStatus,
    };

    try {
      const response = await updateDepartment(payloadData);
      console.log("Update response:", response);

      if (response) {
        setDepartments(prevDepartments =>
          prevDepartments.map(department =>
            department.id === currentDepartment.id ? updatedDepartmentData : department
          )
        );
        toast.success("Department updated successfully!");
        handleModalClose();
      }
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update department. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex-1/2">
      <ToastContainer/>
      <h3 className="text-lg font-semibold mb-4">Department Lists</h3>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search departments"
          value={searchText}
          onChange={handleSearch}
          className="border inline-block border-gray-300 rounded-md p-2 mb-4 w-1/3"
        />
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
      <Table
        dataSource={filteredDepartments.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredDepartments.length,
          onChange: (page) => setCurrentPage(page),
        }}
        bordered
      />

      {/* Modal for Editing Department */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Edit Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={currentDepartment?.department_name || currentDepartment?.name || ""}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Field */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="status"
                  id="status"
                  defaultChecked={currentDepartment?.is_active === 'yes'}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="status" className="text-sm text-gray-700">
                  Active
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  disabled={loading}
                  className="btn btn-danger text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
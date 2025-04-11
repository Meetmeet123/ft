import React, { useRef } from "react";
import { Table, Tooltip } from "antd";
import {
  CopyOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const examResults = [
  {
    admissionNo: "18016",
    rollNumber: "1243",
    studentName: "Apolline",
    english: "66.00",
    hindi: "85.00",
    mathematics: "56.00",
    science: "55.00",
    grandTotal: "262.00/400.00",
    percent: "65.50 (B++)",
    rank: "7",
    result: "Pass",
  },
  {
    admissionNo: "18013",
    rollNumber: "113",
    studentName: "Benjamin Gates",
    english: "67.00",
    hindi: "(F) Absent",
    mathematics: "45.00",
    science: "67.00",
    grandTotal: "179.00/400.00",
    percent: "44.75 (B)",
    rank: "17",
    result: "Fail",
  },
  {
    admissionNo: "18020",
    rollNumber: "121",
    studentName: "Charlie Brown",
    english: "78.00",
    hindi: "80.00",
    mathematics: "75.00",
    science: "82.00",
    grandTotal: "315.00/400.00",
    percent: "78.75 (A)",
    rank: "3",
    result: "Pass",
  },
  {
    admissionNo: "18025",
    rollNumber: "130",
    studentName: "Lucy Heartfilia",
    english: "55.00",
    hindi: "65.00",
    mathematics: "60.00",
    science: "58.00",
    grandTotal: "238.00/400.00",
    percent: "59.50 (C+)",
    rank: "10",
    result: "Pass",
  },
  {
    admissionNo: "18030",
    rollNumber: "140",
    studentName: "Natsu Dragneel",
    english: "90.00",
    hindi: "88.00",
    mathematics: "85.00",
    science: "92.00",
    grandTotal: "355.00/400.00",
    percent: "88.75 (A+)",
    rank: "1",
    result: "Pass",
  },
];

const ExamResultsTable = () => {
  if (examResults.length === 0) {
    return <div className="hidden">No results available.</div>;
  }

  const tableRef = useRef(null);

  const columns = [
    {
      title: "Admission No",
      dataIndex: "admissionNo",
      key: "admissionNo",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text, record) => (
        <Tooltip title={record.studentName}>
          <a
            href={`https://demo.smart-school.in/student/view/${record.admissionNo}`}
            className="text-blue-500 hover:underline"
          >
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "English",
      dataIndex: "english",
      key: "english",
    },
    {
      title: "Hindi",
      dataIndex: "hindi",
      key: "hindi",
    },
    {
      title: "Mathematics",
      dataIndex: "mathematics",
      key: "mathematics",
    },
    {
      title: "Science",
      dataIndex: "science",
      key: "science",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Percent (%)",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (text) => (
        <span
          className={`font-semibold ${
            text === "Pass" ? "text-green-500" : "text-red-500"
          }`}
        >
          {text}
        </span>
      ),
    },
  ];

  const handleCopy = () => {
    const tableText = examResults
      .map(
        (s) =>
          `${s.admissionNo}, ${s.rollNumber}, ${s.studentName} ,${s.english},${s.hindi},${s.mathematics},${s.science},${s.grandTotal},${s.percent},${s.rank},${s.result}`
      )
      .join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "AddminssionNo,Roll Number,Student Name,English,Hindi,Mathematics,Science,Grand Total,Percent (%),Rank,Result",
      ]
        .concat(
          examResults.map(
            (s) =>
              `${s.admissionNo}, ${s.rollNumber}, ${s.studentName} ,${s.english},${s.hindi},${s.mathematics},${s.science},${s.grandTotal},${s.percent},${s.rank},${s.result}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "examResults.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(examResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "examResults");
    XLSX.writeFile(workbook, "examResults.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Subject List", 20, 10);

    autoTable(doc, {
      head: [
        [
          "AddminssionNo",
          "RollNumber",
          "Student Name",
          "English",
          "Hindi",
          "Mathematics",
          "Science",
          "Grand Total",
          "Percent (%)",
          "Rank",
          "Result",
        ],
      ],
      body: examResults.map((s) => [
        s.admissionNo,
        s.rollNumber,
        s.studentName,
        s.english,
        s.hindi,
        s.mathematics,
        s.science,
        s.grandTotal,
        s.percent,
        s.rank,
        s.result,
      ]),
    });

    doc.save("examResults.pdf");
  };
  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
  <html>
    <head>
      <title>Print examResults</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; margin: 20px; }
        h2 { text-align: center; margin-bottom: 20px; }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 16px;
        }
        th, td {
          border: 1px solid black;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      </style>
    </head>
    <body>
      <h2>Subject List</h2>
      <table>
        <thead>
          <tr>
            <th>Admission no</th>
            <th>Roll no</th>
            <th>Student Name</th>
            <th>English</th>
            <th>Hindi</th>
            <th>Mathematics</th>
            <th>Science</th>
            <th>GrandTotal</th>
            <th>Percentage(%)</th>
            <th>Rank</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${examResults
            .map(
              (subject) => `
              <tr>
                <td>${subject.admissionNo}</td>
                <td>${subject.rollNumber}</td>
                <td>${subject.studentName}</td>
                <td>${subject.english}</td>
                <td>${subject.hindi}</td>
                <td>${subject.mathematics}</td>
                <td>${subject.science}</td>
                <td>${subject.grandTotal}</td>
                <td>${subject.percent}</td>
                <td>${subject.rank}</td>
                <td>${subject.result}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </body>
  </html>
  `;

    const blob = new Blob([tableHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");

    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  };

  return (
    <div className="p-6  shadow-md rounded-lg ">
      {/* Action buttons */}
      <div className="flex gap-2 mb-4 mt-4">
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
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
      {/* Ant Design Table with Pagination */}
      <div ref={tableRef}>
        <Table
          dataSource={examResults}
          columns={columns}
          rowKey="admissionNo"
          pagination={{ pageSize: 5 }} // Set pagination size to 5
          bordered
        />
      </div>
    </div>
  );
};

export default ExamResultsTable;

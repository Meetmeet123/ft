"use client"

import React, { useState } from 'react';
import examDetails from "./ExamDetails";
import students from "./studentDetails";
import { Search, Printer, FileText, Download } from 'lucide-react';
import * as XLSX from 'xlsx'
import studentDetails from "./studentDetails";

function Reports() {

    const [tab, setTab] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [examContent, setExamContent] = useState(examDetails);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [showTable, setShowTable] = useState(false);

    const handleExcelExport = (content) => {
        // Step 1: Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(content);

        // Step 2: Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');

        // Step 3: Trigger download
        XLSX.writeFile(workbook, 'exam.xlsx');
    };

    const handlePrint = (content) => {
        if (!content || content.length === 0) return;

        const headers = Object.keys(content[0]);
        let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

        // Headers
        headers.forEach(header => {
            table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
        });
        table += '</tr></thead><tbody>';

        // Rows
        content.forEach(row => {
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
          <title>Exam Content</title>
        </head>
        <body>
          <h2>Exam Content</h2>
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


    return (
        <div className="p-4 md:p-6 bg-white shadow rounded-lg">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Reports</h3>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    className={`btn ${tab === "subject" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setTab("subject")}
                >
                    Subject Marks Report
                </button>

                <button
                    className={`btn ${tab === "template" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setTab("template")}
                >
                    Template Marks Report
                </button>
            </div>

            {/* Exam Selector */}
            {
                tab === 'subject' &&
                <div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Subject-wise Mark Report</h3>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <label className="font-medium text-gray-700">Exam</label>
                            <select
                                className="border border-gray-300 rounded px-3 py-2 w-full md:w-60"
                                onChange={(e) => {
                                    setSelectedExam(e.target.value);
                                    setShowContent(false);
                                }}
                            >
                                <option value="">Select</option>
                                <option value="subjectWise">Subject wise test</option>
                                <option value="cbsePeriodicTest">CBSE Periodic Test</option>
                                <option value="weeklyPeriodicTest2">Weekly Periodic test - 2</option>
                                <option value="chapterWiseWeeklyTest1">Chapter wise weekly test - 1</option>
                                <option value="onlineAssessmentTest">Online Assessment Test</option>
                                <option value="monthlyTest">Monthly Test</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="w-full flex justify-end mb-4">
                        <button className="btn btn-primary" onClick={() => setShowContent(true)}>
                            Search
                        </button>
                    </div>

                    {/* Table Content */}
                    {(selectedExam !== "" && showContent) && (
                        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                            <div className="flex justify-between items-center" >
                                <h1 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Exam Reports</h1>
                                <div className="flex gap-3 items-center" >
                                    <button><Download
                                        onClick={() => handleExcelExport(examDetails)}
                                        className="w-5 h-5" /></button>
                                    <button><Printer
                                        onClick={() => handlePrint(examDetails)}
                                        className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="border p-2">Rank</th>
                                            <th className="border p-2">Student</th>
                                            <th className="border p-2">Admission No</th>
                                            <th className="border p-2">Father Name</th>
                                            <th className="border p-2">English (Th/Pr)</th>
                                            <th className="border p-2">Science (Th/Pr)</th>
                                            <th className="border p-2">Elective 1 (Th/Pr)</th>
                                            <th className="border p-2">Mathematics (Th/Pr)</th>
                                            <th className="border p-2">Total</th>
                                            <th className="border p-2">%</th>
                                            <th className="border p-2">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-800">
                                        {examContent.map((student, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border p-2 text-center">{student.Rank}</td>
                                                <td className="border p-2">{student.Student}</td>
                                                <td className="border p-2">{student["Admission No"]}</td>
                                                <td className="border p-2">{student["Father Name"]}</td>
                                                <td className="border p-2 text-center">
                                                    {student.Marks.English.Theory}/{student.Marks.English.Practical}
                                                </td>
                                                <td className="border p-2 text-center">
                                                    {student.Marks.Science.Theory}/{student.Marks.Science.Practical}
                                                </td>
                                                <td className="border p-2 text-center">
                                                    {student.Marks["Elective 1"].Theory}/{student.Marks["Elective 1"].Practical}
                                                </td>
                                                <td className="border p-2 text-center">
                                                    {student.Marks.Mathematics.Theory}/{student.Marks.Mathematics.Practical}
                                                </td>
                                                <td className="border p-2 text-center">{student["Total Marks"]}</td>
                                                <td className="border p-2 text-center">{student.Percentage}%</td>
                                                <td className="border p-2 text-center">{student.Grade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            }
            {
                tab === "template" &&
                <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                    <div className="max-w-full mx-auto bg-white rounded-md shadow-sm">
                        <div className="p-4 md:p-6">
                            {/* Filter Section */}
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Class <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedClass}
                                        onChange={(e) => {
                                            setSelectedClass(e.target.value)
                                            setShowTable(false)
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                        <option value="Class 3">Class 3</option>
                                        <option value="Class 4">Class 4</option>
                                        <option value="Class 5">Class 5</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Section <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedSection}
                                        onChange={(e) => {
                                            setSelectedSection(e.target.value)
                                            setShowTable(false)
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Template <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedTemplate}
                                        onChange={(e) => {
                                            setSelectedTemplate(e.target.value)
                                            setShowTable(false)
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="Monthly Test Template">Monthly Test Template</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search button */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setShowTable(true)}
                                    className="btn btn-primary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
                                    <Search className="w-4 h-4 mr-1" />
                                    Search
                                </button>
                            </div>

                            {/* Table */}
                            {(selectedClass !== "" && selectedSection !== "" && selectedTemplate !== "" && showTable) && <div className="overflow-x-auto">
                                {/* Print and Export buttons */}
                                <div className="flex justify-between items-center my-4" >
                                    <h1 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">Template Marks Report</h1>
                                    <div className="flex gap-3 items-center" >
                                        <button><Download
                                            onClick={() => handleExcelExport(studentDetails)}
                                            className="w-5 h-5" /></button>
                                        <button><Printer
                                            onClick={() => handlePrint(studentDetails)}
                                            className="w-5 h-5" /></button>
                                    </div>
                                </div>
                                <table className="min-w-full border border-gray-200 text-sm">
                                    {/* Header row 1 */}
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th rowSpan="2" className="border px-2 py-1 text-left">Student</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-left">Admission No</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-left">Class</th>
                                            <th colSpan="3" className="border px-2 py-1 text-center">English(210)</th>
                                            <th colSpan="3" className="border px-2 py-1 text-center">Computer(00220)</th>
                                            <th colSpan="3" className="border px-2 py-1 text-center">Science(111)</th>
                                            <th colSpan="3" className="border px-2 py-1 text-center">Mathematics(110)</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-center">Total Marks</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-center">Percentage (%)</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-center">Grade</th>
                                            <th rowSpan="2" className="border px-2 py-1 text-center">Rank</th>
                                        </tr>

                                        {/* Header row 2 - Subject component details */}
                                        <tr className="bg-gray-50">
                                            {/* English components */}
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Theory (TH02)<br />( Max - 100)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Practical (PC03)<br />( Max - 75)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Assignment (AS05)<br />( Max - 20)
                                            </th>

                                            {/* Computer components */}
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Theory (TH02)<br />( Max - 100)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Practical (PC03)<br />( Max - 75)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Assignment (AS05)<br />( Max - 20)
                                            </th>

                                            {/* Science components */}
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Theory (TH02)<br />( Max - 100)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Practical (PC03)<br />( Max - 75)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Assignment (AS05)<br />( Max - 20)
                                            </th>

                                            {/* Mathematics components */}
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Theory (TH02)<br />( Max - 100)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Practical (PC03)<br />( Max - 75)
                                            </th>
                                            <th className="border px-2 py-1 text-center whitespace-nowrap">
                                                Assignment (AS05)<br />( Max - 20)
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table body */}
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="border px-2 py-2">{student.name}</td>
                                                <td className="border px-2 py-2">{student.admissionNo}</td>
                                                <td className="border px-2 py-2">{student.class}</td>

                                                {/* English marks */}
                                                <td className="border px-2 py-2 text-center">{student.english.theory}</td>
                                                <td className="border px-2 py-2 text-center">{student.english.practical}</td>
                                                <td className="border px-2 py-2 text-center">{student.english.assignment}</td>

                                                {/* Computer marks */}
                                                <td className="border px-2 py-2 text-center">{student.computer.theory}</td>
                                                <td className="border px-2 py-2 text-center">{student.computer.practical}</td>
                                                <td className="border px-2 py-2 text-center">{student.computer.assignment}</td>

                                                {/* Science marks */}
                                                <td className="border px-2 py-2 text-center">{student.science.theory}</td>
                                                <td className="border px-2 py-2 text-center">{student.science.practical}</td>
                                                <td className="border px-2 py-2 text-center">{student.science.assignment}</td>

                                                {/* Mathematics marks */}
                                                <td className="border px-2 py-2 text-center">{student.mathematics.theory}</td>
                                                <td className="border px-2 py-2 text-center">{student.mathematics.practical}</td>
                                                <td className="border px-2 py-2 text-center">{student.mathematics.assignment}</td>

                                                {/* Summary columns */}
                                                <td className="border px-2 py-2 text-center">{student.totalMarks}</td>
                                                <td className="border px-2 py-2 text-center">{student.percentage}</td>
                                                <td className="border px-2 py-2 text-center">{student.grade}</td>
                                                <td className="border px-2 py-2 text-center">{student.rank}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Reports
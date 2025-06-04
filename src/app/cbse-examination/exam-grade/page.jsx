"use client";
import React, { useState } from 'react';
import { Edit, X, Database, Download, Copy, Printer } from 'lucide-react';
import EditGrade from './grade-details/EditGrade';
import AddGrade from './grade-details/AddGrade';
import * as XLSX from 'xlsx'

function ExamGrade() {
  const [gradeData, setGradeData] = useState([
    {
      title: "Exam Grade",
      description:
        "An examination is a formal test that you take to show your knowledge or ability in a particular subject...",
      grades: [
        { grade: "A+", maxPercentage: 100, minPercentage: 90, remark: "Excellent" },
        { grade: "A", maxPercentage: 90, minPercentage: 80, remark: "Very Good" },
        { grade: "B+", maxPercentage: 80, minPercentage: 70, remark: "Good" },
        { grade: "B", maxPercentage: 70, minPercentage: 60, remark: "Better" },
        { grade: "C", maxPercentage: 60, minPercentage: 50, remark: "Keep Hard Working" },
        { grade: "D", maxPercentage: 50, minPercentage: 40, remark: "Keep Hard Working" },
        { grade: "E", maxPercentage: 40, minPercentage: 0, remark: "" }
      ]
    },
    {
      title: "Exam grade 1",
      description: "A degree or step in a scale, as of rank, advancement, quality, value, or intensity.",
      grades: [
        { grade: "A+", maxPercentage: 100, minPercentage: 90, remark: "Excellent" },
        { grade: "A", maxPercentage: 90, minPercentage: 80, remark: "Very Good" },
        { grade: "B+", maxPercentage: 80, minPercentage: 70, remark: "Good" },
        { grade: "B", maxPercentage: 70, minPercentage: 60, remark: "Keep Hard working" },
        { grade: "C", maxPercentage: 60, minPercentage: 50, remark: "Keep Hard working" },
        { grade: "D", maxPercentage: 50, minPercentage: 40, remark: "Keep Hard working" },
        { grade: "E", maxPercentage: 40, minPercentage: 0, remark: "Keep Hard working" }
      ]
    }
  ]);

  const [selectedIndex, setSelectedIndex] = useState();
  const [showEditContent, setShowEditContent] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showAddGrade, setShowAddGrade] = useState(false);

  const handleEdit = (newData) => {
    const temp = [...gradeData];
    temp[selectedIndex] = newData;
    setGradeData(temp);
    setShowEditContent(false);
  };

  const handleAdd = (newData) => {
    setGradeData([...gradeData, newData])
    setShowAddGrade(false)
  }

  const handleExcelExport = () => {
    if (!gradeData || gradeData.length === 0) return;

    // Flatten the nested grade data
    const flattenedData = gradeData.flatMap(section =>
      section.grades.map(grade => ({
        Title: section.title,
        Description: section.description,
        Grade: grade.grade,
        "Max %": grade.maxPercentage,
        "Min %": grade.minPercentage,
        Remark: grade.remark,
      }))
    );

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');

    // Export
    XLSX.writeFile(workbook, 'grade_data.xlsx');
  };


  const handlePrint = () => {
    if (!gradeData || gradeData.length === 0) return;

    let htmlContent = `
    <html>
      <head>
        <title>Grade Data</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #2c3e50; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 40px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f8f8f8; }
          .section-title { margin-top: 30px; font-size: 18px; color: #34495e; }
          .description { margin: 10px 0 20px 0; font-style: italic; color: #555; }
        </style>
      </head>
      <body>
        <h1>Grade Report</h1>
  `;

    gradeData.forEach((section, i) => {
      htmlContent += `
      <div>
        <div class="section-title">${i + 1}. ${section.title}</div>
        <div class="description">${section.description}</div>
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Max %</th>
              <th>Min %</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
    `;

      section.grades.forEach(grade => {
        htmlContent += `
        <tr>
          <td>${grade.grade ?? ""}</td>
          <td>${grade.maxPercentage ?? ""}</td>
          <td>${grade.minPercentage ?? ""}</td>
          <td>${grade.remark ?? ""}</td>
        </tr>
      `;
      });

      htmlContent += `
          </tbody>
        </table>
      </div>
    `;
    });

    htmlContent += `
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
  `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleCopy = () => {
    if (!gradeData || gradeData.length === 0) return;
  
    const jsonText = JSON.stringify(gradeData, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center my-4 ' >
        <h2 className="text-lg md:text-xl font-semibold mb-4">Exam Grades List</h2>
        <button
          onClick={() => setShowAddGrade(true)}
          className='btn btn-primary' >+Add</button>
      </div>

      <div className='flex justify-end gap-3 my-4' >
        <button>
          <Database
            className='w-5 h-5'
            onClick={handleExcelExport}
          />
        </button>
        <button>
          <Download
            className='w-5 h-5'
            onClick={handleExcelExport}
          />
        </button>
        <button>
          <Copy 
          className='w-5 h-5' 
          onClick={handleCopy}
          />
        </button>
        <button>
          <Printer
            className='w-5 h-5'
            onClick={handlePrint}
          />
        </button>
      </div>

      {gradeData.map((gradeInfo, index) => (
        <div key={index} className="mb-8 overflow-x-auto rounded-lg border">
          <table className="min-w-[700px] w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Grade Title</th>
                <th className="border px-3 py-2 text-left">Description</th>
                <th className="border px-3 py-2 text-left">Grade</th>
                <th className="border px-3 py-2 text-left">Max %</th>
                <th className="border px-3 py-2 text-left">Min %</th>
                <th className="border px-3 py-2 text-left">Remark</th>
                <th className="border px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {gradeInfo.grades.map((grade, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {idx === 0 ? (
                    <>
                      <td rowSpan={gradeInfo.grades.length} className="border px-3 py-2 align-top">{gradeInfo.title}</td>
                      <td rowSpan={gradeInfo.grades.length} className="border px-3 py-2 align-top">{gradeInfo.description}</td>
                    </>
                  ) : null}
                  <td className="border px-3 py-2">{grade.grade}</td>
                  <td className="border px-3 py-2">{grade.maxPercentage}</td>
                  <td className="border px-3 py-2">{grade.minPercentage}</td>
                  <td className="border px-3 py-2">{grade.remark}</td>
                  {idx === 0 ? (
                    <td className="border px-3 py-2 align-top">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowEditContent(true);
                            setSelectedData(gradeInfo);
                            setSelectedIndex(index);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setGradeData(gradeData.filter((grade, idx) => index !== idx))}
                          className="text-red-600 hover:text-red-800">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {showEditContent && (
        <EditGrade
          content={selectedData}
          handleEdit={handleEdit}
          onClose={() => setShowEditContent(false)}
        />
      )}
      {
        showAddGrade && (
          <AddGrade
            handleAdd={handleAdd}
            onClose={() => setShowAddGrade(false)}
          />
        )
      }
    </div>
  );
}

export default ExamGrade;

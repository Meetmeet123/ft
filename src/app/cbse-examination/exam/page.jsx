"use client"
import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Tag, FileText, Grid, Calendar, MessageSquare, Edit, Monitor, Trash2, ChevronDown, Database, Download, Copy, Printer, View } from 'lucide-react';
import ViewStudent from './student-details/ViewStudent';
import AddExam from './student-details/AddExamSubject';
import ExamSubject from './student-details/EnterExamSubject';
import ExamAttendance from './student-details/ExamAttendance';
import TeacherRemarks from './student-details/TeacherRemarks';
import EditExam from './student-details/EditExam';
import GenerateRank from './student-details/GenerateRank';
import * as XLSX from 'xlsx';

export default function ExamList() {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Subject Wise Test(May-2025)',
      class: 'Class 5 (A, B, C, D)',
      term: 'Term 2',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Subject Wise Test',
      createdAt: '05/01/2025'
    },
    {
      id: 2,
      name: 'CBSE Periodic Test',
      class: 'Class 1 (A, B, C, D)',
      term: 'Term 1',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Periodic Test',
      createdAt: '05/01/2025'
    },
    {
      id: 3,
      name: 'Weekly Periodic Test-2',
      class: 'Class 5 (A, B, C, D)',
      term: 'Term 2',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Weekly Periodic Test-2',
      createdAt: '04/01/2025'
    },
    {
      id: 4,
      name: 'Chapter Wise Weekly Test-1',
      class: 'Class 5 (A, B, C, D)',
      term: 'Term 1',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Chapter Wise Weekly Test-1',
      createdAt: '04/01/2025'
    },
    {
      id: 5,
      name: 'Online Assessment Test',
      class: 'Class 2 (A, B, C, D)',
      term: 'Term 2',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Online Assessment Test',
      createdAt: '04/01/2025'
    },
    {
      id: 6,
      name: 'Monthly Test (APRIL-2025)',
      class: 'Class 1 (A, B, C, D)',
      term: 'Term 1',
      subjectsIncluded: 4,
      examPublished: true,
      publishedResult: true,
      description: 'Monthly Test (APRIL-2025)',
      createdAt: '04/01/2025'
    }
  ]);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [showExam,setShowExam] = useState(false);
  const [showExamAttendance, setShowExamAttendance] = useState(false);
  const [showTeacherRemarks, setShowTeacherRemarks] = useState(false);
  const [showEditExam, setShowEditExam] = useState(false);
  const [generateRank, setGenerateRank] = useState(false);

  const handleExcelExport = () => {
      // Step 1: Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(exams);
    
      // Step 2: Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
    
      // Step 3: Trigger download
      XLSX.writeFile(workbook, 'exam.xlsx');
    };

    const handleCopy = () => {
    if (!exams || exams.length === 0) return;
  
    const jsonText = JSON.stringify(exams, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handlePrint = () => {
    if (!exams || exams.length === 0) return;
  
    const headers = Object.keys(exams[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    exams.forEach(row => {
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
          <title>Exams</title>
        </head>
        <body>
          <h2>Exams</h2>
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
    <div className="bg-white shadow rounded-sm w-full overflow-hidden">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-medium text-gray-700">Exam List</h1>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center">
          <span className="mr-1">+</span> Add
        </button>
      </div>

      {/* Search and Export Options */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-center md:items-center border-b">
        <div className="relative lg:w-1/2 md:w-full mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="flex space-x-2 gap-3">
          <button className="p-2 border rounded hover:bg-gray-100">
            <Database 
            size={16} className="text-gray-600" 
            onClick={handleExcelExport}
            />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Download 
            size={16} className="text-gray-600" 
            onClick={handleExcelExport}
            />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Copy 
            size={16} className="text-gray-600" 
            onClick={handleCopy}
            />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Printer 
            size={16} className="text-gray-600" 
            onClick={handlePrint}
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Exam Name
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Class (Sections)
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Term
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Subjects Included
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam Published
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Published Result
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Description
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Created At
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam, index) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">{exam.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{exam.class}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{exam.term}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{exam.subjectsIncluded}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {exam.examPublished && <span className="inline-block w-5 h-5 bg-gray-200 rounded-sm text-center">✓</span>}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {exam.publishedResult && <span className="inline-block w-5 h-5 bg-gray-200 rounded-sm text-center">✓</span>}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{exam.description}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{exam.createdAt}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <div className="flex space-x-2 gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Tag 
                      size={16} 
                        onClick={() => setShowViewStudent(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FileText 
                      size={16} 
                      onClick={()=>setShowAddExam(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Grid 
                      size={16} 
                      onClick={()=>setShowExam(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Calendar 
                      size={16} 
                      onClick={()=>setShowExamAttendance(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MessageSquare 
                      size={16} 
                      onClick={()=>setShowTeacherRemarks(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit 
                      size={16} 
                      onClick={()=>setShowEditExam(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Monitor 
                      size={16} 
                      onClick={()=>setGenerateRank(true)}
                      />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Trash2 
                      size={16} 
                      onClick={()=>setExams(exams.filter((exam,idx)=>idx!==index))}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t">
        <div className="text-sm text-gray-500">
          Records: 1 to 6 of 6
        </div>
        <div className="flex space-x-1">
          <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50">
            <ChevronLeft size={16} />
          </button>
          <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 hover:bg-blue-100">
            1
          </button>
          <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {showViewStudent && <ViewStudent onClose={()=>setShowViewStudent(false)} />}
      {showAddExam && <AddExam onClose={()=>setShowAddExam(false)} />}
      {showExam && <ExamSubject onClose={()=>setShowExam(false)} />}
      {showExamAttendance && <ExamAttendance onClose={()=>setShowExamAttendance(false)}/>}
      {showTeacherRemarks &&  <TeacherRemarks onClose={()=>setShowTeacherRemarks(false)} />}
      {showEditExam && <EditExam onClose={()=>setShowEditExam(false)} />}
      {generateRank &&  <GenerateRank onClose={()=>{setGenerateRank(false)}} />}
    </div>
  );
}
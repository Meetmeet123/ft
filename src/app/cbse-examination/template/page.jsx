"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Plus, Search, Menu, Database, Download, Copy, Printer, ClipboardList } from 'lucide-react';
import ReportCard from './template-details/ReportCard';
import LinkExam from './template-details/LinkExam';
import GenerateRank from './template-details/GenerateRank';
import * as XLSX from 'xlsx'

export default function TemplateList() {
  // Sample data for templates
  const initialTemplates = [
    { id: 1, name: 'Monthly Test Template', classSections: 'Class 1: A, B, C, D', description: '' },
    { id: 2, name: 'Assessment Template', classSections: 'Class 2: A, B, C, D', description: '' },
    { id: 3, name: 'All Term Test Template', classSections: 'Class 5: A, B, C, D', description: '' },
    { id: 4, name: 'Periodic Singlewise Test Template', classSections: 'Class 1: A, B, C, D', description: '' },
    { id: 5, name: 'Subject Test Template', classSections: 'Class 5: A, B, C, D', description: '' },
  ];

  const [templates, setTemplates] = useState(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showGenerateRank, setShowGenerateRank] = useState(false);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to templates
  const sortedTemplates = [...templates].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter templates based on search term
  const filteredTemplates = sortedTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.classSections.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Delete template function
  const deleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const [showMenu, setShowMenu] = useState(false);
  const [showLinkExam, setShowLinkExam] = useState(false);

  const handleExcelExport = () => {
      // Step 1: Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(templates);
    
      // Step 2: Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
    
      // Step 3: Trigger download
      XLSX.writeFile(workbook, 'template.xlsx');
  };

   const handleCopy = () => {
    if (!templates || templates.length === 0) return;
  
    const jsonText = JSON.stringify(templates, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

    const handlePrint = () => {
    if (!templates || templates.length === 0) return;
  
    const headers = Object.keys(templates[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    templates.forEach(row => {
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
          <title>Template</title>
        </head>
        <body>
          <h2>Template</h2>
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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded shadow max-w-full mx-auto">
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-medium text-gray-700">Template List</h1>
        </div>
        
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-2 w-full pr-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex space-x-2 gap-3">
            <button className="border rounded p-1">
                <Database 
                className='h-5 w-5' 
                onClick={handleExcelExport}
                />
            </button>
            <button className="border rounded p-1">
                <Download 
                className='h-5 w-5' 
                onClick={handleExcelExport}
                />
            </button>
            <button className="border rounded p-1">
                <Copy 
                className='h-5 w-5' 
                onClick={handleCopy}
                />
            </button>
            <button 
            className="border rounded p-1"
            onClick={handlePrint}
            >
                <Printer className='h-5 w-5' />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm">
                <th 
                  className="px-4 py-3 font-medium cursor-pointer border-b relative"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Template
                    <span className="ml-1">{getSortIcon('name')}</span>
                  </div>
                </th>
                <th 
                  className="px-4 py-3 font-medium cursor-pointer border-b"
                  onClick={() => requestSort('classSections')}
                >
                  <div className="flex items-center">
                    Class Sections
                    <span className="ml-1">{getSortIcon('classSections')}</span>
                  </div>
                </th>
                <th 
                  className="px-4 py-3 font-medium cursor-pointer border-b"
                  onClick={() => requestSort('description')}
                >
                  <div className="flex items-center">
                    Template Description
                    <span className="ml-1">{getSortIcon('description')}</span>
                  </div>
                </th>
                <th className="px-4 py-3 font-medium border-b text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-gray-700">{template.name}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{template.classSections}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{template.description}</td>
                  <td className="px-4 py-3 border-b text-right">
                    <div className="flex justify-end space-x-1">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <Menu 
                        className='h-5 w-5' 
                        onClick={()=>setShowMenu(true)}
                        />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <ClipboardList 
                        className='h-5 w-5' 
                        onClick={()=>setShowLinkExam(true)}
                        />
                      </button>
                      <button 
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onClick={()=>setShowGenerateRank(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => deleteTemplate(template.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div>
            Records: {Math.min(1, filteredTemplates.length)} to {Math.min(filteredTemplates.length, 5)} of {filteredTemplates.length}
          </div>
          <div className="flex items-center mt-3 sm:mt-0">
            <button 
              className="border rounded p-1 mx-1 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200">{currentPage}</span>
            <button 
              className="border rounded p-1 mx-1 disabled:opacity-50"
              disabled={currentPage * 5 >= filteredTemplates.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      {showMenu && <ReportCard onClose={()=>setShowMenu(false)} />}
      {showLinkExam &&  <LinkExam onClose={()=>setShowLinkExam(false)} />}
      {showGenerateRank && <GenerateRank onClose={()=>setShowGenerateRank(false)}/>}
    </div>
  );
}
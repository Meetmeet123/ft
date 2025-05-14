"use client";
import React, { useState } from 'react';
import { Trash2, Edit, PlusCircle, Database, Download, Copy, Printer } from 'lucide-react';
import * as XLSX from 'xlsx'

const initialObservations = [
  {
    "Name": "Annuelle",
    "Code": "AN",
    "Description": ""
  },
  {
    "Name": "Term 2",
    "Code": "T015",
    "Description": "An examination is a formal test that you take to show your knowledge or ability in a particular subject, or to obtain a qualification. If you have a medical examination, a doctor looks at your body, feels it, or does simple tests in order to check how healthy you are."
  },
  {
    "Name": "Term 1",
    "Code": "T021",
    "Description": "An examination is a formal test that you take to show your knowledge or ability in a particular subject, or to obtain a qualification. If you have a medical examination, a doctor looks at your body, feels it, or does simple tests in order to check how healthy you are."
  }
];

export default function Term() {
  const [observations, setObservations] = useState(initialObservations);
  const [editingObservation, setEditingObservation] = useState(null);
  const [newObservation, setNewObservation] = useState({
    Name: '',
    Code: '',
    Description: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingObservation) {
      setEditingObservation({ ...editingObservation, [name]: value });
    } else {
      setNewObservation({ ...newObservation, [name]: value });
    }
  };

  const addObservation = () => {
    const newEntry = { ...newObservation, id: observations.length + 1 };
    setObservations([...observations, newEntry]);
    setNewObservation({ Name: '', Code: '', Description: '' });
    setIsModalOpen(false);
  };

  const updateObservation = () => {
    setObservations(observations.map(obs => obs.Code === editingObservation.Code ? editingObservation : obs));
    setEditingObservation(null);
  };

  const deleteObservation = (id) => {
    setObservations(observations.filter(obs => obs.id !== id));
  };

  const handleExcelExport = () => {
          // Step 1: Convert data to worksheet
          const worksheet = XLSX.utils.json_to_sheet(observations);
        
          // Step 2: Create a new workbook and append the worksheet
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
        
          // Step 3: Trigger download
          XLSX.writeFile(workbook, 'Observation.xlsx');
        };
    
      const handleCopy = () => {
        if (!observations || observations.length === 0) return;
      
        const jsonText = JSON.stringify(observations, null, 2);
      
        navigator.clipboard.writeText(jsonText)
          .then(() => {
            alert('JSON data copied to clipboard');
          })
          .catch(err => {
            console.error('Failed to copy JSON: ', err);
          });
      };
    
      const handlePrint = () => {
    if (!observations || observations.length === 0) return;
  
    const headers = Object.keys(observations[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    observations.forEach(row => {
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
          <title>Print Payment Requests</title>
        </head>
        <body>
          <h2>Payment Requests</h2>
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
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <h2 className="text-xl font-semibold">Assign Observation List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <PlusCircle className="mr-2" size={20} /> Add
          </button>
        </div>

        <div className="flex gap-3 my-4 justify-end mx-5">
          <button><Database className="h-5 w-5" onClick={handleExcelExport} /></button>
          <button><Download className="h-5 w-5" onClick={handleExcelExport} /></button>
          <button><Copy className="h-5 w-5" onClick={handleCopy} /></button>
          <button><Printer className="h-5 w-5" onClick={handlePrint} /></button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Observation</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{obs.Name}</td>
                  <td className="p-3">{obs.Code}</td>
                  <td className="p-3">{obs.Description}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => setEditingObservation(obs)} className="text-blue-500 hover:text-blue-700">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => deleteObservation(obs.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 text-gray-500">
          Records: 1 to {observations.length} of {observations.length}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isModalOpen || editingObservation) && (
        <div className="fixed inset-0 bg-opacity-50 bg-gray-800 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-xl mb-4">{editingObservation ? 'Edit Observation' : 'Add Observation'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="Name"
                placeholder="Observation Name"
                value={editingObservation ? editingObservation.Name : newObservation.Name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="Code"
                placeholder="Observation Code"
                value={editingObservation ? editingObservation.Code : newObservation.Code}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="Description"
                placeholder="Description"
                value={editingObservation ? editingObservation.Description : newObservation.Description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingObservation(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={editingObservation ? updateObservation : addObservation}
                  className="px-4 py-2 btn btn-primary text-white rounded hover:bg-blue-600"
                >
                  {editingObservation ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

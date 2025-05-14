"use client"
import React, { useState } from 'react';
import { Trash2, Edit, PlusCircle, Database, Download, Copy, Printer } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ObservationList() {
  const [observations, setObservations] = useState([
    { id: 1, observation: 'Cbse Exam Observation 1', term: 'Term 1', code: 'T021', description: 'The details of Observation, Term, Code, Description column which you recently added.' },
    { id: 2, observation: 'Cbse Exam Observation 2', term: 'Term 2', code: 'T015', description: 'The details of Observation, Term, Code.' }
  ]);

  const [editingObservation, setEditingObservation] = useState(null);
  const [newObservation, setNewObservation] = useState({
    observation: '',
    term: '',
    code: '',
    description: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingObservation) {
      setEditingObservation(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewObservation(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addObservation = () => {
    if (!newObservation.observation || !newObservation.term || !newObservation.code) return;

    const newEntry = {
      ...newObservation,
      id: observations.length + 1
    };

    setObservations([...observations, newEntry]);
    setNewObservation({ observation: '', term: '', code: '', description: '' });
    setIsModalOpen(false);
  };

  const updateObservation = () => {
    if (!editingObservation.observation || !editingObservation.term || !editingObservation.code) return;

    setObservations(observations.map(obs => 
      obs.id === editingObservation.id ? editingObservation : obs
    ));
    setEditingObservation(null);
  };

  const deleteObservation = (id) => {
    setObservations(observations.filter(obs => obs.id !== id));
  };

  const openEditModal = (observation) => {
    setEditingObservation(observation);
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
          <title>Observation</title>
        </head>
        <body>
          <h2>Observation</h2>
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

        <div className='flex gap-3 my-4 justify-end mx-5' >
            <button>
                <Database 
                className='h-5 w-5' 
                onClick={handleExcelExport}
                />
            </button>
            <button>
                <Download 
                className='h-5 w-5' 
                onClick={handleExcelExport}
                />
            </button>
            <button>
                <Copy 
                className='h-5 w-5' 
                onClick={handleCopy}
                />
            </button>
            <button>
                <Printer 
                className='h-5 w-5' 
                onClick={handlePrint}
                />
            </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Observation</th>
                <th className="p-3 text-left">Term</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs) => (
                <tr key={obs.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{obs.observation}</td>
                  <td className="p-3">{obs.term}</td>
                  <td className="p-3">{obs.code}</td>
                  <td className="p-3">{obs.description}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button 
                      onClick={() => openEditModal(obs)} 
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => deleteObservation(obs.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
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
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-xl mb-4">
              {editingObservation ? 'Edit Observation' : 'Add Observation'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="observation"
                placeholder="Observation"
                value={editingObservation ? editingObservation.observation : newObservation.observation}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                name="term"
                placeholder="Term"
                value={editingObservation ? editingObservation.term : newObservation.term}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                name="code"
                placeholder="Code"
                value={editingObservation ? editingObservation.code : newObservation.code}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editingObservation ? editingObservation.description : newObservation.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                rows="4"
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
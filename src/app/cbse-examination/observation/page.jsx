"use client";
import React, { useState } from 'react';
import { Trash2, Edit, PlusCircle, Database, Download, Copy, Printer } from 'lucide-react';
import * as XLSX from 'xlsx'

const initialObservations = [
  {
    id: 1,
    observation: "Cbse Exam Observation 1",
    observationDescription:
      "In an observational study, researchers study how participants perform certain behaviours or activities without telling them what methods or behaviours to choose.",
    parameters: [
      { parameter: "Behaviour", maximumMarks: 20 },
      { parameter: "Art & Culture", maximumMarks: 25 },
    ],
  },
  {
    id: 2,
    observation: "Cbse Exam Observation 2",
    observationDescription:
      "In an observational study, researchers study how participants perform certain behaviours or activities without telling them what methods or behaviours to choose.",
    parameters: [
      { parameter: "Game", maximumMarks: 30 },
      { parameter: "Painting", maximumMarks: 20 },
    ],
  },
];

export default function Parameter() {
  const [observations, setObservations] = useState(initialObservations);
  const [editingObservation, setEditingObservation] = useState(null);
  const [newObservation, setNewObservation] = useState({
    observation: '',
    observationDescription: '',
    parameters: [{ parameter: '', maximumMarks: '' }]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === 'parameter' || name === 'maximumMarks') {
      const updatedParams = (editingObservation ? editingObservation.parameters : newObservation.parameters).map((p, i) =>
        i === index ? { ...p, [name]: name === 'maximumMarks' ? Number(value) : value } : p
      );
      editingObservation
        ? setEditingObservation({ ...editingObservation, parameters: updatedParams })
        : setNewObservation({ ...newObservation, parameters: updatedParams });
    } else {
      editingObservation
        ? setEditingObservation({ ...editingObservation, [name]: value })
        : setNewObservation({ ...newObservation, [name]: value });
    }
  };

  const addObservation = () => {
    const newEntry = {
      ...newObservation,
      id: observations.length + 1,
      parameters: newObservation.parameters.map(p => ({ ...p, maximumMarks: Number(p.maximumMarks) })),
    };
    setObservations([...observations, newEntry]);
    setNewObservation({ observation: '', observationDescription: '', parameters: [{ parameter: '', maximumMarks: '' }] });
    setIsModalOpen(false);
  };

  const updateObservation = () => {
    setObservations(observations.map(obs => obs.id === editingObservation.id ? editingObservation : obs));
    setEditingObservation(null);
  };

  const deleteObservation = (id) => {
    setObservations(observations.filter(obs => obs.id !== id));
  };

  const addParameterField = () => {
    editingObservation
      ? setEditingObservation({
          ...editingObservation,
          parameters: [...editingObservation.parameters, { parameter: '', maximumMarks: '' }],
        })
      : setNewObservation({
          ...newObservation,
          parameters: [...newObservation.parameters, { parameter: '', maximumMarks: '' }],
        });
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

  let table = `
    <table border="1" style="border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 14px;">
      <thead>
        <tr>
          <th style="padding: 8px; text-align: left;">ID</th>
          <th style="padding: 8px; text-align: left;">Observation</th>
          <th style="padding: 8px; text-align: left;">Description</th>
          <th style="padding: 8px; text-align: left;">Parameters</th>
        </tr>
      </thead>
      <tbody>
  `;

  observations.forEach(obs => {
    const paramTable = `
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="padding: 6px;">Parameter</th>
            <th style="padding: 6px;">Max Marks</th>
          </tr>
        </thead>
        <tbody>
          ${obs.parameters
            .map(
              p => `
              <tr>
                <td style="padding: 6px;">${p.parameter}</td>
                <td style="padding: 6px;">${p.maximumMarks}</td>
              </tr>
            `
            )
            .join('')}
        </tbody>
      </table>
    `;

    table += `
      <tr>
        <td style="padding: 8px;">${obs.id}</td>
        <td style="padding: 8px;">${obs.observation}</td>
        <td style="padding: 8px;">${obs.observationDescription}</td>
        <td style="padding: 8px;">${paramTable}</td>
      </tr>
    `;
  });

  table += '</tbody></table>';

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Observation</title>
      </head>
      <body>
        <h2 style="font-family: sans-serif;">Observations</h2>
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
          <button><Database className="h-5 w-5" onClick={handleExcelExport}/></button>
          <button><Download className="h-5 w-5" onClick={handleExcelExport} /></button>
          <button><Copy className="h-5 w-5" onClick={handleCopy} /></button>
          <button><Printer className="h-5 w-5" onClick={handlePrint} /></button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Observation</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Parameters</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {observations.map(obs => (
                <tr key={obs.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{obs.observation}</td>
                  <td className="p-3">{obs.observationDescription}</td>
                  <td className="p-3">
                    <ul className="list-disc pl-4">
                      {obs.parameters.map((param, idx) => (
                        <li key={idx}>
                          {param.parameter} - {param.maximumMarks} marks
                        </li>
                      ))}
                    </ul>
                  </td>
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
                name="observation"
                placeholder="Observation"
                value={editingObservation ? editingObservation.observation : newObservation.observation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="observationDescription"
                placeholder="Description"
                value={editingObservation ? editingObservation.observationDescription : newObservation.observationDescription}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
              <div>
                <h4 className="font-medium mb-2">Parameters</h4>
                {(editingObservation ? editingObservation.parameters : newObservation.parameters).map((param, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      name="parameter"
                      placeholder="Parameter"
                      value={param.parameter}
                      onChange={(e) => handleInputChange(e, idx)}
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="number"
                      name="maximumMarks"
                      placeholder="Marks"
                      value={param.maximumMarks}
                      onChange={(e) => handleInputChange(e, idx)}
                      className="w-24 p-2 border rounded"
                    />
                  </div>
                ))}
                <button onClick={addParameterField} className="text-blue-500 text-sm mt-1 hover:underline">
                  + Add Parameter
                </button>
              </div>

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

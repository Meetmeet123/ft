// pages/student/[id]/behaviour.js
"use client";
import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Copy,
  Trash2,
  FileEdit,
  FileText,
  Printer,
  Table2,
} from 'lucide-react';

export default function StudentBehaviour() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [comment, setComment] = useState('');
  const [showDescription, setShowDescription] = useState(true);

  const [behaviourData, setBehaviourData] = useState([
    {
      id: 1,
      title: 'Student Good Behaviour',
      point: 20,
      date: '04/01/2025',
      description: 'Smile & have a good attitude and good behaviour.',
      assignBy: 'Jason Sharlton (90006)',
    },
    {
      id: 2,
      title: 'Harassment and bullying',
      point: -10,
      date: '04/01/2025',
      description:
        'If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation.',
      assignBy: 'Jason Sharlton (90006)',
    },
  ]);

  const handleActionClick = (rowId) => {
    setActiveRow(rowId);
    setIsCommentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCommentModalOpen(false);
    setComment('');
  };

  const handleSubmitComment = () => {
    console.log(`Submitting comment for row ${activeRow}: ${comment}`);
    handleCloseModal();
  };

  const handleCopy = () => {
    const data = behaviourData
      .map((row) => `${row.title} - ${row.point} - ${row.date}`)
      .join('\n');
    navigator.clipboard.writeText(data);
    alert('Copied to clipboard!');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete all behaviour entries?')) {
      setBehaviourData([]);
    }
  };

  const handleEdit = () => {
    const id = prompt('Enter ID of row to edit:');
    if (!id) return;

    const target = behaviourData.find((row) => row.id === parseInt(id));
    if (!target) {
      alert('ID not found.');
      return;
    }

    const newTitle = prompt('Edit Title', target.title);
    if (newTitle !== null) {
      setBehaviourData((prev) =>
        prev.map((row) =>
          row.id === parseInt(id) ? { ...row, title: newTitle } : row
        )
      );
    }
  };

  const handleExportPDF = () => {
    const newWindow = window.open('', '', 'width=800,height=600');
    const html = `
      <html>
        <head><title>Student Behaviour PDF</title></head>
        <body>
          <h1>Student Behaviour Report</h1>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Point</th>
                <th>Date</th>
                ${showDescription ? '<th>Description</th>' : ''}
                <th>Assign By</th>
              </tr>
            </thead>
            <tbody>
              ${behaviourData
                .map(
                  (row) => `
                <tr>
                  <td>${row.title}</td>
                  <td>${row.point}</td>
                  <td>${row.date}</td>
                  ${showDescription ? `<td>${row.description}</td>` : ''}
                  <td>${row.assignBy}</td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    newWindow.document.write(html);
    newWindow.document.close();
    newWindow.print(); // Trigger print dialog
  };

  const handlePrint = () => {
    window.print();
  };

  const handleColumnSettings = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Action Icons */}
      <div className="bg-white p-2 border-b border-gray-200 flex justify-end space-x-2">
        <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded">
          <Copy size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Trash2 size={18} />
        </button>
        <button onClick={handleEdit} className="p-1 hover:bg-gray-100 rounded">
          <FileEdit size={18} />
        </button>
        <button
          onClick={handleExportPDF}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <FileText size={18} />
        </button>
        <button
          onClick={handlePrint}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Printer size={18} />
        </button>
        <button
          onClick={handleColumnSettings}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Table2 size={18} />
        </button>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Point
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {showDescription && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assign By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {behaviourData.map((row) => (
              <tr
                key={row.id}
                className={
                  row.point < 0 ? 'bg-red-50' : 'bg-white hover:bg-gray-50'
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.point}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.date}
                </td>
                {showDescription && (
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                    {row.description}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.assignBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleActionClick(row.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <MessageSquare size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                placeholder="Type your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                onClick={handleSubmitComment}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

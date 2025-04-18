// pages/student/[id].js
"use client";
import { useState } from 'react';
import { Edit, Trash2, Plus, UploadCloud } from 'lucide-react';

function PopUpEdit({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
        <div 
        onClick={onClose}
        className='flex items-center justify-between' >
            <h2 className="text-xl font-semibold mb-4">Add Timeline Event</h2>
            <button className='btn btn-danger'>X</button>
        </div>
        <label className="block mb-1">Title</label>
        <input type="text" className="w-full border px-2 py-1 rounded mb-4" />

        <label className="block mb-1">Date</label>
        <input type="date" className="w-full border px-2 py-1 rounded mb-4" />

        <label className="block mb-1">Description</label>
        <textarea className="w-full border px-2 py-1 rounded mb-4" rows="3" />

        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 w-fit mb-5">
        <UploadCloud size={18} />
        <span>Upload Document</span>
        <input type="file" className="hidden" />
        </label>

        <label className="block mb-2">
          <input type="checkbox" className="mr-2" />
          Visible to person
        </label>

        <div className="flex justify-end space-x-2 gap-5">
          <button onClick={onClose} className="btn btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function StudentProfile() {
  const [showPopup, setShowPopUp] = useState(false);

  const timelineEvents = [
    {
      date: "04/01/2025",
      title: "Fees Updates",
      content: "A fee is the price one pays as remuneration for rights or services. Fees usually allow for overhead, wages, costs, and markup."
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPopUp(true)}
              className="btn btn-primary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add
            </button>
          </div>

          {showPopup && <PopUpEdit onClose={() => setShowPopUp(false)} />}

          {/* Timeline */}
          <div className="relative pb-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 mt-1">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-sm mb-2">{event.date}</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className="w-0.5 bg-blue-600 h-24"></div>
                    <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="ml-16 bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-blue-500">{event.title}</h3>
                    <div className="flex space-x-2 gap-5">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">{event.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

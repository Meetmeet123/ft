// components/DocumentsPage.tsx
'use client';
import { UploadIcon } from 'lucide-react';
import { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface DocumentData {
  title: string;
  file: File;
}

interface UploadDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DocumentData) => void;
}

interface DocumentItem {
  id: number;
  title: string;
  fileName: string;
}

function UploadDocumentsModal({ isOpen, onClose, onSave }: UploadDocumentsModalProps) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (title && file) {
      onSave({ title, file });
      setTitle('');
      setFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Documents <span className="text-red-500">*</span>
          </label>
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center">
              <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-500">
                {file ? file.name : 'Drag and drop a file here or click'}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={!title || !file}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 1, title: 'new', fileName: 'students_data.csv' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadDocument = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDocument = (newDocument: DocumentData) => {
    const documentToAdd: DocumentItem = {
      id: documents.length + 1,
      title: newDocument.title,
      fileName: newDocument.file.name
    };

    setDocuments([...documents, documentToAdd]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="mx-auto px-4 flex justify-end">
          <button
            className="btn w-1/4 flex items-center gap-3"
            onClick={handleUploadDocument}
          >
            <UploadIcon /> Upload Document
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleUploadDocument}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Documents
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{document.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.fileName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <UploadDocumentsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveDocument}
      />
    </div>
  );
}

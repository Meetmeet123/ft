"use client"
import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, X, Save, Upload, Printer, Database, Copy, Download } from "lucide-react";
import { getLibraryBookList, AddBook, updateBookDetails, deleteDetails, uploadCsvFile, uploadNewCsvFile } from './BookListDetails';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx'

const initialFormData = {
  book_title: "",
  book_no: "",
  isbn_no: "",
  publish: "",
  author: "",
  subject: "",
  rack_no: "",
  qty: 0,
  perunitcost: 0,
  postdate: new Date().toISOString().split('T')[0],
  description: ""
};

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [uploadCSVFile, setUploadCSVFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);


  const fetchBookList = async () => {
      try {
        setLoading(true);
        const res = await getLibraryBookList();
        setBookList(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchBookList();
  }, []);

  const filteredBooks = bookList.filter(book =>
    book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return `${parseFloat(price.toString()).toFixed(2)}`;
  };

  // Function to convert object/array to CSV string
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';

    // Get headers from the first object
    const headers = Object.keys(data[0]);

    // Create CSV header row
    const csvHeaders = headers.join(',');

    // Create CSV data rows
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = row[header];
        // Handle values that contain commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    // Combine headers and rows
    return [csvHeaders, ...csvRows].join('\n');
  };

  // Updated upload function
  const handleUploadFile = async () => {
    console.log(uploadedFile);
    if (!uploadedFile) return;

    try {
      // Convert object to CSV string
      const csvString = convertToCSV(uploadedFile);

      // Create a Blob with CSV content
      const csvBlob = new Blob([csvString], { type: 'text/csv' });

      // Create FormData and append the CSV file
      const formData = new FormData();
      formData.append('file', csvBlob, 'upload.csv');

      const res = await (editingBook ? uploadCsvFile(formData) : uploadNewCsvFile(formData));
      fetchBookList();
      console.log(res);
      if (res.status === 200) toast.success("File Uploaded Successfully")
      
    } catch (err) {
      console.log(err)
      if(err.status === 422){ 
        toast.error("Upload only CSV Files")
      }
      if(err.status === 500){
        toast.error("Could'nt process the file")
      }
    } finally{
      setShowAddForm(false);
      setEditingBook(null);
      setFormData(initialFormData);
      setFormErrors({});
      setUploadedFile(null);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.book_title.trim()) {
      errors.book_title = "Book title is required";
    }
    if (!formData.book_no.trim()) {
      errors.book_no = "Book number is required";
    }
    if (!formData.isbn_no.trim()) {
      errors.isbn_no = "ISBN number is required";
    }
    if (!formData.author.trim()) {
      errors.author = "Author is required";
    }
    if (!formData.publish.trim()) {
      errors.publish = "Publisher is required";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.rack_no.trim()) {
      errors.rack_no = "Rack number is required";
    }
    if (formData.qty <= 0) {
      errors.qty = "Quantity must be greater than 0";
    }
    if (formData.perunitcost <= 0) {
      errors.perunitcost = "Price must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'qty' || name === 'perunitcost' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleAddBook = () => {
    setShowAddForm(true);
    setEditingBook(null);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowAddForm(true);
    setFormData({
      book_title: book.book_title,
      book_no: book.book_no,
      isbn_no: book.isbn_no,
      publish: book.publish,
      author: book.author,
      subject: book.subject,
      rack_no: book.rack_no,
      qty: book.qty,
      perunitcost: book.perunitcost,
      postdate: book.postdate,
      description: book.description || ""
    });
    setFormErrors({});
  };

  const handleSaveBook = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (editingBook) {
        // Update existing book
        const updatedBooks = bookList.map(book =>
          book.id === editingBook.id
            ? { ...book, ...formData, available: "yes" }
            : book
        );
        setBookList(updatedBooks);
        const payloadData = {
          book_title: formData.book_title,
          book_no: formData.book_no,
          isbn_no: formData.isbn_no,
          subject: formData.subject,
          rack_no: formData.rack_no,
          publish: formData.publish,
          author: formData.author,
          qty: formData.qty,
          perunitcost: formData.perunitcost,
          description: formData.description,
          postdate: formData.postdate
        }
        console.log(payloadData);
        try {
          const res = await updateBookDetails(editingBook.id, payloadData)
          console.log(res)
          if (res.status === 200) toast.success("Record Updated Successfully!");
        } catch (err) {
          console.log(err)
          toast.error("Failed to Update Record")
        }
      } else {
        // Add new book
        const newBook = {
          id: Math.max(...bookList.map(b => b.id), 0) + 1,
          ...formData,
          available: "yes",
          is_active: "yes",
          created_at: new Date().toISOString(),
          updated_at: null
        };
        setBookList([...bookList, newBook]);
        // console.log("Added new book:", newBook);
        const payloadData = {
          book_title: newBook.book_title,
          book_no: newBook.book_no,
          isbn_no: newBook.isbn_no,
          subject: newBook.subject,
          rack_no: newBook.rack_no,
          publish: newBook.publish,
          author: newBook.author,
          qty: newBook.qty,
          perunitcost: newBook.perunitcost,
          description: newBook.description,
          postdate: newBook.postdate
        }
        try {
          const res = await AddBook(payloadData);
          console.log(res)
          if (res.status === 201) toast.success("Record Added Successfully!");
        } catch (err) {
          console.log(err)
          toast.error("Failed to Add the Record")
        }
      }

      // Close form and reset
      setShowAddForm(false);
      setEditingBook(null);
      setFormData(initialFormData);
      setFormErrors({});
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBook(null);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handleDeleteBook = async (bookId) => {
      console.log(bookId);
      try {
        const res = await deleteDetails(bookId)
        if (res.status === 200) toast.success("Record deleted Successfully")
        setBookList(bookList.filter(book => book.id !== bookId));
        console.log(res);
      } catch (err) {
        console.log(err)
        toast.error("Failed to delete Record")
      }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const data = XLSX.read(text, { type: 'string' });
      const sheetName = data.SheetNames[0];
      const worksheet = data.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log('Parsed CSV Data:', json);
      setUploadedFile(json)
    };
    reader.readAsBinaryString(file);
  };


  const handleCSVExport = () => {
    // Step 1: Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(bookList);

    // Step 2: Convert worksheet to CSV
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    // Step 3: Trigger CSV download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BookList.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    if (!bookList || bookList.length === 0) return;

    const jsonText = JSON.stringify(bookList, null, 2);

    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handlePrint = () => {
    if (!bookList || bookList.length === 0) return;

    const headers = Object.keys(bookList[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';

    // Rows
    bookList.forEach(row => {
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
          <title>Book List</title>
        </head>
        <body>
          <h2>Book List</h2>
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


  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Add/Edit Book Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-60 p-4 shadow">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingBook ? "Edit Book" : "Add Book"}
              </h2>
              <div className="flex gap-2">
                {!uploadCSVFile && <button
                  onClick={() => setUploadCSVFile(!uploadCSVFile)}
                  className="btn btn-primary px-4 py-2 rounded flex items-center gap-2 text-sm">
                  <Upload size={16} />
                  Import Book
                </button>}
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {uploadCSVFile && (
              <div className="my-4 px-4">
                <div className="flex justify-between" >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <button
                    onClick={() => setUploadCSVFile(false)}
                  >
                    <X size={15} />
                  </button>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
                />
                <div className="flex justify-end my-4" >
                  <button
                    onClick={handleUploadFile}
                    className="btn btn-primary" >Save</button>
                </div>
              </div>
            )}

            {/* Form Content */}
            {!uploadCSVFile && <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="book_title"
                    value={formData.book_title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.book_title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter book title"
                  />
                  {formErrors.book_title && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.book_title}</p>
                  )}
                </div>

                {/* Book Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Number
                  </label>
                  <input
                    type="text"
                    name="book_no"
                    value={formData.book_no}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.book_no ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter book number"
                  />
                  {formErrors.book_no && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.book_no}</p>
                  )}
                </div>

                {/* ISBN Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN Number
                  </label>
                  <input
                    type="text"
                    name="isbn_no"
                    value={formData.isbn_no}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.isbn_no ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter ISBN number"
                  />
                  {formErrors.isbn_no && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.isbn_no}</p>
                  )}
                </div>

                {/* Publisher */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publish"
                    value={formData.publish}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.publish ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter publisher name"
                  />
                  {formErrors.publish && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.publish}</p>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.author ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter author name"
                  />
                  {formErrors.author && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.author}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter subject"
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                  )}
                </div>

                {/* Rack Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rack Number
                  </label>
                  <input
                    type="text"
                    name="rack_no"
                    value={formData.rack_no}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.rack_no ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter rack number"
                  />
                  {formErrors.rack_no && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.rack_no}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qty
                  </label>
                  <input
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.qty ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter quantity"
                  />
                  {formErrors.qty && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.qty}</p>
                  )}
                </div>

                {/* Book Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Price ($)
                  </label>
                  <input
                    type="number"
                    name="perunitcost"
                    value={formData.perunitcost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.perunitcost ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter price"
                  />
                  {formErrors.perunitcost && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.perunitcost}</p>
                  )}
                </div>

                {/* Post Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Date
                  </label>
                  <input
                    type="date"
                    name="postdate"
                    value={formData.postdate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter book description"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSaveBook}
                  className="btn btn-primary px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>}
          </div>
        </div>
      )}

      {/* Main Content */}
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Book List</h1>
        <button
          onClick={handleAddBook}
          className="btn btn-primary px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Book
        </button>
      </div>

      {/* Search Bar */}
      <div className="lg:flex md:flex sm:block justify-between relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <div className="flex gap-3" >
          <button>
            <Database onClick={handleCSVExport} size={18} />
          </button>
          <button>
            <Copy onClick={handleCopy} size={18} />
          </button>
          <button>
            <Download onClick={handleCSVExport} size={18} />
          </button>
          <button>
            <Printer onClick={handlePrint} size={18} />
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredBooks.length} of {bookList.length} books
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900 font-medium max-w-xs">
                    <div className="truncate" title={book.book_title}>
                      {book.book_title}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="truncate" title={book.description}>
                      {book.description || "No Description"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.book_no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.isbn_no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.publish}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.author}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.subject}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.rack_no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{book.qty}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${book.available === 'yes'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {book.available === 'yes' ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                    {formatPrice(book.perunitcost)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDate(book.postdate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No books found</div>
            <div className="text-gray-400 text-sm">
              {searchTerm ? 'Try adjusting your search terms' : 'No books available in the library'}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {filteredBooks.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
          <div>
            Total Books: {bookList.length} | Available: {bookList.filter(b => b.available === 'yes').length}
          </div>
          <div>
            Total Value: {formatPrice(bookList.reduce((sum, book) => sum + (book.perunitcost * book.qty), 0))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
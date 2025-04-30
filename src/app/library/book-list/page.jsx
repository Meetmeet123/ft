"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function BookList() {
  const [formData, setFormData] = useState({
    book_title: "",
    description: "",
    book_no: "",
    isbn_no: "",
    publish: "",
    author: "",
    subject: "",
    rack_no: "",
    qty: "",
    book_price: "",
  });

  const [books, setBooks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/book-list");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load books:", err);
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editId) {
        await axios.put(`/api/book-list?id=${editId}`, formData);
        toast.success("Book updated successfully");
      } else {
        await axios.post("/api/book-list", formData);
        toast.success("Book added successfully");
      }

      setFormData({
        book_title: "",
        description: "",
        book_no: "",
        isbn_no: "",
        publish: "",
        author: "",
        subject: "",
        rack_no: "",
        qty: "",
        book_price: "",
      });
      setEditId(null);
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.error || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      book_title: book.book_title,
      description: book.description || "",
      book_no: book.book_no,
      isbn_no: book.isbn_no,
      publish: book.publish,
      author: book.author,
      subject: book.subject,
      rack_no: book.rack_no,
      qty: book.qty,
      book_price: book.book_price,
    });
    setEditId(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`/api/book-list?id=${id}`);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    const ws = utils.json_to_sheet(filteredBooks);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Books");
    writeFile(wb, "books.xlsx");
  };

  // Export to CSV function
  const exportToCSV = () => {
    const csvContent = [
      Object.keys(filteredBooks[0]).join(","),
      ...filteredBooks.map(book => Object.values(book).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "books.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Book List", 14, 16);
    
    const tableData = filteredBooks.map(book => [
      book.book_title,
      book.book_no,
      book.isbn_no,
      book.author,
      book.publish,
      book.qty,
      book.book_price
    ]);

    doc.autoTable({
      head: [["Title", "Book No", "ISBN", "Author", "Publisher", "Qty", "Price"]],
      body: tableData,
      startY: 20,
    });

    doc.save("books.pdf");
  };

  // Print function
  const printTable = () => {
    const printWindow = window.open("", "_blank");
    const tableHtml = `
      <html>
        <head>
          <title>Book List</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <h1>Book List</h1>
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Book No</th>
                <th>ISBN No</th>
                <th>Publisher</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Rack No</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${filteredBooks.map(book => `
                <tr>
                  <td>${book.book_title}</td>
                  <td>${book.book_no}</td>
                  <td>${book.isbn_no}</td>
                  <td>${book.publish}</td>
                  <td>${book.author}</td>
                  <td>${book.subject}</td>
                  <td>${book.rack_no}</td>
                  <td>${book.qty}</td>
                  <td>${book.book_price}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <button onclick="window.print()">Print</button>
          <button onclick="window.close()">Close</button>
        </body>
      </html>
    `;
    
    printWindow.document.write(tableHtml);
    printWindow.document.close();
  };

  const filteredBooks = books.filter(book =>
    Object.values(book).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4" style={{position:"relative",right:"30px",width:"1150px"}}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowForm(!showForm)}
            
          >
            {showForm ? "Close Form" : "Add Book"}
          </button>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={exportToPDF}
        //   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          PDF
        </button>
        <button 
          onClick={exportToExcel}
        //   className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Excel
        </button>
        <button 
          onClick={exportToCSV}
        //   className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
        >
          CSV
        </button>
        <button 
          onClick={printTable}
        //   className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
        >
          Print
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">{editId ? "Edit Book" : "Add New Book"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Book Title *</label>
              <input
                type="text"
                name="book_title"
                value={formData.book_title}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Book No *</label>
              <input
                type="text"
                name="book_no"
                value={formData.book_no}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">ISBN No *</label>
              <input
                type="text"
                name="isbn_no"
                value={formData.isbn_no}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Publisher *</label>
              <input
                type="text"
                name="publish"
                value={formData.publish}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Rack No *</label>
              <input
                type="text"
                name="rack_no"
                value={formData.rack_no}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity *</label>
              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                required
                min="1"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Book Price *</label>
              <input
                type="number"
                name="book_price"
                value={formData.book_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                disabled={isSubmitting}
               
              >
                {isSubmitting
                  ? editId
                    ? "Updating..."
                    : "Saving..."
                  : editId
                  ? "Update Book"
                  : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white p-6 rounded-md shadow-md overflow-x-auto" style={{width:'100%'}}>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Book Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Book No</th>
              <th className="px-4 py-2 border">ISBN No</th>
              <th className="px-4 py-2 border">Publisher</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Rack No</th>
              <th className="px-4 py-2 border">Qty</th>
              <th className="px-4 py-2 border">Available</th>

              <th className="px-4 py-2 border">Book Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2 border">{book.book_title}</td>
                <td className="px-4 py-2 border">{book.description || "-"}</td>
                <td className="px-4 py-2 border">{book.book_no}</td>
                <td className="px-4 py-2 border">{book.isbn_no}</td>
                <td className="px-4 py-2 border">{book.publish}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.subject}</td>
                <td className="px-4 py-2 border">{book.rack_no}</td>
                <td className="px-4 py-2 border">{book.qty}</td>
                <td className="px-4 py-2 border">{book.available}</td>

                <td className="px-4 py-2 border">{book.book_price}</td>
                <td className="px-4 py-2 border space-x-2 text-center">
                  <button 
                    onClick={() => handleEdit(book)} 
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
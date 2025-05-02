'use client';

import React, { useState } from 'react';

const LibraryManagementSystem = () => {
  // Complete dummy data matching your screenshot
  const dummyMembers = [
    {
      "id": 1,
      "member_id": "7",
      "library_card_no": "001.3",
      "admission_no": "18002",
      "student_name": "Robin Peterson",
      "member_type": "Student",
      "phone": "69096565464",
      "gender": "Male",
      "session_year": "2021-22",
      "barcode": "18882",
      "image": "https://randomuser.me/api/portraits/men/1.jpg",
      "issued_books": [
        {
          "book_title": "Basic Geometric Ideas",
          "book_number": "56723",
          "issue_date": "03/01/2025",
          "due_return_date": "03/01/2025",
          "return_date": "03/01/2025"
        },
        {
          "book_title": "NURTURING NATURE",
          "book_number": "455675",
          "issue_date": "02/03/2025",
          "due_return_date": "02/28/2025",
          "return_date": "02/28/2025"
        },
        {
          "book_title": "CHAPTER 3 Portraying People",
          "book_number": "OR890784",
          "issue_date": "02/03/2025",
          "due_return_date": "02/19/2025",
          "return_date": "02/19/2025"
        },
        {
          "book_title": "Data Handling and Presentation",
          "book_number": "098079",
          "issue_date": "02/03/2025",
          "due_return_date": "02/25/2025",
          "return_date": "02/25/2025"
        },
        {
          "book_title": "Total Area Tag",
          "book_number": "546333",
          "issue_date": "01/03/2025",
          "due_return_date": "01/18/2025",
          "return_date": "01/18/2025"
        }
      ]
    },
    {
      "id": 2,
      "member_id": "8",
      "library_card_no": "001.4",
      "admission_no": "18003",
      "student_name": "Sophia Williams",
      "member_type": "Student",
      "phone": "7987654321",
      "gender": "Female",
      "session_year": "2021-22",
      "barcode": "189093",
      "image": "https://randomuser.me/api/portraits/women/2.jpg",
      "issued_books": []
    }
  ];

  const availableBooks = [
    {
      "id": 1,
      "title": "Basic Geometric Ideas",
      "author": "John Doe",
      "isbn": "9781234567890",
      "book_number": "56723",
      "available_copies": 5
    },
    {
      "id": 2,
      "title": "NURTURING NATURE",
      "author": "Jane Smith",
      "isbn": "9780987654321",
      "book_number": "455675",
      "available_copies": 3
    },
    {
      "id": 3,
      "title": "CHAPTER 3 Portraying People",
      "author": "Robert Johnson",
      "isbn": "9785432109876",
      "book_number": "OR890784",
      "available_copies": 2
    }
  ];

  // State management
  const [members, setMembers] = useState(dummyMembers);
  const [books] = useState(availableBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState('');
  const [dueDate, setDueDate] = useState('2025-04-19');
  const [bookSearchTerm, setBookSearchTerm] = useState('');

  // Filter members based on search term
  const filteredMembers = members.filter((member) =>
    member.student_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter issued books based on search term
  const filteredIssuedBooks = selectedMember?.issued_books?.filter((book) =>
    book.book_title?.toLowerCase().includes(bookSearchTerm.toLowerCase())
  );

  // Handle book issue
  const handleIssueBook = () => {
    if (!selectedBook) return;
    
    const bookToIssue = books.find(book => book.id.toString() === selectedBook);
    if (!bookToIssue) return;

    const newIssuedBook = {
      book_title: bookToIssue.title,
      book_number: bookToIssue.book_number,
      issue_date: new Date().toLocaleDateString('en-US'),
      due_return_date: new Date(dueDate).toLocaleDateString('en-US'),
      return_date: ""
    };

    const updatedMembers = members.map(member => {
      if (member.id === selectedMember.id) {
        return {
          ...member,
          issued_books: [...member.issued_books, newIssuedBook]
        };
      }
      return member;
    });

    setMembers(updatedMembers);
    setSelectedMember({
      ...selectedMember,
      issued_books: [...selectedMember.issued_books, newIssuedBook]
    });
    
    setSelectedBook('');
    alert(`Book "${bookToIssue.title}" issued successfully!`);
  };

  // Handle book return
  const handleReturnBook = (bookIndex) => {
    const updatedBooks = [...selectedMember.issued_books];
    updatedBooks[bookIndex].return_date = new Date().toLocaleDateString('en-US');

    const updatedMembers = members.map(member => {
      if (member.id === selectedMember.id) {
        return {
          ...member,
          issued_books: updatedBooks
        };
      }
      return member;
    });

    setMembers(updatedMembers);
    setSelectedMember({
      ...selectedMember,
      issued_books: updatedBooks
    });
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedMember(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ width:"110%",position:"relative",right:"40px"}}>
      {!selectedMember ? (
        /* Member List View */
        <div className="bg-white rounded shadow-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">Library Members</h2>
          <input
            type="text"
            placeholder="Search by student name"
            className="border p-2 mb-4 w-full max-w-md rounded shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Member ID</th>
                  <th className="px-4 py-2 border">Library Card No</th>
                  <th className="px-4 py-2 border">Admission No</th>
                  <th className="px-4 py-2 border">Student Name</th>
                  <th className="px-4 py-2 border">Member Type</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{member.member_id || '—'}</td>
                      <td className="px-4 py-2 border">{member.library_card_no || '—'}</td>
                      <td className="px-4 py-2 border">{member.admission_no || '—'}</td>
                      <td className="px-4 py-2 border">{member.student_name || '—'}</td>
                      <td className="px-4 py-2 border">{member.member_type || '—'}</td>
                      <td className="px-4 py-2 border">{member.phone || '—'}</td>
                      <td className="py-2 px-4 border">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => setSelectedMember(member)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Member Detail View */
        <div className="bg-white rounded shadow-lg p-6 border">
          

          {/* Main content layout */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Student profile */}
            <div className="w-full md:w-1/3">
              <div className="flex items-center mb-6">
                <img
                  src={selectedMember.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <h1 className="text-2xl font-bold">{selectedMember.student_name}</h1>
              </div>

              <div className="space-y-3 mb-6">
                <div><strong>Member ID:</strong> {selectedMember.member_id}</div>
                <div><strong>Library Card No:</strong> {selectedMember.library_card_no}</div>
                <div><strong>Admission No:</strong> {selectedMember.admission_no}</div>
                <div><strong>Gender:</strong> {selectedMember.gender}</div>
                <div><strong>Member Type:</strong> {selectedMember.member_type}</div>
                <div><strong>Mobile Number:</strong> {selectedMember.phone}</div>
                <div><strong>Session Year:</strong> {selectedMember.session_year}</div>
                <div><strong>Barcode:</strong>  <div className="mt-1">
                    <img
                      src={`https://barcode.tec-it.com/barcode.ashx?data=${selectedMember.barcode || selectedMember.admission_no}&code=Code128&dpi=96`}
                      alt="Barcode"
                      className="h-12"
                    />
                  </div></div>
                  <div><strong>QR Code:</strong>  <div className="mt-1">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedMember.admission_no || 'NA'}&size=100x100`}
                      alt="QR Code"
                      className="h-24"
                    />
                  </div></div>

              </div>
            </div>

            {/* Right side - Form and table */}
            <div className="w-full md:w-2/3">
              {/* Issue Book Form */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Issue Book</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium">Books*</label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={selectedBook}
                      onChange={(e) => setSelectedBook(e.target.value)}
                    >
                      <option value="">Select</option>
                      {books.map(book => (
                        <option key={book.id} value={book.id}>
                          {book.title} (Available: {book.available_copies})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium">Due Return Date*</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  <button 
                    // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleIssueBook}
                  >
                    Issue Book
                  </button>
                </div>
              </div>

              {/* Books Issued Table */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Books Issued</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border rounded w-full"
                    value={bookSearchTerm}
                    onChange={(e) => setBookSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border text-left">Book Title</th>
                        <th className="px-4 py-2 border text-left">Book Number</th>
                        <th className="px-4 py-2 border text-left">Issue Date</th>
                        <th className="px-4 py-2 border text-left">Due Return Date</th>
                        <th className="px-4 py-2 border text-left">Return Date</th>
                        <th className="px-4 py-2 border text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIssuedBooks?.length > 0 ? (
                        filteredIssuedBooks.map((book, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border">{book.book_title}</td>
                            <td className="px-4 py-2 border">{book.book_number}</td>
                            <td className="px-4 py-2 border">{book.issue_date}</td>
                            <td className="px-4 py-2 border">{book.due_return_date}</td>
                            <td className="px-4 py-2 border">
                              {book.return_date ? (
                                <span className=""> {book.return_date}</span>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-2 border">
                              {book.return_date ? (
                                <span className="text-green-500"></span>
                              ) : (
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => handleReturnBook(index)}
                                >
                                 <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5 text-gray-700"
>
  <path d="M3 7v6h6" />
  <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
</svg>

                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                            No books issued or found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryManagementSystem;
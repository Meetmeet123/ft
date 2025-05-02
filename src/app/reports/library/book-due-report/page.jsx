"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookDueReport() {
    const router = useRouter();
    const handleClick1 = () => {
      router.push('../library/book-issue-report'); 
    };
    
    const handleClick2 = () => {
      router.push('../library/book-due-report'); 
    };
  
    const handleClick3 = () => {
      router.push('../library/book-inventory-report'); 
    };
    
    const handleClick4 = () => {
      router.push('../library/book-issue-return-report'); 
    };

    // Dummy data
    const bookDueData = [
        {
            bookTitle: "Shapes Around us",
            bookNumber: "45332",
            issueDate: "04/01/2025",
            dueReturnDate: "04/30/2025",
            memberId: "7",
            libraryCard: "001.3",
            admissionNo: "18002",
            issueBy: "Robin Peterson (18002)",
            membersType: "Student"
        },
        {
            bookTitle: "Diversity in the Living World",
            bookNumber: "789890",
            issueDate: "04/01/2025",
            dueReturnDate: "04/30/2025",
            memberId: "10",
            libraryCard: "0101",
            admissionNo: "18004",
            issueBy: "Laura Clinton (18004)",
            membersType: "Student"
        },
        {
            bookTitle: "Melodies of Diversity",
            bookNumber: "80678",
            issueDate: "04/01/2025",
            dueReturnDate: "05/01/2025",
            memberId: "15",
            libraryCard: "102L",
            admissionNo: "18025",
            issueBy: "Jhonson wood (18025)",
            membersType: "Student"
        }
    ];

    // State for filters and search
    const [filters, setFilters] = useState({
        searchType: '',
        membersType: '',
        searchQuery: ''
    });
    const [showResults, setShowResults] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Handle search
    const handleSearch = () => {
        if (!filters.searchType || !filters.membersType) {
            alert('Please select both search type and member type');
            return;
        }
        
        let results = bookDueData;
        
        // Filter by member type
        results = results.filter(item => item.membersType === filters.membersType);
        
        // Filter by search query if provided
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            results = results.filter(item => 
                item.bookTitle.toLowerCase().includes(query) ||
                item.bookNumber.includes(filters.searchQuery) ||
                item.memberId.includes(filters.searchQuery) ||
                item.libraryCard.includes(filters.searchQuery) ||
                item.admissionNo.includes(filters.searchQuery) ||
                item.issueBy.toLowerCase().includes(query)
            );
        }
        
        setFilteredData(results);
        setShowResults(true);
    };

    const commonStyle = {
        padding: '10px',
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: '500',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Library Reports</h1>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '10px',
                    marginBottom: '30px'
                }}>
                    <button style={commonStyle} onClick={handleClick1}>Book Issue Report</button>
                    <button style={commonStyle} onClick={handleClick2}>Book Due Report</button>
                    <button style={commonStyle} onClick={handleClick3}>Book Inventory Report</button>
                    <button style={commonStyle} onClick={handleClick4}>Book Issue Return Report</button>
                </div>
            </div>
            
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Select Criteria</h1>
            
            {/* Search Criteria */}
            <div style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: '1', minWidth: '100px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Type:</label>
                    <select
                        name="searchType"
                        value={filters.searchType}
                        onChange={handleFilterChange}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white'
                        }}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="Last Week">Last Week</option>
                        <option value="This Month">This Month</option>
                        <option value="Last Month">Last Month</option>
                    </select>
                </div>
                
                <div style={{ flex: '1', minWidth: '100px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Members Type:</label>
                    <select
                        name="membersType"
                        value={filters.membersType}
                        onChange={handleFilterChange}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white'
                        }}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                </div>
                
                <button
                    onClick={handleSearch}
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        marginTop: '10px'
                    }}
                >
                    Search
                </button>
            </div>
            
            {/* Search Input */}
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Book Due Report</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Search..."
                    value={filters.searchQuery}
                    onChange={handleFilterChange}
                    style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        width: '100%',
                        maxWidth: '400px'
                    }}
                />
                {showResults && (
                    <span style={{ marginLeft: '10px', color: '#6b7280' }}>
                        {filteredData.length} records found
                    </span>
                )}
            </div>
            
            {/* Results Section */}
            {showResults ? (
                filteredData.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                            width: '100%', 
                            borderCollapse: 'collapse',
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f3f4f6' }}>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>No.</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Book Title</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Book Number</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issue Date</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Due Return Date</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Member ID</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Library Card</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Admission No</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issue By</th>
                                    <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Members Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr 
                                        key={index} 
                                        style={{ 
                                            backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}
                                    >
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{index + 1}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.bookTitle}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.bookNumber}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issueDate}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.dueReturnDate}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.memberId}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.libraryCard}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.admissionNo}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issueBy}</td>
                                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.membersType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        color: '#6b7280',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px dashed #d1d5db'
                    }}>
                        No records found matching your criteria
                    </div>
                )
            ) : (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#6b7280',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px dashed #d1d5db'
                }}>
                    Please select search criteria and click "Search" to view results
                </div>
            )}
        </div>
    );
}
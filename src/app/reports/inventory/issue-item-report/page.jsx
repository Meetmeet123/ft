"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IssueItemReport() {
    const router = useRouter();

    const handleClick1 = () => {
        router.push('../inventory/stock-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick2 = () => {
        router.push('../inventory/add-item-report'); 
    
        // yahan apne destination ka route likho
      };
    
      const handleClick3 = () => {
        router.push('../inventory/issue-item-report'); 
        // yahan apne destination ka route likho
      };
  
  // Dummy data matching your screenshot
  const issueItemData = [
    {
      item: "Lab Equipment",
      note: "",
      itemCategory: "Chemistry Lab Apparatus",
      issueReturn: "01/15/2025-01/20/2025",
      issueTo: "Shivam Verma(9002)",
      issuedBy: "William Abbot (9003)",
      quantity: 2
    },
    {
      item: "Notebooks",
      note: "",
      itemCategory: "Books Stationery",
      issueReturn: "02/01/2025-02/03/2025",
      issueTo: "Shivam Verma(9002)",
      issuedBy: "William Abbot (9003)",
      quantity: 5
    },
    {
      item: "Projectors",
      note: "",
      itemCategory: "Chemistry Lab Apparatus",
      issueReturn: "02/20/2025-02/25/2025",
      issueTo: "Shivam Verma(9002)",
      issuedBy: "Jason Sharit on(90006)",
      quantity: 2
    },
    {
      item: "Class Board",
      note: "",
      itemCategory: "Books Stationery",
      issueReturn: "03/01/2025-03/01/2025",
      issueTo: "Shivam Verma(9002)",
      issuedBy: "Jason Sharit on(90006)",
      quantity: 5
    },
    {
      item: "Cricket Bat",
      note: "",
      itemCategory: "Sports",
      issueReturn: "04/01/2025-04/03/2025",
      issueTo: "Shivam Verma(9002)",
      issuedBy: "Brandon Heart (9006)",
      quantity: 2
    }
  ];

  // State for filters and search
  const [filters, setFilters] = useState({
    searchType: '',
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
    if (!filters.searchType) {
      alert('Please select a search type first');
      return;
    }
    
    let results = issueItemData;
    
    // Filter by search query if provided
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(item => 
        item.item.toLowerCase().includes(query) ||
        item.itemCategory.toLowerCase().includes(query) ||
        item.issueTo.toLowerCase().includes(query) ||
        item.issuedBy.toLowerCase().includes(query) ||
        item.quantity.toString().includes(filters.searchQuery) ||
        item.issueReturn.includes(filters.searchQuery)
      );
    }
    
    setFilteredData(results);
    setShowResults(true);
  };
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
       <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Inventory Report</h1>
        
       <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <button style={commonStyle()} onClick={handleClick1}>Stock Report</button>
          <button style={commonStyle()} onClick={handleClick2}>Add Item Report</button>
          <button style={commonStyle()} onClick={handleClick3}>Issue Item Report</button>
        
          
        </div>
      </div>
      
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
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Issue Item Report</h1>
      
      {/* Search Input */}
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
      
      {/* Results Table - Only shown after search */}
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
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Item</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Note</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Item Category</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issue - Return</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issue To</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issued By</th>
                  <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Quantity</th>
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
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.item}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.note}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.itemCategory}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issueReturn}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issueTo}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issuedBy}</td>
                    <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.quantity}</td>
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
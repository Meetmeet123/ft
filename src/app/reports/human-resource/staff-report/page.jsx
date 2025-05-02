"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffReport() {
    const router = useRouter();
    const handleClick1 = () => {
      router.push('../human-resource/staff-report'); 
    };
    
    const handleClick2 = () => {
      router.push('../human-resource/payroll-report'); 
    };

  // Dummy data for dropdowns
  const searchTypeOptions = ["Date Of Joining", "Date Of Birth", "Last Promotion Date"];
  const statusOptions = ["Active", "Disabled"];
  const roleOptions = ["Super Admin", "Admin", "Faculty", "Accountant", "Vice President", "Technical Head"];
  const designationOptions = ["Technical Head", "HOD", "Professor", "Assistant Professor", "Accountant", "VP Academics"];

  // Dummy staff data with all additional fields
  const staffData = [
    {
      staffId: 9000,
      role: "Super Admin",
      designation: "Technical Head",
      department: "Admin",
      name: "Joe Black",
      fatherName: "Will Black",
      motherName: "Mini Black",
      email: "superadmin@gmail.com",
      gender: "Male",
      dateOfBirth: "01/01/1988",
      dateOfJoining: "03/11/2010",
      phone: "6545645645",
      emergencyContact: "54654644",
      status: "Active",
      maritalStatus: "Married",
      currentAddress: "9837 Main Street",
      permanentAddress: "9837 Main Street",
      qualification: "MS",
      workExperience: "15 Yrs",
      note: "Excellent performance",
      epfNo: "EPF9000",
      basicSalary: "45,000.00",
      contractType: "Permanent",
      workShift: "Morning",
      leaveLocation: "Ground Floor",
      leaves: "Medical Leave: 20, Casual Leave: 25, Maternity Leave: 25",
      accountTitle: "Joe Black",
      bankAccountNumber: "123456789012",
      bankName: "State Bank",
      ifscCode: "SBIN0001234",
      bankBranch: "Main Branch",
      socialMedia: "linkedin.com/in/joeblack",
      panNumber: "ALWPG5809L"
    },
    {
      staffId: 9001,
      role: "Admin",
      designation: "HOD",
      department: "Computer Science",
      name: "Sarah Johnson",
      fatherName: "Michael Johnson",
      motherName: "Emily Johnson",
      email: "sarah.j@example.com",
      gender: "Female",
      dateOfBirth: "05/15/1985",
      dateOfJoining: "06/20/2015",
      phone: "9876543210",
      emergencyContact: "8765432109",
      status: "Active",
      maritalStatus: "Single",
      currentAddress: "456 Oak Avenue",
      permanentAddress: "789 Pine Road",
      qualification: "PhD",
      workExperience: "12 Yrs",
      note: "Team lead",
      epfNo: "EPF9001",
      basicSalary: "21,000.00",
      contractType: "Permanent",
      workShift: "Morning",
      leaveLocation: "1st Floor",
      leaves: "Medical Leave: 12, Casual Leave: 20, Maternity Leave: 10",
      accountTitle: "Sarah Johnson",
      bankAccountNumber: "987654321098",
      bankName: "City Bank",
      ifscCode: "CITI0005678",
      bankBranch: "Downtown Branch",
      socialMedia: "linkedin.com/in/sarahj",
      panNumber: "RLWEG5809L"
    },
    // Add more staff members as needed
  ];

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    searchType: '',
    status: '',
    role: '',
    designation: ''
  });

  // State for filtered data
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    setHasSearched(true);
    
    // Filter staff based on selected criteria
    let filtered = [...staffData];
    
    if (searchCriteria.status) {
      filtered = filtered.filter(staff => staff.status === searchCriteria.status);
    }
    
    if (searchCriteria.role) {
      filtered = filtered.filter(staff => staff.role === searchCriteria.role);
    }
    
    if (searchCriteria.designation) {
      filtered = filtered.filter(staff => staff.designation === searchCriteria.designation);
    }
    
    // Sort by search type if selected
    if (searchCriteria.searchType) {
      filtered.sort((a, b) => {
        const dateA = new Date(searchCriteria.searchType === 'Date Of Joining' ? a.dateOfJoining : a.dateOfBirth);
        const dateB = new Date(searchCriteria.searchType === 'Date Of Joining' ? b.dateOfJoining : b.dateOfBirth);
        return dateA - dateB;
      });
    }
    
    setFilteredStaff(filtered);
  };

  const commonStyle = (report) => ({
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
  });

  return (
    <div className="container mx-auto p-4">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Human Resource Reports</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <button style={commonStyle()} onClick={handleClick1}>Staff Report</button>
          <button style={commonStyle()} onClick={handleClick2}>Payroll Report</button>
        </div>
      </div>
      
      {/* Search Criteria - All in one row */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[155px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Type By</label>
            <select
              name="searchType"
              value={searchCriteria.searchType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {searchTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={searchCriteria.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={searchCriteria.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <select
              name="designation"
              value={searchCriteria.designation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {designationOptions.map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Staff Report</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Of Joining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marital Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permanent Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EPF No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leaves</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Media</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN Number</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff.staffId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.staffId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.motherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.dateOfBirth}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.dateOfJoining}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.emergencyContact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.maritalStatus}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.currentAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.permanentAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.qualification}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.workExperience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.note}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.epfNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.basicSalary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.contractType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.workShift}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.leaveLocation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.leaves}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.accountTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.bankAccountNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.bankName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.ifscCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.bankBranch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.socialMedia}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.panNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="32" className="px-6 py-4 text-center text-sm text-gray-500">
                      No staff found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaTrash } from 'react-icons/fa';

export default function IncidentManagement() {
  // Dummy data
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  const studentsData = [
    { id: 1, name: "Ashwani Kumar", admissionNo: "120020", class: "Class 1", section: "A", gender: "Male", phone: "980678463", totalPoints: 40 },
    { id: 2, name: "Nathan Smith", admissionNo: "120039", class: "Class 1", section: "A", gender: "Male", phone: "8906785675", totalPoints: 50 },
    { id: 3, name: "Nehal Wadhera", admissionNo: "125005", class: "Class 1", section: "A", gender: "Male", phone: "890786784", totalPoints: 40 },
    { id: 4, name: "Xavier Bartlett", admissionNo: "520039", class: "Class 1", section: "A", gender: "Male", phone: "0890789657", totalPoints: 0 }
  ];

  const incidentTypes = [
    { id: 1, title: "Cheating and plagiarism", description: "Cheating and plagiarism are important to report. They undermine the credibility of academics at any institution.", points: -10 },
    { id: 2, title: "Threats and violence", description: "If the university, or school, is aware of these cases, they can monitor the spaces where threats and violence occur and improve security.", points: -20 },
    { id: 3, title: "Harassment and bullying", description: "If students report this type of behaviour, institutions will be able to monitor the individuals involved.", points: -10 },
    { id: 4, title: "Student Good Behaviour", description: "Smile & have a good attitude and good behaviour.", points: 20 },
    { id: 5, title: "Respect others/property", description: "Respect others/property.", points: 10 },
    { id: 6, title: "Thefts", description: "It's important to report cases of theft on campus so that the university or school can increase security where needed.", points: -10 }
  ];

  const assignedIncidents = [
    { id: 1, title: "Cheating and plagiarism", points: -10, date: "05/12/2025", description: "Cheating and plagiarism are important to report. They undermine the credibility of academics at any institution.", assignBy: "Joe Black (9000)", studentId: 1 },
    { id: 2, title: "Student Good Behaviour", points: 20, date: "05/01/2025", description: "Smile & have a good attitude and good behaviour.", assignBy: "Jason Sharlton (90006)", studentId: 2 },
    { id: 3, title: "Harassment and bullying", points: -10, date: "05/01/2025", description: "If students report this type of behaviour, institutions will be able to monitor the individuals involved.", assignBy: "Jason Sharlton (90006)", studentId: 3 },
    { id: 4, title: "Respect others/property", points: 10, date: "04/01/2025", description: "Respect others/property.", assignBy: "Jason Sharlton (90006)", studentId: 4 },
    { id: 5, title: "Student Good Behaviour", points: 20, date: "04/01/2025", description: "Smile & have a good attitude and good behaviour.", assignBy: "Jason Sharlton (90006)", studentId: 1 }
  ];

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [showAssignedIncidents, setShowAssignedIncidents] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentAssignedIncidents, setCurrentAssignedIncidents] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [students, setStudents] = useState([]); // Start with empty array
  const [assignedIncidentsList, setAssignedIncidentsList] = useState(assignedIncidents);
  const [hasSearched, setHasSearched] = useState(false); // Track if search has been performed

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.includes(searchTerm)
  );

  // Handle search
  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      // Filter students by class and section
      const filtered = studentsData.filter(
        student => student.class === selectedClass && student.section === selectedSection
      );
      setStudents(filtered);
      setHasSearched(true);
    }
  };

  // Handle assign incident
  const handleAssignIncident = (student) => {
    setCurrentStudent(student);
    setShowIncidentForm(true);
  };

  // Handle view assigned incidents
  const handleViewAssignedIncidents = (student) => {
    const incidents = assignedIncidentsList.filter(incident => incident.studentId === student.id);
    setCurrentAssignedIncidents(incidents);
    setShowAssignedIncidents(true);
  };

  // Handle incident selection
  const handleIncidentSelect = (incidentId) => {
    if (selectedIncidents.includes(incidentId)) {
      setSelectedIncidents(selectedIncidents.filter(id => id !== incidentId));
    } else {
      setSelectedIncidents([...selectedIncidents, incidentId]);
    }
  };

  // Handle save incidents
  const handleSaveIncidents = () => {
    if (selectedIncidents.length === 0 || !currentStudent) return;

    const newIncidents = selectedIncidents.map(incidentId => {
      const incident = incidentTypes.find(i => i.id === incidentId);
      return {
        id: Math.max(...assignedIncidentsList.map(i => i.id)) + 1,
        title: incident.title,
        points: incident.points,
        date: new Date().toLocaleDateString('en-GB'),
        description: incident.description,
        assignBy: "Self",
        studentId: currentStudent.id
      };
    });

    // Update assigned incidents
    setAssignedIncidentsList([...assignedIncidentsList, ...newIncidents]);

    // Update student points
    const totalPointsChange = newIncidents.reduce((sum, incident) => sum + incident.points, 0);
    setStudents(students.map(student => 
      student.id === currentStudent.id 
        ? { ...student, totalPoints: student.totalPoints + totalPointsChange } 
        : student
    ));

    // Reset form
    setSelectedIncidents([]);
    setShowIncidentForm(false);
  };

  // Handle delete incident
  const handleDeleteIncident = (incidentId) => {
    if (confirm("Are you sure you want to delete this incident?")) {
      const incident = assignedIncidentsList.find(i => i.id === incidentId);
      
      // Update student points
      setStudents(students.map(student => 
        student.id === incident.studentId 
          ? { ...student, totalPoints: student.totalPoints - incident.points } 
          : student
      ));

      // Remove incident
      setAssignedIncidentsList(assignedIncidentsList.filter(i => i.id !== incidentId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Criteria</h1>
        
        {/* Class and Section Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!selectedClass || !selectedSection}
          className="mb-6 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Search
        </button>

        {/* Only show table if search has been performed and students exist */}
        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Incident List</h2>
            
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {students.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.admissionNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}({student.section})</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gender}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.totalPoints}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAssignIncident(student)}
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Assign Incident"
                              >
                                <FaPlus />
                              </button>
                              <button
                                onClick={() => handleViewAssignedIncidents(student)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="View Assigned Incidents"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Records: 1 to {filteredStudents.length} of {filteredStudents.length}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No students found for the selected class and section
              </div>
            )}
          </div>
        )}

        {/* Assign Incident Modal */}
        {showIncidentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Incident</h2>
              <p className="text-sm text-gray-600 mb-6">
                Improper behaviour could be observed in a staff member or another student. If the behaviour is threatening, concerning or inappropriate, the university or school will need to monitor the individual to ensure that the behaviour is not repetitive.
              </p>
              
              <div className="space-y-6">
                {incidentTypes.map(incident => (
                  <div key={incident.id} className="border-b pb-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id={`incident-${incident.id}`}
                        checked={selectedIncidents.includes(incident.id)}
                        onChange={() => handleIncidentSelect(incident.id)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{incident.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                        <p className={`text-sm mt-2 ${incident.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Points: {incident.points}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowIncidentForm(false);
                    setSelectedIncidents([]);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveIncidents}
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Assigned Incidents Modal */}
        {showAssignedIncidents && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">View Assigned Incidents</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentAssignedIncidents.map(incident => (
                      <tr key={incident.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.title}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${incident.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {incident.points}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{incident.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.assignBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleDeleteIncident(incident.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAssignedIncidents(false)}
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
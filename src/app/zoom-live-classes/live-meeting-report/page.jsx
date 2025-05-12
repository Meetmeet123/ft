"use client";
import { useState } from 'react';
import { FaSearch, FaUserFriends ,FaBars} from 'react-icons/fa';

const MeetingReport = () => {
  // Dummy data for meetings
  const meetingsData = [
    {
      id: 1,
      title: "Project status updates",
      description: "Project status updates",
      dateTime: "05/05/2025 12:30:00",
      createdBy: "Self",
      api:"Global",

      totalJoin: 2,
      joinList: [
        { name: "Jason Sharlton", role: "Teacher", id: "90006", lastJoin: "05/01/2025 07:34:21" },
        { name: "William Abbot", role: "Admin", id: "9003", lastJoin: "05/01/2025 07:34:47" }
      ]
    },
    {
      id: 2,
      title: "New Academic Session Discussion",
      description: "New Academic Session Discussion",
      dateTime: "04/01/2025 10:00:00",
      createdBy: "Self",
      api:"Global",

      totalJoin: 3,
      joinList: [
        { name: "John Doe", role: "Teacher", id: "90007", lastJoin: "04/01/2025 09:55:12" },
        { name: "Jane Smith", role: "Admin", id: "9004", lastJoin: "04/01/2025 09:56:30" },
        { name: "Robert Johnson", role: "Staff", id: "9008", lastJoin: "04/01/2025 09:58:45" }
      ]
    },
    // Add more meeting data as needed
  ];

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleActionClick = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const closeJoinList = () => {
    setSelectedMeeting(null);
  };

  const filteredMeetings = meetingsData.filter(meeting => 
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Meeting Report</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Meeting Title</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-left">Date Time</th>
              <th className="border p-2 text-left">Created By</th>
              <th className="border p-2 text-left">Api Used </th>

              <th className="border p-2 text-left">Total Join</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50">
                <td className="border p-2">{meeting.title}</td>
                <td className="border p-2">{meeting.description}</td>
                <td className="border p-2">{meeting.dateTime}</td>
                <td className="border p-2">{meeting.createdBy}</td>
                <td className="border p-2">{meeting.api}</td>


                <td className="border p-2">{meeting.totalJoin}</td>
                <td className="border p-2">
                  <button 
                    onClick={() => handleActionClick(meeting)}
                    className="text-2xl"
                  >
                                      <FaBars  />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Bachelor's Vol.19 of 13</p>
      </div>

      {/* Join List Modal */}
      {selectedMeeting && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-lg w-3/4 max-w-3xl">
      <h2 className="text-lg font-bold mb-4">Join List</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="mb-2 flex justify-between items-center">
        {/* <span className="text-sm font-medium">Staff ▲</span> */}
        <span className="text-sm text-gray-500">
          Records: 1 to {selectedMeeting.joinList.length} of {selectedMeeting.joinList.length}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Staff ▲</th>
               
              <th className="border p-2 text-left">Last Join</th>
            </tr>
          </thead>
          <tbody>
            {selectedMeeting.joinList.map((person, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{person.name}</td>
                 
                <td className="border p-2">{person.lastJoin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={closeJoinList}
          className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default MeetingReport;
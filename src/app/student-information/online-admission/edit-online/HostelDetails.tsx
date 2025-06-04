import React from "react";

const HostelDetails: React.FC = () => {
  return (
    <div>
      {/* Hostel Section */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Hostel Details</h3>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          <div className="w-full">
            <label htmlFor="hostel" className="block text-sm font-medium text-gray-700 mb-1">
              Hostel
            </label>
            <select id="hostel" name="hostel" className="w-full" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option value="boys-102">Boys Hostel 102</option>
              <option value="girls-103">Girls Hostel 103</option>
              <option value="girls-104">Girls Hostel 104</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
              Room No.
            </label>
            <select id="room" name="room" className="w-full" defaultValue="">
              <option value="" disabled>
                Room no.
              </option>
              {/* Options to be populated dynamically if needed */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;

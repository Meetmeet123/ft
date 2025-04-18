function HostelDetails() {
    return (
      <div>
        {/* Hostel Section */}
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Hostel Details</h3>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hostel
              </label>
              <select className="w-full " >
                <option>Select</option>
                <option>Boys Hostel 102</option>
                <option>Girls Hostel 103</option>
                <option>Girls Hostel 104</option>
              </select>
            </div>
  
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room No.
              </label>
              <select className="w-full" >
                <option>Room no.</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HostelDetails;
  
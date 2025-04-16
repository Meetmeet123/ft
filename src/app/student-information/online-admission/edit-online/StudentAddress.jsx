function StudentAddress() {
    return (
      <div className="w-full mx-auto mt-4 p-6 bg-white rounded shadow-md">
        <form>
          {/* Student Address Details */}
          <div className="border rounded mb-6">
            <div className="bg-gray-100 p-3 border-b">
              <h2 className="text-lg font-semibold">Student Address Details</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">If Guardian Address Is Current Address</span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Current Address</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">If Permanent Address Is Current Address</span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Permanent Address</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Miscellaneous Details */}
          <div className="border rounded mb-6">
            <div className="bg-gray-100 p-3 border-b">
              <h2 className="text-lg font-semibold">Miscellaneous Details</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">IFSC Code</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">National Identification Number</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Local Identification Number</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">RTE</label>
                  <div className="flex space-x-4 mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="rte"
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="rte"
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
  
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Previous School Details</label>
                  <textarea
                    className="w-full border rounded p-2 h-24"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Note</label>
                  <textarea
                    className="w-full border rounded p-2 h-24"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default StudentAddress;
  
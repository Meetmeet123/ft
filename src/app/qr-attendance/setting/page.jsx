"use client";
import { useState } from "react";

function Setting() {
  const [autoAttendance, setAutoAttendance] = useState("disabled");
  const [selectedCamera, setSelectedCamera] = useState("primary");
  const [save, setSave] = useState(false);

  const handleSave = () => {
    setSave(true);
    // You might want to send this data to an API here
    setTimeout(() => setSave(false), 3000); // Reset after 3 sec
  };

  return (
    <div className="w-full">
      <div className="w-full h-10 mt-5 flex items-center py-7 px-5 bg-blue-100">
        <h3 className="font-bold text-xl text-gray-800">Setting</h3>
      </div>

      {save && (
        <div className="w-full h-10 mt-5 flex items-center py-7 border-green-500 rounded px-5 bg-green-100">
          <h3 className="text-green-600 text-xl">Record Updated Successfully</h3>
        </div>
      )}

      <div className="flex justify-center w-full" >
      <div className="p-5 space-y-6 w-1/2 ">
        <div className="lg:flex justify-between lg:w-3/4 sm:block" >
          <label className="block font-medium mb-2">
            Auto Attendance <span className="text-red-600">*</span>
          </label>
          <div className="space-x-4 ">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="autoAttendance"
                value="disabled"
                checked={autoAttendance === "disabled"}
                onChange={() => setAutoAttendance("disabled")}
              />
              Disable
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="autoAttendance"
                value="enabled"
                checked={autoAttendance === "enabled"}
                onChange={() => setAutoAttendance("enabled")}
              />
              Enable
            </label>
          </div>
        </div>

        <div className="lg:flex justify-between lg:w-full sm:block" >
          <label className="block font-medium mb-2">
            Select Camera <span className="text-red-600">*</span>
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="camera"
                value="primary"
                checked={selectedCamera === "primary"}
                onChange={() => setSelectedCamera("primary")}
              />
              Primary (Back)
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="camera"
                value="secondary"
                checked={selectedCamera === "secondary"}
                onChange={() => setSelectedCamera("secondary")}
              />
              Secondary (Front)
            </label>
          </div>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Setting;

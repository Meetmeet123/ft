import { X } from "lucide-react";

function EditExam({ onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-start overflow-y-auto pt-20 px-4 z-50">
      <div className="w-full max-w-5xl bg-blue-50 rounded-xl shadow-lg p-6">
        {/* Close button */}
        <div className="flex justify-end cursor-pointer">
          <X onClick={onClose} />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Edit Exam</h3>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4 mb-6">
          <label className="flex items-center space-x-2 gap-3">
            <input type="checkbox" className="accent-blue-600" />
            <span className="text-gray-700">Publish</span>
          </label>
          <label className="flex items-center space-x-2 gap-3">
            <input type="checkbox" className="accent-blue-600" />
            <span className="text-gray-700">Publish Result</span>
          </label>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" />
        </div>

        {/* Input grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Term</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              <option>Term 1</option>
              <option>Term 2</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Class</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Section</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Assessment Type</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              <option>Periodic Assessment</option>
              <option>Summative Assessment</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Exam Grade</label>
            <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              <option>Exam Grade</option>
              <option>Exam Grade 1</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="my-4 flex justify-end">
          <button
            className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditExam;

import React, { useState, DragEvent, ChangeEvent, FormEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, UploadIcon } from 'lucide-react';

interface StudentImportProps {
  handleImportStudent: (value: boolean) => void;
}

const StudentImport: React.FC<StudentImportProps> = (props) => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your file upload and validation logic here
    console.log({
      class: selectedClass,
      section: selectedSection,
      file: selectedFile,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">CSV Import Guidelines</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>1. Your CSV data should be in the format below. The first line of your CSV file should be the column headers as in the table example. Also make sure that your file is UTF-8 to avoid unnecessary encoding problems.</p>
          <p>2. If the column you are trying to import is date make sure that is formatted in format Y-m-d (2018-06-06).</p>
          <p>3. Duplicate Admission Number (unique) rows will not be imported.</p>
          <p>4. For student Gender use Male, Female value.</p>
          <p>5. For student Blood Group use O+, A+, B+, AB+, O-, A-, B-, AB- value.</p>
          <p>6. For RTE use Yes, No value.</p>
          <p>7. For If Guardian Is user father,mother,other value.</p>
          <p>8. Category name comes from other table so for category, enter Category Id (Category Id can be found on category page).</p>
          <p>9. Student house comes from other table so for student house, enter Student House Id (Student House Id can be found on student house page).</p>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <div className="text-xs text-gray-600 mb-2">
          admission_no roll_no firstname middlename lastname gender dob category_id religion cast mobileno email admission_date blood_group school_house_id height weight measurement_date father_name father_phone father_occupation mother_name mother_phone mother_occupation guardian_is guardian_name guardian_relation guardian_email guardian_phone guardian_occupation guardian_address current_address permanent_address bank_account_no bank_name ifsc_code adhar_no samagra_id rte previous_school note
        </div>
        
        <div className="relative">
          <table className="min-w-full border border-gray-200 text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-2 py-1 text-red-500">*<br/>Admission<br/>No</th>
                <th className="border px-2 py-1">Roll<br/>No.</th>
                <th className="border px-2 py-1">First<br/>Name</th>
                <th className="border px-2 py-1">Middle<br/>Name</th>
                <th className="border px-2 py-1">Last<br/>Name</th>
                <th className="border px-2 py-1 text-red-500">*<br/>Gender</th>
                <th className="border px-2 py-1 text-red-500">*<br/>Date of<br/>Birth</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Religion</th>
                <th className="border px-2 py-1">Cast</th>
                <th className="border px-2 py-1">Mobile<br/>No.</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Admission<br/>Date</th>
                <th className="border px-2 py-1">Blood<br/>Group</th>
                <th className="border px-2 py-1">House</th>
                <th className="border px-2 py-1">Height</th>
                <th className="border px-2 py-1">Weight</th>
                <th className="border px-2 py-1">Measurement<br/>Date</th>
                <th className="border px-2 py-1">Father<br/>Name</th>
                <th className="border px-2 py-1">Father<br/>Phone</th>
                <th className="border px-2 py-1">Father<br/>Occupation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
                <td className="border px-2 py-1">Sample<br/>Data</td>
              </tr>
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-2">
            <button className="flex items-center text-gray-600 text-sm" type="button">
              <ChevronLeftIcon size={16} />
            </button>
            <div className="h-2 bg-gray-300 rounded-full w-full mx-4"></div>
            <button className="flex items-center text-gray-600 text-sm" type="button">
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>
        </div>
          
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select CSV File <span className="text-red-500">*</span>
          </label>
          <div 
            className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center"
            >
              <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : "Drag and drop a file here or click"}
              </span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => props.handleImportStudent(true)}
            className="btn btn-primary bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Import Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentImport;
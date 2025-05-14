
"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Plus, Trash2 } from "lucide-react";
const tabs = ['Work Experience', 'Education/Qualification', 'Technical Skills', 'Reference', 'Other Details'];

export default function StudentDetailsPage() {
    const { admissionNo } = useParams();
    const [activeTab, setActiveTab] = useState('Work Experience');
    const [student, setStudent] = useState(null);
    const [otherDetails, setOtherDetails] = useState({ designation: '', about: '' });

    const [experienceList, setExperienceList] = useState([
        { institute: "", designation: "", year: "", location: "", details: "" },
    ]);

    const handleAddRow = () => {
        setExperienceList([
            ...experienceList,
            { institute: "", designation: "", year: "", location: "", details: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedList = [...experienceList];
        updatedList.splice(index, 1);
        setExperienceList(updatedList);
    };

    const handleInputChange = (index, field, value) => {
        const updatedList = [...experienceList];
        updatedList[index][field] = value;
        setExperienceList(updatedList);
    };


    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
        if (storedStudent && storedStudent.admissionNo === admissionNo) {
            setStudent(storedStudent);
        }
    }, [admissionNo]);

    if (!student) {
        return <div className="p-4">Loading student details...</div>;
    }

    return (
        <div className="flex gap-2 pt-2">
            {/* LEFT PANEL - Student Info */}
            <div className="w-1/3 bg-white shadow rounded-md p-2 border text-sm">
                <div className="flex items-center gap-2 border-b pb-2">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-2xl">👤</div>
                    <div>
                        <h2 className="text-base font-bold">{student.studentName} - {student.admissionNo}</h2>
                        <p>Admission No <span className="text-blue-600 cursor-pointer">{student.admissionNo}</span></p>
                        <p className="text-gray-600 text-sm ">Roll Number <span className="text-blue-600 cursor-pointer">{student.rollNo}</span></p>
                    </div>
                </div>

                {/* Student info rows */}
                <div className="divide-y text-sm">
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Class</strong> <span className="text-blue-600">{student.class}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Section</strong> <span className="text-blue-600">{student.section}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Gender</strong> <span className="text-blue-600">{student.gender}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Date of Birth</strong> <span className="text-blue-600">{student.dateOfBirth}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Category</strong> <span className="text-blue-600">{student.category}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Mobile Number</strong> <span className="text-blue-600">{student.mobileNumber}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Email</strong> <span className="text-blue-600">{student.email}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Blood Group</strong> <span className="text-blue-600">{student.bloodGroup}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Height</strong> <span className="text-blue-600">{student.height}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Weight</strong> <span className="text-blue-600">{student.weight}</span></div>

                    {/* Guardian and parent info */}
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Father Name</strong> <span className="text-blue-600">{student.fatherName}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Father Phone</strong> <span className="text-blue-600">{student.fatherPhone}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Father Occupation</strong> <span className="text-blue-600">{student.fatherOccupation}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Mother Name</strong> <span className="text-blue-600">{student.motherName}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Mother Phone</strong> <span className="text-blue-600">{student.motherPhone}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Mother Occupation</strong> <span className="text-blue-600">{student.motherOccupation}</span></div>

                    {/* Guardian Details */}
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Name</strong> <span className="text-blue-600">{student.guardianName}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Relation</strong> <span className="text-blue-600">{student.guardianRelation}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Email</strong> <span className="text-blue-600">{student.guardianEmail}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Phone</strong> <span className="text-blue-600">{student.guardianPhone}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Occupation</strong> <span className="text-blue-600">{student.guardianOccupation}</span></div>

                    {/* Addresses */}
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Guardian Address</strong> <span className="text-blue-600">{student.guardianAddress}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Current Address</strong> <span className="text-blue-600">{student.currentAddress}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Permanent Address</strong> <span className="text-blue-600">{student.permanentAddress}</span></div>

                    {/* ID Numbers */}
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>National ID</strong> <span className="text-blue-600">{student.nationalIdNumber}</span></div>
                    <div className="py-2 px-2 hover:bg-gray-100 flex justify-between border-b"><strong>Local ID</strong> <span className="text-blue-600">{student.localIdNumber}</span></div>
                </div>
            </div>



            {/* RIGHT PANEL - Tabs */}
            <div className="w-2/3 bg-white rounded-md shadow border p-4 ">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Fill Resume Details</h2>

                {/* Tabs */}
                <div className="flex border-b mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 text-sm border-b-2 transition-all duration-200 ${activeTab === tab
                                ? 'border-orange-500 text-orange-600 font-medium'
                                : 'border-transparent text-gray-600 hover:text-orange-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {activeTab === 'Work Experience' && (
                    <div className="border rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between border-b pb-2 bg-gray-100 px-4 py-2">
                            <h2 className="font-semibold">Work Experience</h2>
                            <button
                                onClick={handleAddRow}
                                className="bg-gray-100 border px-2 py-1 rounded hover:bg-gray-200"
                                title="Add row"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Table Headers */}
                        <div className="p-4">
                            <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] gap-2 text-sm font-medium">
                                <div>Institute</div>
                                <div>Designation</div>
                                <div>Year</div>
                                <div>Location</div>
                                <div>Details</div>
                                <div className='invisible'>Details</div>
                                <div>{/* Empty cell to align with Remove button */}</div>
                            </div>


                            {experienceList.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] gap-2 mb-3 items-center"
                                >
                                    <input
                                        value={item.institute}
                                        onChange={(e) => handleInputChange(index, 'institute', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.designation}
                                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.year}
                                        onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.location}
                                        onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.details}
                                        onChange={(e) => handleInputChange(index, 'details', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <button
                                        onClick={() => handleRemoveRow(index)}
                                        className="!bg-red-500 hover:!bg-red-400 text-white px-2 py-1 rounded text-sm w-auto"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}

                            <div className="flex justify-end items-end border-b pb-2">
                                <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Education/Qualification' && (
                    <div className="border rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between border-b pb-2 bg-gray-100 px-4 py-2">
                            <h2 className="font-semibold">Education/Qualification</h2>
                            <button
                                onClick={handleAddRow}
                                className="bg-gray-100 border px-2 py-1 rounded hover:bg-gray-200"
                                title="Add row"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Table Headers */}
                        <div className="p-4">
                            <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-2 text-sm font-medium">
                                <div>Course</div>
                                <div>University</div>
                                <div>Year</div>
                                <div>Details</div>
                                <div className="invisible">Action</div>
                            </div>

                            {experienceList.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-2 mb-3 items-center"
                                >
                                    <input
                                        value={item.institute}
                                        onChange={(e) => handleInputChange(index, 'institute', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.designation}
                                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.year}
                                        onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.location}
                                        onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <button
                                        onClick={() => handleRemoveRow(index)}
                                        className="!bg-red-500 hover:!bg-red-400 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-end items-end border-b pb-2">
                                <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'Technical Skills' && (
                    <div className="border rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between border-b pb-2 bg-gray-100 px-4 py-2">
                            <h2 className="font-semibold">Technical Skills</h2>
                            <button
                                onClick={handleAddRow}
                                className="bg-gray-100 border px-2 py-1 rounded hover:bg-gray-200"
                                title="Add row"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Table Headers */}
                        <div className="p-4">
                            <div className="grid grid-cols-[repeat(2,minmax(0,1fr))_auto] gap-2 text-sm font-medium">
                                <div>Skill Category</div>
                                <div>	Details</div>
                                <div className="invisible">Action</div>
                            </div>

                            {experienceList.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[repeat(2,minmax(0,1fr))_auto] gap-2 mb-3 items-center"
                                >
                                    <input
                                        value={item.institute}
                                        onChange={(e) => handleInputChange(index, 'institute', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.designation}
                                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />



                                    <button
                                        onClick={() => handleRemoveRow(index)}
                                        className="!bg-red-500 hover:!bg-red-400 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="flex justify-end items-end border-b pb-2">
                                <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'Reference' && (
                    <div className="border rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between border-b pb-2 bg-gray-100 px-4 py-2">
                            <h2 className="font-semibold">Reference</h2>
                            <button
                                onClick={handleAddRow}
                                className="bg-gray-100 border px-2 py-1 rounded hover:bg-gray-200"
                                title="Add row"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Table Headers */}
                        <div className="p-4">
                            <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] gap-2 text-sm font-medium">
                                <div>Name</div>
                                <div>Relation</div>
                                <div>Age</div>
                                <div>Profession</div>
                                <div>Contact</div>
                                <div className='invisible'>Details</div>
                                <div>{/* Empty cell to align with Remove button */}</div>
                            </div>


                            {experienceList.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] gap-2 mb-3 items-center"
                                >
                                    <input
                                        value={item.institute}
                                        onChange={(e) => handleInputChange(index, 'institute', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.designation}
                                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.year}
                                        onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.location}
                                        onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <input
                                        value={item.details}
                                        onChange={(e) => handleInputChange(index, 'details', e.target.value)}
                                        className="border p-1 text-sm w-full ring-0 outline-none"
                                    />

                                    <button
                                        onClick={() => handleRemoveRow(index)}
                                        className="!bg-red-500 hover:!bg-red-400 text-white px-2 py-1 rounded text-sm w-auto"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}

                            <div className="flex justify-end items-end border-b pb-2">
                                <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Other Details' && (
                    <div className="border rounded shadow-sm bg-white">
                        <div className="border-b pb-2 bg-gray-100 px-4 py-2">
                            <h2 className="font-semibold">Other Details</h2>
                        </div>

                        <div className="p-4 space-y-4 ">
                            {/* Designation */}
                            <div className="flex gap-1">
                                <label htmlFor="designation" className="text-sm font-medium text-gray-700 w-40">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    id="designation"
                                    value={otherDetails.designation}
                                    onChange={(e) => setOtherDetails({ ...otherDetails, designation: e.target.value })}
                                    className="border p-2 text-sm w-full rounded focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            </div>

                            {/* About */}
                            <div className="flex border-b pb-2">
                                <label htmlFor="about" className="text-sm font-medium text-gray-700 w-40">
                                    About <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="about"
                                    rows={5}
                                    value={otherDetails.about}
                                    onChange={(e) => setOtherDetails({ ...otherDetails, about: e.target.value })}
                                    className="border p-2 text-sm w-full rounded resize-none focus:outline-none focus:ring focus:ring-blue-200"
                                ></textarea>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end items-end">
                                <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                {/* Add sections for other tabs if needed */}
            </div>
        </div>
    );
}

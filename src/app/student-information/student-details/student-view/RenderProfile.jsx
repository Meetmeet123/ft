"use client";
import React from "react";

function RenderProfile(){
    const studentData = {
        name: "Nishant Sindhu",
        admissionNo: "120028",
        rollNumber: "100028",
        class: "Class 1 (2025-26)",
        section: "B",
        gender: "Male",
        rte: "No",
        behaviorScore: "10",
        profile: {
          admissionDate: "04/05/2025",
          dateOfBirth: "08/06/2016",
          category: "OBC",
          mobileNumber: "890678574",
          caste: "",
          religion: "Punjabi",
          email: "nishant45@gmail.com",
          medicalHistory: "NA",
          note: "",
        },
        address: {
          current: "MR Road 99, Delhi",
          permanent: "MR Road 99, Delhi",
        },
        parents: {
          fatherName: "Jayant Sindhu",
          fatherPhone: "8906785644",
          fatherOccupation: "Farmer",
          motherName: "Leena",
          motherPhone: "8906784663",
          motherOccupation: "Housewife",
        },
        guardian: {
          name: "Jayant Sindhu",
          email: "",
          relation: "Father",
          phone: "8906785644",
          occupation: "Farmer",
          address: "MR Road 99, Delhi",
        },
        hostel: {
          name: "Boys Hostel 102",
          roomNo: "B4",
          roomType: "One Bed AC",
        },
        misc: {
          bloodGroup: "B+",
          house: "Blue",
          height: "4'3",
          weight: "45kg",
          measurementDate: "04/06/2025",
          previousSchool: "NA",
          nationalId: "8907899576",
          localId: "890678574",
        }
      };
      
    return(
        <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Admission Date</p>
          </div>
          <div>
            <p>{studentData.profile.admissionDate}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Date of Birth</p>
          </div>
          <div>
            <p>{studentData.profile.dateOfBirth}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Category</p>
          </div>
          <div>
            <p>{studentData.profile.category}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Mobile Number</p>
          </div>
          <div>
            <p>{studentData.profile.mobileNumber}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Caste</p>
          </div>
          <div>
            <p>{studentData.profile.caste || ""}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Religion</p>
          </div>
          <div>
            <p>{studentData.profile.religion}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Email</p>
          </div>
          <div>
            <p>{studentData.profile.email}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Medical History</p>
          </div>
          <div>
            <p>{studentData.profile.medicalHistory}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Note</p>
          </div>
          <div>
            <p>{studentData.profile.note || ""}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Current Address</p>
          </div>
          <div>
            <p>{studentData.address.current}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Permanent Address</p>
          </div>
          <div>
            <p>{studentData.address.permanent}</p>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">Parent Guardian Detail</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Father Name</p>
          </div>
          <div>
            <p>{studentData.parents.fatherName}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Father Phone</p>
          </div>
          <div>
            <p>{studentData.parents.fatherPhone}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Father Occupation</p>
          </div>
          <div>
            <p>{studentData.parents.fatherOccupation}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Mother Name</p>
          </div>
          <div>
            <p>{studentData.parents.motherName}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Mother Phone</p>
          </div>
          <div>
            <p>{studentData.parents.motherPhone}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Mother Occupation</p>
          </div>
          <div>
            <p>{studentData.parents.motherOccupation}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Name</p>
          </div>
          <div>
            <p>{studentData.guardian.name}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Email</p>
          </div>
          <div>
            <p>{studentData.guardian.email || ""}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Relation</p>
          </div>
          <div>
            <p>{studentData.guardian.relation}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Phone</p>
          </div>
          <div>
            <p>{studentData.guardian.phone}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Occupation</p>
          </div>
          <div>
            <p>{studentData.guardian.occupation}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Guardian Address</p>
          </div>
          <div>
            <p>{studentData.guardian.address}</p>
          </div>
        </div>
      </div>

      {/* Hostel Information */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">Hostel Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Hostel</p>
          </div>
          <div>
            <p>{studentData.hostel.name}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Room No.</p>
          </div>
          <div>
            <p>{studentData.hostel.roomNo}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Room Type</p>
          </div>
          <div>
            <p>{studentData.hostel.roomType}</p>
          </div>
        </div>
      </div>

      {/* Miscellaneous Information */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">Miscellaneous Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Blood Group</p>
          </div>
          <div>
            <p>{studentData.misc.bloodGroup}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">House</p>
          </div>
          <div>
            <p>{studentData.misc.house}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Height</p>
          </div>
          <div>
            <p>{studentData.misc.height}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Weight</p>
          </div>
          <div>
            <p>{studentData.misc.weight}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Measurement Date</p>
          </div>
          <div>
            <p>{studentData.misc.measurementDate}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">Previous School Details</p>
          </div>
          <div>
            <p>{studentData.misc.previousSchool}</p>
          </div>
          
          <div>
            <p className="text-gray-600 font-medium">National Identification Number</p>
          </div>
          <div>
            <p>{studentData.misc.nationalId}</p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default RenderProfile;
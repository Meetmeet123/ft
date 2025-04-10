"use client"; // Make the component a client component

import React, { useState } from "react";
import { Table } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import EditProfileForm from "../../Edit-Profile-Form/Form"; // Import the new form component

const ProfessorDetail = ({ professor }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    facebook: professor.socialMedia?.facebook || "",
    twitter: professor.socialMedia?.twitter || "",
    linkedin: professor.socialMedia?.linkedin || "",
    instagram: professor.socialMedia?.instagram || "",
    epfNo: professor.epfNo || "",
    contractType: professor.contractType || "",
    basicSalary: professor.salary?.basic || "",
    workShift: professor.workShift || "",
    workLocation: professor.workLocation || "",
    dateOfLeaving: professor.dateOfLeaving || "",
    medicalLeave: professor.leaves?.medical || "",
    casualLeave: professor.leaves?.casual || "",
    maternityLeave: professor.leaves?.maternity || "",
    sickLeave: professor.leaves?.sick || "",
    accountTitle: professor.bankDetails?.accountTitle || "",
    bankAccountNumber: professor.bankDetails?.accountNumber || "",
    bankName: professor.bankDetails?.bankName || "",
    ifscCode: professor.bankDetails?.ifsc || "",
    bankBranchName: professor.bankDetails?.branchName || "",
  });

  const personalDetails = [
    {
      key: "1",
      label: "Phone",
      value: professor.phone || "N/A",
      icon: <PhoneOutlined />,
    },
    {
      key: "2",
      label: "Email",
      value: professor.email || "N/A",
      icon: <MailOutlined />,
    },
    {
      key: "3",
      label: "Gender",
      value: professor.gender || "N/A",
      icon: <UserOutlined />,
    },
    {
      key: "4",
      label: "Date of Birth",
      value: professor.dob || "N/A",
      icon: <CalendarOutlined />,
    },
  ];

  const payrollDetails = [
    {
      key: "1",
      label: "Total Net Salary Paid",
      value: `$${professor.salary?.net || "0.00"}`,
      icon: <MoneyCollectOutlined />,
    },
    {
      key: "2",
      label: "Total Gross Salary",
      value: `$${professor.salary?.gross || "0.00"}`,
      icon: <MoneyCollectOutlined />,
    },
    {
      key: "3",
      label: "Total Earning",
      value: `$${professor.salary?.earning || "0.00"}`,
      icon: <MoneyCollectOutlined />,
    },
    {
      key: "4",
      label: "Total Deduction",
      value: `$${professor.salary?.deduction || "0.00"}`,
      icon: <MoneyCollectOutlined />,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically send the updated values to your server
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="p-6 bg-gray-100">
      <div className="flex flex-wrap">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 mb-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full border-2 border-gray-300"
                src={
                  professor.image ||
                  "https://demo.smart-school.in/uploads/staff_images/default_male.jpg?1743424941"
                }
                alt="User  profile picture"
              />
              <h3 className="text-xl font-semibold mt-4">{professor.name}</h3>
              <ul className="mt-4 w-full">
                <li className="flex justify-between p-2 border-b">
                  <b>Staff ID</b>
                  <span className="text-blue-600">{professor.id}</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <b>Role</b>
                  <span className="text-blue-600">{professor.role}</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <b>Designation</b>
                  <span className="text-blue-600">{professor.designation}</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <b>Department</b>
                  <span className="text-blue-600">{professor.department}</span>
                </li>
                <li className="flex justify-between p-2 border-b">
                  <b>Disable Date</b>
                  <span className="text-blue-600">
                    {professor.disableDate || "N/A"}
                  </span>
                </li>
              </ul>
              <button
                onClick={showModal}
                style={{ backgroundColor: "#164f63" }}
                className="mt-4  text-white py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full md:w-2/3">
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
              <Table
                dataSource={personalDetails}
                pagination={false}
                rowKey="key"
                bordered
                columns={[
                  {
                    title: "Detail",
                    dataIndex: "label",
                    render: (text, record) => (
                      <div className="flex items-center">
                        {record.icon}
                        <span className="ml-2">{text}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                  },
                ]}
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Payroll Details</h2>
              <Table
                dataSource={payrollDetails}
                pagination={false}
                rowKey="key"
                bordered
                columns={[
                  {
                    title: "Detail",
                    dataIndex: "label",
                    render: (text, record) => (
                      <div className="flex items-center">
                        {record.icon}
                        <span className="ml-2">{text}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <EditProfileForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleOk}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessorDetail;

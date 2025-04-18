import React from "react";

const EditProfileForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <div
      className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg overflow-y-auto"
      style={{ maxHeight: "75vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h3 className="text-lg font-semibold mb-4 col-span-2">
          Social Media Links
        </h3>
        <label className="block mb-2">
          Facebook URL:
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Twitter URL:
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          LinkedIn URL:
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Instagram URL:
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2 col-span-2">
          Upload Documents:
          <input type="file" className="border rounded w-full p-2" />
        </label>

        <h3 className="text-lg font-semibold mb-4 col-span-2">
          Add More Details
        </h3>
        <label className="block mb-2">
          EPF No.:
          <input
            type="text"
            name="epfNo"
            value={formData.epfNo}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Contract Type:
          <select
            name="contractType"
            value={formData.contractType}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select Contract Type</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
            <option value="contract">Contract</option>
          </select>
        </label>
        <label className="block mb-2">
          Basic Salary:
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Work Shift:
          <input
            type="text"
            name="workShift"
            value={formData.workShift}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Work Location:
          <input
            type="text"
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Date Of Leaving:
          <input
            type="date"
            name="dateOfLeaving"
            value={formData.dateOfLeaving}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Medical Leave:
          <input
            type="number"
            name="medicalLeave"
            value={formData.medicalLeave}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Casual Leave:
          <input
            type="number"
            name="casualLeave"
            value={formData.casualLeave}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Maternity Leave:
          <input
            type="number"
            name="maternityLeave"
            value={formData.maternityLeave}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Sick Leave:
          <input
            type="number"
            name="sickLeave"
            value={formData.sickLeave}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Account Title:
          <input
            type="text"
            name="accountTitle"
            value={formData.accountTitle}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Bank Account Number:
          <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Bank Name:
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          IFSC Code:
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <label className="block mb-2">
          Bank Branch Name:
          <input
            type="text"
            name="bankBranchName"
            value={formData.bankBranchName}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </label>
        <div className="flex justify-between mt-4 col-span-2">
          <button
            type="button"
            style={{ backgroundColor: "red" }}
            onClick={handleCancel}
            className="text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className="text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;

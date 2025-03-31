import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function AddMarksheet() {
  const [formData, setFormData] = useState({
    template: "",
    heading: "",
    title: "",
    exam_name: "",
    school_name: "",
    exam_center: "",
    content_footer: "",
    printing_date: "",
    left_logo: null,
    right_logo: null,
    sign: null,
    background_img: null,
    header_image: null,
    left_sign: null,
    middle_sign: null,
    right_sign: null,
    is_name: false,
    is_father_name: false,
    is_mother_name: false,
    is_dob: false,
    is_admission_no: false,
    is_roll_no: false,
    is_address: false,
    is_gender: false,
    is_photo: false,
    is_class: false,
    is_section: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Exam Form</h2>

      {/* Text Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "template",
          "heading",
          "title",
          "exam_name",
          "school_name",
          "exam_center",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium text-gray-700 capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2 rounded-md focus:ring focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Printing Date Field */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Printing Date</label>
          <input
            type="date"
            name="printing_date"
            value={formData.printing_date}
            onChange={handleChange}
            className="border p-2 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Footer Text */}
      <div>
        <label className="font-medium text-gray-700">Footer Text</label>
        <textarea
          name="content_footer"
          value={formData.content_footer}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring focus:ring-blue-400"
        ></textarea>
      </div>

      {/* File Upload Fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "left_logo",
          "right_logo",
          "sign",
          "background_img",
          "header_image",
          "left_sign",
          "middle_sign",
          "right_sign",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium text-gray-700 capitalize">
              {field.replace("_", " ")}
            </label>
            <div className="flex items-center border p-2 rounded-md cursor-pointer relative bg-gray-50">
              <UploadOutlined className="mr-2 text-blue-500" />
              <input
                type="file"
                name={field}
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-gray-600 text-sm">
                {formData[field] ? formData[field].name : "Upload File"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkbox Fields */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "is_name",
          "is_father_name",
          "is_mother_name",
          "is_dob",
          "is_admission_no",
          "is_roll_no",
          "is_address",
          "is_gender",
          "is_photo",
          "is_class",
          "is_section",
        ].map((field) => (
          <div key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field}
              checked={formData[field]}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-500"
            />
            <label className="capitalize text-gray-700">
              {field.replace("is_", "").replace("_", " ")}
            </label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          Save
        </button>
      </div>
    </form>
  );
}

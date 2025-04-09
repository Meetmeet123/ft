import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function AddAdmitCard() {
  const [formData, setFormData] = useState({
    template: "",
    heading: "",
    title: "",
    exam_name: "",
    school_name: "",
    exam_center: "",
    content_footer: "",
    left_logo: null,
    right_logo: null,
    sign: null,
    background_img: null,
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
    //Add the submit endpoint here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-9/12  mx-auto bg-white p-6 shadow-lg rounded-b-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Exam Form</h2>
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
            <label className="font-medium capitalize">
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
      </div>
      <div className="mt-4">
        <label className="font-medium">Footer Text</label>
        <textarea
          name="content_footer"
          value={formData.content_footer}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring focus:ring-blue-400"
        ></textarea>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {["left_logo", "right_logo", "sign", "background_img"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium capitalize">
              {field.replace("_", " ")}
            </label>
            <div className="flex items-center border p-2 rounded-md cursor-pointer relative">
              <UploadOutlined className="mr-2 text-blue-500" />
              <input
                type="file"
                name={field}
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-gray-600">
                {formData[field] ? formData[field].name : "Upload File"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
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
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          Save
        </button>
      </div>
    </form>
  );
}

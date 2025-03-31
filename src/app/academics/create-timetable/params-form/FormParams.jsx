"use client";

import {
  SearchOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const ParamFormComponent = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    duration: "",
    interval: "0",
    room_no: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="ml-5 mt-5 bg-white shadow-md rounded-lg p-4 border border-gray-300">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <SearchOutlined /> Select Parameter to Generate Time Table Quickly
      </h3>
      <form action="#" method="POST" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="block font-medium">
              Period Start Time<span className="text-red-500"> *</span>
            </label>
            <div className="flex items-center border rounded-md p-2">
              <input
                type="text"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter start time"
              />
              <ClockCircleOutlined className="ml-2 text-gray-500" />
            </div>
          </div>
          <div className="form-group">
            <label className="block font-medium">
              Duration (minutes)<span className="text-red-500"> *</span>
            </label>
            <div className="flex items-center border rounded-md p-2">
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter duration"
              />
              <HourglassOutlined className="ml-2 text-gray-500" />
            </div>
          </div>
          <div className="form-group">
            <label className="block font-medium">
              Interval (minutes)<span className="text-red-500"> *</span>
            </label>
            <div className="flex items-center border rounded-md p-2">
              <input
                type="number"
                name="interval"
                value={formData.interval}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter interval"
              />
              <HourglassOutlined className="ml-2 text-gray-500" />
            </div>
          </div>
          <div className="form-group">
            <label className="block font-medium">Room No.</label>
            <input
              type="text"
              name="room_no"
              value={formData.room_no}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter room number"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded flex items-center"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParamFormComponent;

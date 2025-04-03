import React, { useState } from "react";
import { Button } from "antd"; // Using Ant Design for the button to match your other components

const VisitorBookForm = () => {
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to current date
  const [inTime, setInTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ); // Default to current time
  const [outTime, setOutTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ); // Default to current time
  const [note, setNote] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log({
      purpose,
      name,
      phone,
      idCard,
      numberOfPerson,
      date,
      inTime,
      outTime,
      note,
      document,
      photo,
    });
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <form onSubmit={handleSubmit} className="p-2.5">
      <div className="flex flex-wrap mt-5 mx-2">
        {/* Purpose Dropdown */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Purpose <span className="text-red-500">*</span>
            </label>
            <select
              id="purpose"
              name="purpose"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Meeting">Admission</option>
              <option value="Delivery">Paying Fee</option>
            </select>
          </div>
        </div>

        {/* Name Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={name}
              onChange={(e) => {
                const text = e.target.value;
                if (countWords(text) <= 10) setName(text);
              }}
              required
            />
            <p className="text-sm text-gray-500">
              Max Word 10 Words -- Total word Count: {countWords(name)} words.
            </p>
          </div>
        </div>

        {/* Phone Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* ID Card Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              ID Card
            </label>
            <input
              type="text"
              id="idCard"
              name="idCard"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
            />
          </div>
        </div>

        {/* Number of Person Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Number of Person
            </label>
            <input
              type="number"
              id="numberOfPerson"
              name="numberOfPerson"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={numberOfPerson}
              onChange={(e) => setNumberOfPerson(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* In Time Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              In Time
            </label>
            <input
              type="time"
              id="inTime"
              name="inTime"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={inTime}
              onChange={(e) => setInTime(e.target.value)}
            />
          </div>
        </div>

        {/* Out Time Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Out Time
            </label>
            <input
              type="time"
              id="outTime"
              name="outTime"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={outTime}
              onChange={(e) => setOutTime(e.target.value)}
            />
          </div>
        </div>

        {/* Note Textarea */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={note}
              onChange={(e) => {
                const text = e.target.value;
                if (countWords(text) <= 20) setNote(text);
              }}
              rows={3}
            />
            <p className="text-sm text-gray-500">
              Max Word 20 Words -- Total word Count: {countWords(note)} words.
            </p>
          </div>
        </div>

        {/* Attach Document Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Attach Document
            </label>
            <input
              type="file"
              id="document"
              name="document"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) setDocument(files[0]);
              }}
            />
          </div>
        </div>

        {/* Visitor Photo Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Visitor Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) setPhoto(files[0]);
              }}
              accept="image/*"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full px-2">
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#164f63", border: "none" }}
            className="hover:bg-teal-700 text-white font-bold px-2 py-2 rounded transition float-right"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VisitorBookForm;
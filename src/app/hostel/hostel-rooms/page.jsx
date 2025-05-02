"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function HostelForm() {
  const [formData, setFormData] = useState({
    room_no: "",
    hostel_id: "",
    no_of_bed: "",
    cost_per_bed: "",
    description: "",
  });

  const [hostelOptions, setHostelOptions] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchHostels = async () => {
    try {
      const res = await axios.get("/api/rooms");
      setHostels(res.data);
    } catch (err) {
      console.error("Failed to load hostel rooms:", err);
      toast.error("Failed to load hostel rooms");
    }
  };

  const fetchHostelList = async () => {
    try {
      const res = await axios.get("/api/rooms?type=list");
      setHostelOptions(res.data);
    } catch (err) {
      console.error("Failed to load hostel list:", err);
    }
  };

  useEffect(() => {
    fetchHostels();
    fetchHostelList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editId) {
        await axios.put(`/api/rooms?id=${editId}`, formData);
        toast.success("Hostel room updated successfully");
      } else {
        await axios.post("/api/rooms", formData);
        toast.success("Hostel room added successfully");
      }

      setFormData({
        room_no: "",
        hostel_id: "",
        no_of_bed: "",
        cost_per_bed: "",
        description: "",
      });
      setEditId(null);
      fetchHostels();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.error || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (hostel) => {
    setFormData({
      room_no: hostel.room_no,
      hostel_id: hostel.hostel_id || "",
      no_of_bed: hostel.no_of_bed,
      cost_per_bed: hostel.cost_per_bed,
      description: hostel.description || "",
    });
    setEditId(hostel.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hostel room?")) return;

    try {
      await axios.delete(`/api/rooms?id=${id}`);
      toast.success("Deleted successfully");
      fetchHostels();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div
      className="p-4"
      style={{
        display: "inline-flex",
        width: "108%",
        gap: "20px",
        alignItems: "flex-start",
        position:'relative',right:'130px'
      }}
    >
      {/* Form Section */}
      <div
        style={{
          position: "relative",
          left: "100px",
          width: "550px",
          backgroundColor: "white",
          padding: "24px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add/Edit Hostel Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium">Room Number/Name *</label>
            <input
              type="text"
              name="room_no"
              value={formData.room_no}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Hostel *</label>
            <select
              name="hostel_id"
              value={formData.hostel_id}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            >
              <option value="">Select Hostel</option>
              {hostelOptions.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.hostel_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Number Of Beds *</label>
            <input
              type="number"
              name="no_of_bed"
              value={formData.no_of_bed}
              onChange={handleChange}
              required
              min="1"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cost Per Bed *</label>
            <input
              type="number"
              name="cost_per_bed"
              value={formData.cost_per_bed}
              onChange={handleChange}
              required
              min="0"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isSubmitting
                ? editId
                  ? "Updating..."
                  : "Saving..."
                : editId
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div
        style={{
          width: "55%",
          position: "relative",
          left: "90px",
          backgroundColor: "white",
          padding: "24px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Hostel Rooms List</h2>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Room No</th>
              <th className="px-4 py-2 border">Hostel</th>
              <th className="px-4 py-2 border">Beds</th>
              <th className="px-4 py-2 border">Cost</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-2 border">{h.room_no}</td>
                <td className="px-4 py-2 border">{h.hostel_name}</td>
                <td className="px-4 py-2 border">{h.no_of_bed}</td>
                <td className="px-4 py-2 border">{h.cost_per_bed}</td> 
                <td className="px-4 py-2 border">{h.description || "-"}</td>
                <td className="px-4 py-2 border space-x-2 text-center">
                  <button onClick={() => handleEdit(h)} className="text-blue-600 hover:underline">
                    Edit/
                  </button>
                  <button onClick={() => handleDelete(h.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {hostels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hostel rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

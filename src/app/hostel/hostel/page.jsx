"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function HostelForm() {
  const [formData, setFormData] = useState({
    hostel_name: "",
    type: "",
    intake: "",
    address: "",
    description: "",
  });

  const [hostels, setHostels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchHostels = async () => {
    try {
      const res = await axios.get("/api/hostel");
      setHostels(res.data);
    } catch (err) {
      toast.error("Failed to load hostels");
    }
  };

  useEffect(() => {
    fetchHostels();
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
        await axios.put(`/api/hostel?id=${editId}`, formData);
        toast.success("Hostel updated");
      } else {
        await axios.post("/api/hostel", formData);
        toast.success("Hostel added");
      }

      setFormData({
        hostel_name: "",
        type: "",
        intake: "",
        address: "",
        description: "",
      });
      setEditId(null);
      fetchHostels();
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (hostel) => {
    setFormData({
      hostel_name: hostel.hostel_name,
      type: hostel.type,
      intake: hostel.intake,
      address: hostel.address,
      description: hostel.description,
    });
    setEditId(hostel.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await axios.delete(`/api/hostel?id=${id}`);
      toast.success("Deleted successfully");
      fetchHostels();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div
    style={{
      display: "inline-flex", position:"relative",right:"40px",
      width: "112%",
      gap: "20px",
      alignItems: "flex-start",
      padding: "24px",
    }}
    >
      {/* Form */}
      <div
        style={{
          width: "33%",
          backgroundColor: "white",
          padding: "24px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add/Edit Hostel</h2>
        <form 
          onSubmit={handleSubmit}
         
        >
          <div>
            <label className="block text-sm font-medium">Hostel Name *</label>
            <input
              type="text"
              name="hostel_name"
              value={formData.hostel_name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Type *</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Intake</label>
            <input
              type="number"
              name="intake"
              value={formData.intake}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button type="submit" disabled={isSubmitting} style={{color:"black"}}>
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

      {/* Table */}
      <div
         
           style={{
             width: "63%", position:"relative",right:"10px",
             backgroundColor: "white",
             padding: "24px",
             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
             borderRadius: "8px",
             overflowX: "auto",
           }}
      >
        <h2 className="text-xl font-bold mb-4">Hostels</h2>
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">Name</th>
              <th className="px-4 py-2 text-left border">Type</th>
              <th className="px-4 py-2 text-left border">Intake</th>
              <th className="px-4 py-2 text-left border">Address</th>
              <th className="px-4 py-2 text-left border">Description</th>
              <th className="px-4 py-2 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((h) => (
              <tr key={h.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{h.hostel_name}</td>
                <td className="px-4 py-2 border">{h.type}</td>
                <td className="px-4 py-2 border">{h.intake}</td>
                <td className="px-4 py-2 border">{h.address}</td>
                <td className="px-4 py-2 border">{h.description}</td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(h)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit /
                  </button>
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {hostels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hostels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

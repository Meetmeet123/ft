'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopicForm() {
  const [formData, setFormData] = useState({
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: '',
    lesson_id: '',
    session_id: '',
    names: ['']
  });

  const [editId, setEditId] = useState(null);
  const [data, setData] = useState({
    classes: [],
    sections: [],
    subjectGroups: [],
    subjects: [],
    lessons: [],
    sessions: [],
    topicList: []
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/topic');
      setData(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (index, value) => {
    const newNames = [...formData.names];
    newNames[index] = value;
    setFormData({ ...formData, names: newNames });
  };

  const addTopicField = () => {
    setFormData({ ...formData, names: [...formData.names, ''] });
  };

  const resetForm = () => {
    setFormData({
      class_id: '',
      section_id: '',
      subject_group_id: '',
      subject_id: '',
      lesson_id: '',
      session_id: '',
      names: ['']
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const payload = { id: editId, ...formData, name: formData.names[0] };
        await axios.put('/api/topic', payload);
      } else {
        for (const name of formData.names) {
          const payload = { ...formData, name };
          await axios.post('/api/topic', payload);
        }
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      class_id: item.class_id?.toString() || '',
      section_id: item.section_id?.toString() || '',
      subject_group_id: item.subject_group_id?.toString() || '',
      subject_id: item.subject_id?.toString() || '',
      lesson_id: item.lesson_id?.toString() || '',
      session_id: item.session_id?.toString() || '',
      names: [item.name]
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/topic?id=${id}`);
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleExport = () => {
    const csv = data.topicList.map((item) =>
      [
        item.class,
        item.section,
        item.subject_group,
        item.subject,
        item.lesson,
        item.name
      ].join(',')
    );
    const csvContent = 'Class,Section,Subject Group,Subject,Lesson,Topic\n' + csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'topics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const lines = text.trim().split('\n').slice(1);
      for (const line of lines) {
        const [className, section, subjectGroup, subject, lesson, topic] = line.split(',');
        // Optional: Map names to IDs before insert (not handled here)
        await axios.post('/api/topic', {
          class_id: '', section_id: '', subject_group_id: '', subject_id: '', lesson_id: '', session_id: '',
          name: topic.trim()
        });
      }
      fetchData();
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4"style={{width:'1130px',position:'relative',right:"130px"}}>

      {/* Left Form */}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-6 rounded shadow space-y-4" style={{ width: "420px", position: "relative", left: "100px",padding:'10px' }}>
        <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit Topic' : 'Add Topic'}</h2>

        {[
          { label: 'Class', name: 'class_id', options: data.classes, key: 'class' }, 
          { label: 'Section', name: 'section_id', options: data.sections, key: 'section' },
          { label: 'Subject Group', name: 'subject_group_id', options: data.subjectGroups, key: 'name' },
          { label: 'Subject', name: 'subject_id', options: data.subjects, key: 'name' },
          { label: 'Lesson', name: 'lesson_id', options: data.lessons, key: 'name' },
          { label: 'Session', name: 'session_id', options: data.sessions, key: 'session' }
        ].map(({ label, name, options, key }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label} <span className="text-red-500">*</span></label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select {label}</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>{o[key]}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Import/Export Buttons */}
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Topic Name <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <button type="button" onClick={handleExport} className="text-xs px-2 py-1 border rounded bg-blue-50 hover:bg-blue-100">Export</button>
            <label className="text-xs px-2 py-1 border rounded bg-green-50 hover:bg-green-100 cursor-pointer">
              Import
              <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {formData.names.map((name, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder="Enter topic"
              className="w-full border px-3 py-2 rounded"
              required
            />
            {!editId && index === formData.names.length - 1 && (
              <button type="button" onClick={addTopicField} className="px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">
                Add More
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-4">
          <button type="submit">{editId ? 'Update' : 'Save'}</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </div>
      </form>

      {/* Right Table */}
      <div className="w-full md:w-1/2 bg-white p-4 rounded shadow overflow-x-auto" style={{ width: "580px", position: "relative", left: "80px" }}>
        <h2 className="text-xl font-semibold mb-3">Topic List</h2>
        <input type="text" placeholder="Search..." className="mb-3 w-full border px-3 py-2 rounded" />

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Section</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Subject group</th>
              <th className="border p-2">Lesson</th>
              <th className="border p-2">Topic</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.topicList.length > 0 ? (
              data.topicList.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{item.class}</td>
                  <td className="border px-2 py-1">{item.section}</td>
                  <td className="border px-2 py-1">{item.subject}</td>
                  <td className="border px-2 py-1">{item.subject_group}</td>
                  <td className="border px-2 py-1">{item.lesson}</td>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1 flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">✏️</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">No topics available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

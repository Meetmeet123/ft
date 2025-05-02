'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function lessonForm() {
  const [dropdownData, setDropdownData] = useState({
    classes: [],
    sections: [],
    subjectGroups: [],
    subjects: [],
  });

  const [formData, setFormData] = useState({
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: '',
    names: [''],
  });

  const [lessonList, setLessonList] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDropdownsAndLessons();
  }, []);

  const fetchDropdownsAndLessons = async () => {
    try {
      const res = await axios.get('/api/lesson');
      const {
        classes, sections, subjectGroups, subjects, topicList
      } = res.data;
      setDropdownData({ classes, sections, subjectGroups, subjects });
      setLessonList(topicList || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === 'names' && index !== null) {
      const updatedNames = [...formData.names];
      updatedNames[index] = value;
      setFormData(prev => ({ ...prev, names: updatedNames }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddLesson = () => {
    setFormData(prev => ({ ...prev, names: [...prev.names, ''] }));
  };

  const handleRemoveLesson = (index) => {
    const updated = [...formData.names];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, names: updated }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    const { class_id, section_id, subject_group_id, subject_id, names } = formData;

    if (!class_id || !section_id || !subject_group_id || !subject_id || names.some(n => !n.trim())) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      if (editingId) {
        // Update only the first lesson name
        await axios.put('/api/lesson', {
          id: editingId,
          class_id,
          section_id,
          subject_group_id,
          subject_id,
          name: names[0]
        });
      } else {
        for (let name of names) {
          await axios.post('/api/lesson', {
            class_id,
            section_id,
            subject_group_id,
            subject_id,
            name
          });
        }
      }

      setFormData({
        class_id: '',
        section_id: '',
        subject_group_id: '',
        subject_id: '',
        names: ['']
      });
      setEditingId(null);
      fetchDropdownsAndLessons();
    } catch (err) {
      console.error(err);
      setError('Failed to save lesson(s).');
    }
  };

  const handleEdit = (lesson) => {
    setEditingId(lesson.id);
    setFormData({
      class_id: lesson.class_id?.toString() || '',
      section_id: lesson.section_id?.toString() || '',
      subject_group_id: lesson.subject_group_id?.toString() || '',
      subject_id: lesson.subject_id?.toString() || '',
      names: [lesson.name]
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await axios.delete(`/api/lesson`, { data: { id } });
      fetchDropdownsAndLessons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4"style={{width:'1030px',position:'relative',right:"30px"}}>
      {/* Left: Lesson Form */}
      <div className="w-full md:w-1/3 border p-4 rounded bg-white shadow">
        <h2 className="text-lg font-semibold mb-3">{editingId ? 'Edit Lesson' : 'Add Lesson'}</h2>
        <form onSubmit={handleSave} className="space-y-3">
          {[{ label: 'Class', name: 'class_id', options: dropdownData.classes, valueKey: 'class' },
            { label: 'Section', name: 'section_id', options: dropdownData.sections, valueKey: 'section' },
            { label: 'Subject Group', name: 'subject_group_id', options: dropdownData.subjectGroups, valueKey: 'name' },
            { label: 'Subject', name: 'subject_id', options: dropdownData.subjects, valueKey: 'name' }
          ].map(({ label, name, options, valueKey }) => (
            <div key={name}>
              <label className="block mb-1">{label} *</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select</option>
                {options.map(item => (
                  <option key={item.id} value={item.id}>{item[valueKey]}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Import and Export Buttons */}
          <div className="flex gap-2 items-center mb-2">
            <button
              type="button"
              onClick={() => alert('Import functionality coming soon')}
              className=""
            >
              ⬆️ Import
            </button>
            <button
  onClick={() => window.open('/api/lesson?export=csv', '_blank')}
>
  Export to CSV
</button>
          </div>

          {formData.names.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-full">
                <label className="block mb-1">{index === 0 ? 'Lesson Name *' : ''}</label>
                <input
                  type="text"
                  name="names"
                  value={name}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder={`Enter lesson name ${index + 1}`}
                  required
                />
              </div>
              {formData.names.length > 1 && (
                <button type="button" onClick={() => handleRemoveLesson(index)}>❌</button>
              )}
            </div>
          ))}

          <button type="button" onClick={handleAddLesson}>➕ Add More</button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2">
            <button type="submit">
              {editingId ? 'Update' : 'Save'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    class_id: '',
                    section_id: '',
                    subject_group_id: '',
                    subject_id: '',
                    names: ['']
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right: Lesson Table */}
      <div className="w-full md:w-2/3 border p-4 rounded bg-white shadow overflow-x-auto" style={{width:"1050px"}}>
        <h2 className="text-lg font-semibold mb-3">Lesson List</h2>
        <table className="w-full text-sm border border-collapse border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Class</th>
              <th className="border px-3 py-2">Section</th>
              <th className="border px-3 py-2">Subject Group</th>
              <th className="border px-3 py-2">Subject</th>
              <th className="border px-3 py-2">Lesson</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {lessonList.length > 0 ? lessonList.map((item, i) => (
              <tr key={item.id || i} className="border-t">
                <td className="border px-3 py-1">{item.class}</td>
                <td className="border px-3 py-1">{item.section}</td>
                <td className="border px-3 py-1">{item.subject_group}</td>
                <td className="border px-3 py-1">{item.subject}</td>
                <td className="border px-3 py-1">{item.name}</td>
                <td className="border px-3 py-1 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-2"
                  >✏️</button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >🗑️</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-3">No lessons found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

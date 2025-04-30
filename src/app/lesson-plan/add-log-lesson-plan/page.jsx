'use client';
import { useState, useEffect } from 'react';

const LogLessonPlan = () => {
  // Dummy data
  const dummyData = {
    classes: [
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' },
      { id: 3, name: 'Class 3' }
    ],
    staff: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Robert Johnson' }
    ],
    sections: [
      { id: 1, name: 'Section A' },
      { id: 2, name: 'Section B' },
      { id: 3, name: 'Section C' }
    ],
    subjectGroups: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Arts' },
      { id: 3, name: 'Commerce' }
    ],
    subjects: [
      { id: 1, name: 'Mathematics', group_id: 1 },
      { id: 2, name: 'Physics', group_id: 1 },
      { id: 3, name: 'History', group_id: 2 }
    ],
    lessons: [
      { id: 1, name: 'Algebra Basics', subject_id: 1 },
      { id: 2, name: 'Newton Laws', subject_id: 2 },
      { id: 3, name: 'World War II', subject_id: 3 }
    ],
    topics: [
      { id: 1, name: 'Linear Equations', lesson_id: 1 },
      { id: 2, name: 'Motion', lesson_id: 2 },
      { id: 3, name: 'Causes of War', lesson_id: 3 }
    ],
    logLessons: [
      {
        id: 1,
        completion_date: '2023-05-15',
        class_id: 1,
        staff_id: 1,
        section_id: 1,
        subject_group_id: 1,
        subject_id: 1,
        lesson_id: 1,
        topic_id: 1,
        learning_experiences: 'Hands-on practice with equations',
        evaluation_techniques: 'Quiz and assignment',
        teaching_aids: 'Whiteboard, markers'
      }
    ]
  };

  const [formData, setFormData] = useState({
    completion_date: '',
    class_id: '',
    staff_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: '',
    lesson_id: '',
    topic_id: '',
    learning_experiences: '',
    evaluation_techniques: '',
    teaching_aids: ''
  });

  const [editId, setEditId] = useState(null);
  const [data, setData] = useState(dummyData);
  const [filteredLogLessons, setFilteredLogLessons] = useState(dummyData.logLessons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = data.logLessons.filter(lesson => {
      // Convert all values to string for searching
      const values = Object.values(lesson).map(val => {
        if (typeof val === 'number') return val.toString();
        return val;
      });
      return values.some(
        val => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredLogLessons(filtered);
  }, [searchTerm, data.logLessons]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      completion_date: '',
      class_id: '',
      staff_id: '',
      section_id: '',
      subject_group_id: '',
      subject_id: '',
      lesson_id: '',
      topic_id: '',
      learning_experiences: '',
      evaluation_techniques: '',
      teaching_aids: ''
    });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert all IDs to numbers before saving
    const lessonToSave = {
      ...formData,
      class_id: parseInt(formData.class_id),
      staff_id: parseInt(formData.staff_id),
      section_id: parseInt(formData.section_id),
      subject_group_id: parseInt(formData.subject_group_id),
      subject_id: parseInt(formData.subject_id),
      lesson_id: parseInt(formData.lesson_id),
      topic_id: parseInt(formData.topic_id)
    };

    if (editId) {
      const updatedLogLessons = data.logLessons.map(lesson =>
        lesson.id === editId ? { ...lessonToSave, id: editId } : lesson
      );
      setData({ ...data, logLessons: updatedLogLessons });
    } else {
      const newId = data.logLessons.length > 0 
        ? Math.max(...data.logLessons.map(l => l.id)) + 1 
        : 1;
      const newLogLesson = {
        ...lessonToSave,
        id: newId
      };
      setData({ ...data, logLessons: [...data.logLessons, newLogLesson] });
    }
    
    resetForm();
  };

  const handleEdit = (logLesson) => {
    setFormData({
      completion_date: logLesson.completion_date,
      class_id: logLesson.class_id.toString(),
      staff_id: logLesson.staff_id.toString(),
      section_id: logLesson.section_id.toString(),
      subject_group_id: logLesson.subject_group_id.toString(),
      subject_id: logLesson.subject_id.toString(),
      lesson_id: logLesson.lesson_id.toString(),
      topic_id: logLesson.topic_id.toString(),
      learning_experiences: logLesson.learning_experiences,
      evaluation_techniques: logLesson.evaluation_techniques,
      teaching_aids: logLesson.teaching_aids
    });
    setEditId(logLesson.id);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this log lesson?')) {
      const updatedLogLessons = data.logLessons.filter(lesson => lesson.id !== id);
      setData({ ...data, logLessons: updatedLogLessons });
    }
  };

  const getFilteredOptions = (options, filterKey, filterValue) => {
    if (!filterValue) return options;
    return options.filter(option => option[filterKey] === parseInt(filterValue));
  };

  const getOptionName = (options, id) => {
    if (!id) return 'N/A';
    const option = options.find(opt => opt.id === parseInt(id));
    return option ? option.name : 'N/A';
  };

  return (
    <div className="container mx-auto p-4"style={{width:'1080px',position:'relative',right:"30px"}}>
      
      
      <div className="flex flex-col lg:flex-row gap-6" >
      {/* <h1 className="text-2xl font-bold mb-6">Add Log Lesson Plan</h1> */}
        {/* Form Section - Left Side */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Add Log Lesson Plan</h1>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Completion Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completion Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="completion_date"
                  value={formData.completion_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Class</option>
                  {data.classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              {/* Staff */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff <span className="text-red-500">*</span>
                </label>
                <select
                  name="staff_id"
                  value={formData.staff_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Staff</option>
                  {data.staff.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name}</option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  name="section_id"
                  value={formData.section_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Section</option>
                  {data.sections.map(section => (
                    <option key={section.id} value={section.id}>{section.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject_group_id"
                  value={formData.subject_group_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Subject Group</option>
                  {data.subjectGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject_id"
                  value={formData.subject_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Subject</option>
                  {getFilteredOptions(data.subjects, 'group_id', formData.subject_group_id).map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>

              {/* Lesson */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson <span className="text-red-500">*</span>
                </label>
                <select
                  name="lesson_id"
                  value={formData.lesson_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Lesson</option>
                  {getFilteredOptions(data.lessons, 'subject_id', formData.subject_id).map(lesson => (
                    <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic <span className="text-red-500">*</span>
                </label>
                <select
                  name="topic_id"
                  value={formData.topic_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Topic</option>
                  {getFilteredOptions(data.topics, 'lesson_id', formData.lesson_id).map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                  ))}
                </select>
              </div>

              {/* Learning Experiences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Experiences <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="learning_experiences"
                  value={formData.learning_experiences}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              {/* Evaluation Techniques */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evaluation Techniques <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="evaluation_techniques"
                  value={formData.evaluation_techniques}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Teaching Aids */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teaching Aids
                </label>
                <input
                  type="text"
                  name="teaching_aids"
                  value={formData.teaching_aids}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Table Section - Right Side */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6" style={{ width:"500px",position:'relative',right:'10px'}}>
          <h2 className="text-xl font-semibold mb-4">Log Lesson List</h2>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto" >
            <table className="min-w-full divide-y divide-gray-200" >
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  
                  
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogLessons.length > 0 ? (
                  filteredLogLessons.map((logLesson) => (
                    <tr key={logLesson.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {logLesson.completion_date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.classes, logLesson.class_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.staff, logLesson.staff_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.sections, logLesson.section_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.subjects, logLesson.subject_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.lessons, logLesson.lesson_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getOptionName(data.topics, logLesson.topic_id)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(logLesson)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(logLesson.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                        🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
                      No log lessons found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogLessonPlan;
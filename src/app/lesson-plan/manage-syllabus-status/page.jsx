'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SyllabusManager() {
  const [searchForm, setSearchForm] = useState({
    session_id: '',
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: ''
  });

  const [subjectForm, setSubjectForm] = useState({
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: '',
    topic: ''
  });

  const [dropdownData, setDropdownData] = useState({
    sessions: [],
    classes: [],
    sections: [],
    subjectGroups: [],
    subjects: [],
    topicList: []
  });

  const [syllabusData, setSyllabusData] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const res = await axios.get('/api/manage-syllabus-status');
        const sessions = res.data.sessions || [];

        setDropdownData({
          sessions,
          classes: res.data.classes || [],
          sections: res.data.sections || [],
          subjectGroups: res.data.subjectGroups || [],
          subjects: res.data.subjects || [],
          topicList: res.data.topicList || []
        });

        if (sessions.length > 0) {
          setSearchForm(prev => ({
            ...prev,
            session_id: sessions[0].id.toString()
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDropdownData();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'class_id') {
      setSearchForm(prev => ({ ...prev, section_id: '', subject_group_id: '', subject_id: '' }));
    } else if (name === 'section_id') {
      setSearchForm(prev => ({ ...prev, subject_group_id: '', subject_id: '' }));
    } else if (name === 'subject_group_id') {
      setSearchForm(prev => ({ ...prev, subject_id: '' }));
    }
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setHasSearched(true);

      const res = await axios.get('/api/manage-syllabus-status');
      const topicList = res.data.topicList || [];

      const filteredTopics = topicList.filter(topic =>
        topic.class_id == searchForm.class_id &&
        topic.section_id == searchForm.section_id &&
        topic.subject_id == searchForm.subject_id
      );

      const syllabus = filteredTopics.map((topic, index) => ({
        id: topic.id,
        title: topic.name,
        type: 'lesson',
        items: [{
          id: topic.id,
          title: topic.name,
          type: 'topic',
          number: `${index + 1}`,
          checked: topic.status === 'completed',
          completion_date: topic.completion_date || null,
          showDatePicker: false,
          tempDate: ''
        }]
      }));

      setSyllabusData(syllabus);

      const classObj = dropdownData.classes.find(c => c.id == searchForm.class_id);
      const sectionObj = dropdownData.sections.find(s => s.id == searchForm.section_id);
      const subjectGroupObj = dropdownData.subjectGroups.find(sg => sg.id == searchForm.subject_group_id);
      const subjectObj = dropdownData.subjects.find(s => s.id == searchForm.subject_id);
      const sessionObj = dropdownData.sessions.find(s => s.id == searchForm.session_id);

      setCurrentSession({
        class: classObj?.class || '',
        section: sectionObj?.section || '',
        subject_group: subjectGroupObj?.name || '',
        subject: subjectObj?.name || '',
        session: sessionObj?.session || `Session ${sessionObj?.id || ''}`
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { class_id, section_id, subject_group_id, subject_id, topic } = subjectForm;
      if (!class_id || !section_id || !subject_group_id || !subject_id || !topic) {
        throw new Error('All fields are required');
      }

      const session_id = dropdownData.sessions[0]?.id;
      if (!session_id) throw new Error('Session not found');

      await axios.post('/api/manage-syllabus-status', {
        class_id,
        section_id,
        subject_group_id,
        subject_id,
        session_id,
        name: topic
      });

      await handleSearch(e);

      setSubjectForm({
        class_id: '',
        section_id: '',
        subject_group_id: '',
        subject_id: '',
        topic: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const showDatePicker = (topicId) => {
    setSyllabusData(prevData => 
      prevData.map(lesson => ({
        ...lesson,
        items: lesson.items.map(item => 
          item.id === topicId 
            ? { ...item, showDatePicker: true, tempDate: item.completion_date || '' }
            : { ...item, showDatePicker: false }
        )
      }))
    );
  };

  const handleDateChange = (topicId, date) => {
    setSyllabusData(prevData => 
      prevData.map(lesson => ({
        ...lesson,
        items: lesson.items.map(item => 
          item.id === topicId 
            ? { ...item, tempDate: date }
            : item
        )
      }))
    );
  };

  const handleDateBlur = async (topicId) => {
    try {
      const topicToUpdate = syllabusData.flatMap(lesson => lesson.items).find(item => item.id === topicId);
      if (!topicToUpdate) throw new Error('Topic not found');

      const newCompletionDate = topicToUpdate.tempDate || null;

      await axios.put('/api/manage-syllabus-status', {
        id: topicId,
        name: topicToUpdate.title,
        class_id: searchForm.class_id,
        section_id: searchForm.section_id,
        subject_group_id: searchForm.subject_group_id,
        subject_id: searchForm.subject_id,
        session_id: searchForm.session_id,
        completion_date: newCompletionDate
      });

      setSyllabusData(prevData => 
        prevData.map(lesson => ({
          ...lesson,
          items: lesson.items.map(item => {
            if (item.id === topicId) {
              return { 
                ...item, 
                completion_date: newCompletionDate,
                showDatePicker: false,
                tempDate: null
              };
            }
            return item;
          })
        }))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTopicStatus = async (topicId, isChecked) => {
    try {
      const topicToUpdate = syllabusData.flatMap(lesson => lesson.items).find(item => item.id === topicId);
      if (!topicToUpdate) throw new Error('Topic not found');

      const completionDate = isChecked ? (topicToUpdate.completion_date || new Date().toISOString().split('T')[0]) : null;

      await axios.put('/api/manage-syllabus-status', {
        id: topicId,
        name: topicToUpdate.title,
        class_id: searchForm.class_id,
        section_id: searchForm.section_id,
        subject_group_id: searchForm.subject_group_id,
        subject_id: searchForm.subject_id,
        session_id: searchForm.session_id,
        status: isChecked ? 'completed' : 'incomplete',
        completion_date: completionDate
      });

      setSyllabusData(prev =>
        prev.map(lesson => ({
          ...lesson,
          items: lesson.items.map(item =>
            item.id === topicId 
              ? { 
                  ...item, 
                  checked: isChecked,
                  completion_date: completionDate,
                  showDatePicker: false
                } 
              : item
          )
        }))
      );

      if (isChecked && !topicToUpdate.completion_date) {
        showDatePicker(topicId);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="p-6">Loading data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ width:"110%",position:"relative",right:"45px"}}>
      {/* Search Form */}
      <div className="bg-white p-4 rounded shadow mb-6"  >
        <h1 className="text-xl font-bold mb-4">Search Syllabus</h1>
        <form onSubmit={handleSearch} >
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Class', name: 'class_id', options: dropdownData.classes, key: 'class' },
              { label: 'Section', name: 'section_id', options: dropdownData.sections, key: 'section' },
              { label: 'Subject Group', name: 'subject_group_id', options: dropdownData.subjectGroups, key: 'name' },
              { label: 'Subject', name: 'subject_id', options: dropdownData.subjects, key: 'name' }
            ].map(({ label, name, options, key }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <select
                  name={name}
                  value={searchForm[name]}
                  onChange={handleSearchChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select {label}</option>
                  {(options || []).map(option => (
                    <option key={option.id} value={option.id}>
                      {option[key]}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button type="submit" >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Syllabus & Add Topic */}
      {hasSearched && (
        <div className="flex gap-6">
          {/* Syllabus Status */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  Syllabus Status For: {currentSession?.subject || 'Selected Subject'}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="ri-download-2-line text-xl"></i>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="ri-printer-line text-xl"></i>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-600">
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Lesson Topic</th>
                      <th className="py-2 px-2">Topic Completion Date</th>
                      <th className="py-2 px-2">Status</th>
                      <th className="py-2 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syllabusData.length > 0 ? (
                      syllabusData.map((lesson, lessonIndex) => (
                        <React.Fragment key={lesson.id}>
                          <tr className="font-semibold text-black border-b">
                            <td className="py-2 px-2">{lessonIndex + 1}</td>
                            <td className="py-2 px-2" colSpan="4">{lesson.title}</td>
                          </tr>
                          {lesson.items.map((item, topicIndex) => (
                            <tr key={item.id} className="text-gray-700 border-b">
                              <td className="py-2 px-2"></td>
                              <td className="py-2 px-2 pl-6">
                                {lessonIndex + 1}.{topicIndex + 1} {item.title}
                              </td>
                              <td className="py-2 px-2">
                                {item.completion_date ? (
                                  <span>{item.completion_date}</span>
                                ) : (
                                  item.showDatePicker ? (
                                    <input
                                      type="date"
                                      className="border rounded px-2 py-1 text-sm"
                                      value={item.tempDate || ''}
                                      onChange={(e) => handleDateChange(item.id, e.target.value)}
                                      onBlur={() => handleDateBlur(item.id)}
                                      autoFocus
                                    />
                                  ) : null
                                )}
                              </td>
                              <td className="py-2 px-2">
                                <span
                                  className={`text-xs font-medium px-2 py-1 rounded ${
                                    item.checked
                                      ? 'bg-black text-white'
                                      : 'bg-gray-200 text-gray-600'
                                  }`}
                                >
                                  {item.checked ? 'Completed' : 'Incomplete'}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-2">
                                  <label className="inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={item.checked}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        toggleTopicStatus(item.id, isChecked);
                                      }}
                                    />
                                    <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                                      item.checked ? 'bg-green-500' : ''
                                    }`}>
                                      <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                                          item.checked ? 'translate-x-5' : ''
                                        }`}
                                      ></div>
                                    </div>
                                  </label>
                                  {item.checked && (
                                    <button 
                                      className="text-blue-500 hover:text-blue-700 text-sm"
                                      onClick={() => showDatePicker(item.id)}
                                    >
                                      <i className="ri-calendar-line"></i>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No topics found for selected criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SyllabusManager() {
  const router = useRouter();

  const [searchForm, setSearchForm] = useState({
    session_id: '',
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: ''
  });

  const [dropdownData, setDropdownData] = useState({
    sessions: [],
    classes: [],
    sections: [],
    subjectGroups: [],
    subjects: [],
    topicList: []
  });

  const [syllabusData, setSyllabusData] = useState([null]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  // const [selectedTopic, setSelectedTopic] = useState([null]);
  const [selectedTopic, setSelectedTopic] = useState('');



  const [formData, setFormData] = useState({
    class_id: '',
    section_id: '',
    subject_group_id: '',
    subject_id: ''
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const res = await axios.get('/api/manage-log-lesson-plan');
        const { sessions, classes, sections, subjectGroups, subjects, topicList } = res.data;
        setDropdownData({ sessions, classes, sections, subjectGroups, subjects, topicList });

        if (sessions?.length > 0) {
          setSearchForm(prev => ({ ...prev, session_id: sessions[0].id.toString() }));
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setHasSearched(true);

      const res = await axios.get('/api/manage-log-lesson-plan');
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
          number: index + 1,

          checked: false
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
        session: sessionObj?.session ? sessionObj.session : `Session ${sessionObj?.id || ''}`

      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    // सभी फ़ील्ड्स की जाँच
    if (!formData.class_id ||
      !formData.section_id ||
      !formData.subject_group_id ||
      !formData.subject_id ||
      !selectedTopic) {
      alert('कृपया सभी फ़ील्ड भरें और एक टॉपिक चुनें');
      return;
    }

    try {
      // API को भेजे जाने वाला डेटा
      const payload = {
        ...formData,
        session_id: searchForm.session_id, // सर्च फॉर्म से session_id लें
        name: selectedTopic // चुने गए टॉपिक का नाम
      };

      const response = await axios.post('/api/manage-log-lesson-plan', payload);

      if (response.status === 201) {
        router.push('/lesson-plan/lesson');
        alert('data have succefullfully inserted');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'एरर आई है');
    }
  };

  const toggleTopicStatus = async (topicId, isChecked) => {
    try {
      const topicToUpdate = syllabusData.flatMap(lesson => lesson.items).find(item => item.id === topicId);
      if (!topicToUpdate) throw new Error('Topic not found');

      await axios.put('/api/manage-log-lesson-plan', {
        id: topicId,
        name: topicToUpdate.title,
        class_id: searchForm.class_id,
        section_id: searchForm.section_id,
        subject_group_id: searchForm.subject_group_id,
        subject_id: searchForm.subject_id,
        session_id: searchForm.session_id
      });

      setSyllabusData(prev =>
        prev.map(lesson => ({
          ...lesson,
          items: lesson.items.map(item =>
            item.id === topicId ? { ...item, checked: isChecked } : item
          )
        }))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="p-6">Loading data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ width: "108%", position: "relative", right: "40px" }}>
      {/* Search Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h1 className="text-xl font-bold mb-4">Search Syllabus</h1>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-5 gap-4">
            {[{ label: 'Session', name: 'session_id', options: dropdownData.sessions, key: 'session' },
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
                    <option key={option.id} value={option.id}>{option[key]}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className=""
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Syllabus Display */}
      {hasSearched && (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Syllabus Status - Left Panel */}
          <div className="md:w-2/3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Syllabus Status {currentSession?.subject}</h2>
            {syllabusData.length === 0 ? (
              <p>No topics found for the selected criteria.</p>
            ) : (
              <div className="space-y-4">
        {syllabusData.map((lesson) => (
  <div key={lesson.id} className="border-b pb-4 last:border-b-0">
    <h3 className="font-semibold text-blue-700 mb-2">{lesson.title}</h3>
    <div className="space-y-2 pl-4">
      {lesson.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4"
            checked={selectedTopic.includes(item.title)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedTopic(...selectedTopic, item.title);
              } else {
                setSelectedTopic(selectedTopic.filter(name => name !== item.title));
              }
            }}
            value={item.name}
          />
          <label className="text-sm">{item.title}</label>
        </div>
      ))}
    </div>
  </div>
))}
              </div>
            )}
          </div>




          {/* Add Topic - Right Panel */}
          <div className="md:w-1/3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Add Topic</h2>

            {/* Dropdowns */}
            <div className="mb-4 space-y-3">
              <div>
                <label className="block text-sm font-medium">Class *</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.class_id}
                  onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                >
                  <option value="">Select Class</option>
                  {dropdownData.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.class}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Section *</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.section_id}
                  onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                >
                  <option value="">Select Section</option>
                  {dropdownData.sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>{sec.section}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Subject Group *</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.subject_group_id}
                  onChange={(e) => setFormData({ ...formData, subject_group_id: e.target.value })}
                >
                  <option value="">Select Group</option>
                  {dropdownData.subjectGroups.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Subject *</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {dropdownData.subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
            </div>

         

            {/* Submit Button */}
            <button
              className=""
              onClick={handleAdd}
            >
              Save & Go to Add Lesson Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState } from 'react';

const QuestionBankPage = () => {
  // Dummy data
  const initialTags = [
    { id: 1, name: 'Science' },
    { id: 2, name: 'Economy' },
    { id: 3, name: 'Web Design' },
    { id: 4, name: 'Communication Skills' },
    { id: 5, name: 'Programming' },
    { id: 6, name: 'English' },
    { id: 7, name: 'Hindi' },
    { id: 8, name: 'Mathematics' },
    { id: 9, name: 'Health And life' },
    { id: 10, name: 'Drawing' }
  ];

  const initialQuestions = [
    { id: 24, tag: 'Drawing', type: 'Descriptive', level: 'High', question: 'Explain Madhubani Art form', createdBy: 'Joe Black (9000)' },
    { id: 23, tag: 'Drawing', type: 'Single Choice', level: 'Medium', question: 'The main element used in still life painting', createdBy: 'Joe Black (9000)' },
    { id: 22, tag: 'Drawing', type: 'Single Choice', level: 'Medium', question: 'Colour mixed with oil called?', createdBy: 'Joe Black (9000)' },
    { id: 21, tag: 'Drawing', type: 'Single Choice', level: 'Low', question: 'Shortest distance between two points Called', createdBy: 'Joe Black (9000)' },
    { id: 20, tag: 'Health And life', type: 'Single Choice', level: 'Medium', question: 'Which practices are beneficial for hypertension and cardiac problems?', createdBy: 'Joe Black (9000)' },
    { id: 19, tag: 'Health And life', type: 'Single Choice', level: 'Medium', question: 'What are the five elements in yoga?', createdBy: 'Joe Black (9000)' },
    { id: 18, tag: 'Health And life', type: 'Single Choice', level: 'Medium', question: 'Which Endocrine gland is the Master gland in our body?', createdBy: 'Joe Black (9000)' },
    { id: 17, tag: 'Health And life', type: 'Single Choice', level: 'Low', question: 'What is the theme of International Day of Yoga 2020?', createdBy: 'Joe Black (9000)' },
    { id: 16, tag: 'Communication Skills', type: 'Single Choice', level: 'Medium', question: 'Types of words used for verbal communication?', createdBy: 'Joe Black (9000)' },
    { id: 15, tag: 'Communication Skills', type: 'Single Choice', level: 'Medium', question: 'The origin of the word communication is ______', createdBy: 'Joe Black (9000)' }
  ];

  // State management
  const [tags, setTags] = useState(initialTags);
  const [questions, setQuestions] = useState(initialQuestions);
  const [view, setView] = useState('questionBank');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCreatedBy, setSelectedCreatedBy] = useState('');
  const [newTag, setNewTag] = useState({ name: '' });
  const [editTag, setEditTag] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    tag: '',
    type: '',
    level: '',
    question: '',
    createdBy: 'John'
  });
  const [showResults, setShowResults] = useState(false);

  // Filter questions based on search criteria
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? question.tag === selectedTag : true;
    const matchesType = selectedType ? question.type === selectedType : true;
    const matchesLevel = selectedLevel ? question.level === selectedLevel : true;
    const matchesCreatedBy = selectedCreatedBy ? question.createdBy === selectedCreatedBy : true;
    
    return matchesSearch && matchesTag && matchesType && matchesLevel && matchesCreatedBy;
  });

  // CRUD operations for Tags
  const addTag = () => {
    if (editTag) {
      const updatedTags = tags.map(tag =>
        tag.id === editTag.id ? { ...tag, name: newTag.name } : tag
      );
      setTags(updatedTags);
    } else {
      const tag = {
        id: tags.length + 1,
        name: newTag.name
      };
      setTags([...tags, tag]);
    }
    setNewTag({ name: '' });
    setEditTag(null);
  };

  const deleteTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const editTagHandler = (tag) => {
    setEditTag(tag);
    setNewTag({ name: tag.name });
  };

  // CRUD operations for Questions
  const addQuestion = () => {
    const question = {
      id: questions.length + 1,
      tag: newQuestion.tag,
      type: newQuestion.type,
      level: newQuestion.level,
      question: newQuestion.question,
      createdBy: newQuestion.createdBy
    };
    setQuestions([...questions, question]);
    setNewQuestion({
      tag: '',
      type: '',
      level: '',
      question: '',
      createdBy: 'John'
    });
    setView('questionBank');
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const bulkDeleteQuestions = () => {
    setQuestions([]);
    setShowResults(false);
  };

  const importQuestions = () => {
    // In a real app, this would import from a file
    // For demo, we'll just add some dummy questions
    const importedQuestions = [
      { id: questions.length + 1, tag: 'Science', type: 'Multiple Choice', level: 'Medium', question: 'What is the chemical symbol for gold?', createdBy: 'John' },
      { id: questions.length + 2, tag: 'Mathematics', type: 'Single Choice', level: 'High', question: 'What is the value of π (pi) to two decimal places?', createdBy: 'John' }
    ];
    setQuestions([...questions, ...importedQuestions]);
    alert(`Imported ${importedQuestions.length} questions successfully!`);
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  // Render different views
  const renderView = () => {
    switch (view) {
      case 'questionBank':
        return renderQuestionBank();
      case 'addTag':
        return renderAddTag();
      case 'addQuestion':
        return renderAddQuestion();
      case 'viewQuestion':
        return renderViewQuestion();
      default:
        return renderQuestionBank();
    }
  };

  // Render Question Bank view
  const renderQuestionBank = () => (
    <div className="question-bank-container">
      <h1>Question Bank</h1>
      
      <div className="select-criteria">
        <h2>Select Criteria</h2>
        <div className="criteria-filters">
          <div className="filter-group">
            <label>Question Tag:</label>
            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
              <option value="">Select</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.name}>{tag.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Question Type:</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Select</option>
              <option value="Single Choice">Single Choice</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Descriptive">Descriptive</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Question Level:</label>
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Created By:</label>
            <select value={selectedCreatedBy} onChange={(e) => setSelectedCreatedBy(e.target.value)}>
              <option value="">Select</option>
              <option value="Joe Black (9000)">Joe Black (9000)</option>
              <option value="John">John</option>
            </select>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="action-buttons">
        <button className="add-button" onClick={() => setView('addTag')}>
          Add Tag
        </button>
        <button className="add-button" onClick={() => setView('addQuestion')}>
          Add Question
        </button>
        <button className="import-button" onClick={importQuestions}>
          Import
        </button>
        <button className="delete-button" onClick={bulkDeleteQuestions}>
          Bulk Delete
        </button>
      </div>

      {showResults && (
        <>
          <table className="question-table">
            <thead>
              <tr>
                <th>Q_ID</th>
                <th>Question Tag</th>
                <th>Question Type</th>
                <th>Level</th>
                <th>Question</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map(question => (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>{question.tag}</td>
                  <td>{question.type}</td>
                  <td>{question.level}</td>
                  <td>{question.question}</td>
                  <td>{question.createdBy}</td>
                  <td>
                    <button 
                      className="view-button"
                      onClick={() => {
                        setSelectedQuestion(question);
                        setView('viewQuestion');
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="edit-button"
                      onClick={() => {
                        setNewQuestion({
                          tag: question.tag,
                          type: question.type,
                          level: question.level,
                          question: question.question,
                          createdBy: question.createdBy
                        });
                        setView('addQuestion');
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => deleteQuestion(question.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="record-count">
            Records: 1 to {filteredQuestions.length} of {filteredQuestions.length}
          </div>
        </>
      )}
    </div>
  );

  // Render Add Tag view
  const renderAddTag = () => (
    <div className="add-tag-container">
     
      <div className="form-container">
      <h1 style={{fontSize:'20px'}}>Add Tag</h1>
      <br />
        <form onSubmit={(e) => { e.preventDefault(); addTag(); }}>
          <div className="form-group">
            <label>Tag Name:</label>
            <input
              type="text"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editTag ? 'Update' : 'Save'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => {
                setNewTag({ name: '' });
                setEditTag(null);
                setView('questionBank');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="tag-list">
        <h2>Tag List</h2>
        <table className="tag-table">
          <thead>
            <tr>
              <th>Tag ID</th>
              <th>Tag Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>
                  <button 
                    className="edit-button"
                    onClick={() => editTagHandler(tag)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => deleteTag(tag.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="record-count">
          Records: 1 to {tags.length} of {tags.length}
        </div>
      </div>
    </div>
  );

  // Render Add Question view
  const renderAddQuestion = () => (
    <div className="add-question-container">
      <h1>Question Tag</h1>
      <form onSubmit={(e) => { e.preventDefault(); addQuestion(); }}>
        <div className="form-row">
          <div className="form-group">
            <label>Question Type*</label>
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
              required
            >
              <option value="">Select</option>
              <option value="Single Choice">Single Choice</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Descriptive">Descriptive</option>
            </select>
          </div>
          <div className="form-group">
            <label>Question Level*</label>
            <select
              value={newQuestion.level}
              onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })}
              required
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Question Tag*</label>
          <select
            value={newQuestion.tag}
            onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
            required
          >
            <option value="">Select</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Question*</label>
          <textarea
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            value={newQuestion.createdBy}
            onChange={(e) => setNewQuestion({ ...newQuestion, createdBy: e.target.value })}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => setView('questionBank')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  // Render View Question view
  const renderViewQuestion = () => (
    <div className="view-question-container">
      <h1>Question Bank</h1>
      {selectedQuestion && (
        <>
          <div className="question-info">
            <div><strong>Level:</strong> {selectedQuestion.level}</div>
            <div><strong>Question Type:</strong> {selectedQuestion.type}</div>
          </div>
          <div className="question-text">
            <strong>Question:</strong> {selectedQuestion.question}
          </div>
          <button 
            className="back-button"
            onClick={() => setView('questionBank')}
          >
            Back to Question Bank
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="main-container">
      {renderView()}
    </div>
  );
};

// CSS styles
const styles = `
  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  /* Common styles */
  .action-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .add-button, .import-button, .delete-button, .submit-button, .cancel-button, 
  .view-button, .edit-button, .back-button, .search-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-button, .submit-button {
    background-color: #4CAF50;
    color: white;
  }

  .import-button {
    background-color: #2196F3;
    color: white;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  .cancel-button, .back-button {
    background-color: #f0f0f0;
  }

  .view-button {
    background-color: #FF9800;
    color: white;
  }

  .edit-button {
    background-color: #2196F3;
    color: white;
  }

  .search-button {
    background-color: #607d8b;
    color: white;
    margin-left: 10px;
  }

  .search-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .search-bar input {
    width: 100%;
    max-width: 400px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .record-count {
    color: #777;
    font-size: 14px;
  }

  /* Question Bank styles */
  .question-bank-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .select-criteria {
    margin-bottom: 20px;
  }

  .criteria-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }

  .filter-group {
    flex: 1;
    min-width: 200px;
  }

  .filter-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .filter-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  /* Add Tag styles */
  .add-tag-container {
    display: flex;
    gap: 30px;
  }

  .form-container {
    flex: 1;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tag-list {
    flex: 2;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .form-group textarea {
    min-height: 100px;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  /* Add Question styles */
  .add-question-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-row {
    display: flex;
    gap: 20px;
  }

  .form-row .form-group {
    flex: 1;
  }

  /* View Question styles */
  .view-question-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .question-info {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .question-text {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default QuestionBankPage;
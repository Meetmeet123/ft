"use client";
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';

export default function EventManager() {
  // State for events and form
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventStart: format(new Date(), 'yyyy-MM-dd'),
    eventEnd: format(new Date(), 'yyyy-MM-dd'),
    venue: '',
    description: '',
    
    sidebar: false,
    featuredImage: null,
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    smsNotification: false,
   
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data matching your table screenshot
  useEffect(() => {
    const dummyEvents = [
      {
        id: 1,
        title: "Summer School Programme",
        eventStart: "2025-05-01",
        eventEnd: "2025-05-30",
        venue: "School Hall Room",
        description: "Summer learning activities for all grades",
       
      },
      {
        id: 2,
        title: "Books Mela",
        eventStart: "2025-04-04",
        eventEnd: "2025-04-30",
        venue: "School Play Ground",
        description: "Annual book fair event",
      
      },
      {
        id: 3,
        title: "Building Leadership Skills camp",
        eventStart: "2025-04-02",
        eventEnd: "2025-04-30",
        venue: "School Hall Room",
        description: "Leadership development program",
    
      },
      {
        id: 4,
        title: "Summer Learning: Activities",
        eventStart: "2025-04-01",
        eventEnd: "2025-04-30",
        venue: "School Hall Room",
        description: "Summer educational activities",
 
      },
      {
        id: 5,
        title: "Mathematics competitions",
        eventStart: "2025-03-01",
        eventEnd: "2025-03-31",
        venue: "School Hall Room",
        description: "Math competition for all grades",
        
      },
      {
        id: 6,
        title: "Science Exhibition Program",
        eventStart: "2025-02-01",
        eventEnd: "2025-02-28",
        venue: "School Exhibition Room",
        description: "Annual science fair",
      
      },
      {
        id: 7,
        title: "Sports Camp",
        eventStart: "2025-01-03",
        eventEnd: "2025-01-30",
        venue: "School Play Ground",
        description: "Sports training camp",
      
      },
      {
        id: 8,
        title: "Mid Sem Exam Preparation",
        eventStart: "2024-12-02",
        eventEnd: "2024-12-16",
        venue: "Exam Hall Room",
        description: "Mid semester exam preparation classes",
       
      },
      {
        id: 9,
        title: "Sports Games",
        eventStart: "2024-12-16",
        eventEnd: "2024-12-26",
        venue: "School PayGround",
       
      },
      {
        id: 10,
        title: "NURSERY - My Shapes Rocket Extra Activities",
        eventStart: "2024-11-18",
        eventEnd: "2024-11-22",
        venue: "School hall",
        description: "Special activities for nursery students",
     
      },
      {
        id: 11,
        title: "Children's Day Celebrations",
        eventStart: "2024-11-12",
        eventEnd: "2024-11-14",
        venue: "School Hall Room",
        description: "Annual children's day celebration",
     
      },
      {
        id: 12,
        title: "Mahatma Gandhi Jayanti celebration",
        eventStart: "2024-10-01",
        eventEnd: "2024-10-02",
        venue: "School hall Room",
        description: "Gandhi Jayanti celebrations",
     
      }
    ];
    setEvents(dummyEvents);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      featuredImage: e.target.files[0]
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...formData, id: editingEvent.id } : event
      ));
    } else {
      // Add new event
      const newEvent = {
        id: events.length + 1,
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      eventStart: format(new Date(), 'yyyy-MM-dd'),
      eventEnd: format(new Date(), 'yyyy-MM-dd'),
      venue: '',
      description: '',
    
      sidebar: false,
      featuredImage: null,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: '',
      smsNotification: false,
     
    });
    setEditingEvent(null);
  };

  // Edit event
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      eventStart: event.eventStart,
      eventEnd: event.eventEnd,
      venue: event.venue,
      description: event.description,
      
      sidebar: event.sidebar || false,
      featuredImage: event.featuredImage || null,
      metaTitle: event.metaTitle || '',
      metaKeywords: event.metaKeywords || '',
      metaDescription: event.metaDescription || '',
      smsNotification: event.smsNotification || false,
    
    });
    setShowForm(true);
  };

  // Delete event
  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Event List</h1>

      {/* Search and Add button at the top */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-black py-2 px-4 rounded"
        >
          Add New Event
        </button>
      </div>

      {!showForm ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map(event => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(parseISO(event.eventStart), 'MM/dd/yyyy')} - {format(parseISO(event.eventEnd), 'MM/dd/yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.venue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {/* <span className="text-green-500 mr-2">✅</span> */}
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >                              <FiEdit2 size={16} />

                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                                                      <FiX size={16} />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Add/Edit Event Form */
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Date Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Start*</label>
                <input
                  type="date"
                  name="eventStart"
                  value={formData.eventStart}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event End*</label>
                <input
                  type="date"
                  name="eventEnd"
                  value={formData.eventEnd}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            {/* Venue Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Venue*</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

       
            

            {/* Sidebar Setting Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Sidebar Setting</h3>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="sidebar"
                  checked={formData.sidebar}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>Sidebar</label>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                  <p>Please Select Image</p>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="featuredImage"
                  />
                  <label 
                    htmlFor="featuredImage" 
                    className="inline-block mt-2 px-4 py-2 bg-gray-100 rounded cursor-pointer"
                  >
                    Add Media
                  </label>
                </div>
              </div>
            </div>

          

            {/* SEO Detail Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">SEO Detail</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Keyword</label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-500 text-black rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-black rounded"
              >
                {editingEvent ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
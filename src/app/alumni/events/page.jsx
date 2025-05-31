"use client";
import React ,{ useState, useEffect } from 'react';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventFor: 'All',
    fromDate: format(new Date(), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd'),
    note: '',
    notification: { email: false, sms: false },
    templateId: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEvent, setViewingEvent] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Dummy data
  useEffect(() => {
    const dummyEvents = [
      {
        id: 1,
        title: 'Academic admission start (2025-26)',
        eventFor: 'All',
        fromDate: '2025-04-01',
        toDate: '2025-04-15',
        note: 'NEW ADMISSIONS FOR THE NEXT SESSION 2024-2025 ARE OPEN FROM CLASSES NURSERY TO CLASS-VIII FROM 1ST APRIL 2024.',
        notification: { email: true, sms: false },
        templateId: ''
      },
      {
        id: 2,
        title: 'Celebration Holiday',
        eventFor: 'All',
        fromDate: '2024-10-25',
        toDate: '2024-10-31',
        note: 'Annual celebration holiday',
        notification: { email: true, sms: true },
        templateId: 'TMP12345'
      },
      {
        id: 3,
        title: 'scholarship exam, 2024',
        eventFor: 'Government',
        fromDate: '2024-10-14',
        toDate: '2024-10-20',
        note: 'National scholarship examination',
        notification: { email: false, sms: true },
        templateId: 'TMP67890'
      },
      {
        id: 4,
        title: 'Dussehra',
        eventFor: 'All',
        fromDate: '2024-10-09',
        toDate: '2024-10-10',
        note: 'Dussehra festival celebration',
        notification: { email: true, sms: false },
        templateId: ''
      }
    ];
    setEvents(dummyEvents);
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Adjust the calendar to show days from previous/next month to fill the grid
  const startDay = monthStart.getDay();
  const endDay = monthEnd.getDay();
  const daysFromPrevMonth = startDay === 0 ? 6 : startDay - 1;
  const daysFromNextMonth = endDay === 0 ? 0 : 7 - endDay;

  const calendarDays = [
    ...Array.from({ length: daysFromPrevMonth }, (_, i) => {
      const date = new Date(monthStart);
      date.setDate(-daysFromPrevMonth + i + 1);
      return date;
    }),
    ...monthDays,
    ...Array.from({ length: daysFromNextMonth }, (_, i) => {
      const date = new Date(monthEnd);
      date.setDate(i + 1);
      return date;
    })
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        notification: {
          ...formData.notification,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...formData, id: editingEvent.id } : event
      ));
      setEditingEvent(null);
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

  const resetForm = () => {
    setFormData({
      title: '',
      eventFor: 'All',
      fromDate: format(new Date(), 'yyyy-MM-dd'),
      toDate: format(new Date(), 'yyyy-MM-dd'),
      note: '',
      notification: { email: false, sms: false },
      templateId: ''
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      eventFor: event.eventFor,
      fromDate: event.fromDate,
      toDate: event.toDate,
      note: event.note || '',
      notification: event.notification || { email: false, sms: false },
      templateId: event.templateId || ''
    });
    setShowForm(true);
  };

  const handleView = (event) => {
    setViewingEvent(event);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">November 2023</h1> */}

      {/* View Event Modal */}
      {showViewModal && viewingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Event Description</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold">New {viewingEvent.title}</h3>
              <p className="text-sm text-gray-600">
                © {format(parseISO(viewingEvent.fromDate), 'MM/dd/yyyy')} - {format(parseISO(viewingEvent.toDate), 'MM/dd/yyyy')}
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Note</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {viewingEvent.note}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Event Notification Message</h4>
              <div className="flex gap-4">
                <span className={`px-2 py-1 rounded ${viewingEvent.notification?.email ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  Email: {viewingEvent.notification?.email ? 'Yes' : 'No'}
                </span>
                <span className={`px-2 py-1 rounded ${viewingEvent.notification?.sms ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  SMS: {viewingEvent.notification?.sms ? 'Yes' : 'No'}
                </span>
              </div>
              {viewingEvent.notification?.sms && viewingEvent.templateId && (
                <p className="mt-2 text-sm">
                  Template ID: {viewingEvent.templateId}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-blue-500 text-black rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Section - Narrower */}
        <div className="lg:w-2/5">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="px-4 py-2 bg-gray-200 rounded">
                Previous
              </button>
              <h2 className="text-xl font-semibold">
                {format(currentMonth, 'MMMM yyyy')}undefined
              </h2>
              <button onClick={nextMonth} className="px-4 py-2 bg-gray-200 rounded">
                Next
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center font-semibold py-2">
                  {day}
                </div>
              ))}

              {calendarDays.map((day, i) => {
                const dayEvents = events.filter(event => {
                  const eventStart = parseISO(event.fromDate);
                  const eventEnd = parseISO(event.toDate);
                  return (day >= eventStart && day <= eventEnd);
                });

                return (
                  <div
                    key={i}
                    className={`min-h-24 p-1 border ${!isSameMonth(day, currentMonth) ? 'bg-gray-100 text-gray-400' : 'bg-white'} ${isSameDay(day, new Date()) ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                  >
                    <div className="text-right">{format(day, 'd')}</div>
                    <div className="overflow-y-auto max-h-20">
                      {dayEvents.map(event => (
                        <div key={event.id} className="text-xs p-1 mb-1 bg-blue-100 rounded truncate">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Events Section - Wider with Table */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Event List</h2>
            
            <div className="mb-4 flex justify-between items-center">
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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Section</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Out Session</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From ▼ To ▼</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.eventFor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(parseISO(event.fromDate), 'MM/dd/yyyy')} - {format(parseISO(event.toDate), 'MM/dd/yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleView(event)}
                              className="text-xs bg-green-500 text-black px-2 py-1 rounded"
                            >
                             <FiMenu size={20} />
                            </button>
                            <button
                              onClick={() => handleEdit(event)}
                              className="text-xs bg-yellow-500 text-black px-2 py-1 rounded"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="text-xs bg-red-500 text-black px-2 py-1 rounded"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-sm text-gray-500">
                  Records: 1 to {filteredEvents.length} of {filteredEvents.length}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {editingEvent ? 'Edit Event' : 'Add Event'}
                </h3>

                <div>
                  <label className="block text-sm font-medium">Event For*</label>
                  <select
                    name="eventFor"
                    value={formData.eventFor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="All">All</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Class">Class</option>
                    <option value="Government">Government</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Event Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Event From Date*</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Event To Date*</label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Photo (100px X 100px)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    <p>Drag and drop a file here or click</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Note</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Event Notification Message</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="email"
                        checked={formData.notification.email}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sms"
                        checked={formData.notification.sms}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      SMS
                    </label>
                  </div>
                </div>

                {formData.notification.sms && (
                  <div>
                    <label className="block text-sm font-medium">
                      Template ID (This field is required Only For Indian SMS Gateway)
                    </label>
                    <input
                      type="text"
                      name="templateId"
                      value={formData.templateId}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-black py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-500 text-black py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
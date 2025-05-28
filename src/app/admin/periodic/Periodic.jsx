import { useState } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025
  const [view, setView] = useState('month'); // 'month', 'week', or 'day'

  // Get current month details
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

    // Get days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: startingDayOfWeek }, (_, i) => ({
      date: new Date(year, month - 1, prevMonthLastDay - startingDayOfWeek + i + 1),
      isPrevMonth: true
    }));

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(year, month, i + 1),
      isCurrentMonth: true
    }));

    // Calculate how many days needed from next month
    const totalDaysDisplayed = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    const nextMonthDays = Array.from(
      { length: totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => ({
        date: new Date(year, month + 1, i + 1),
        isNextMonth: true
      })
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Generate days for the current week
  const getWeekDays = () => {
    const days = [];
    const startDate = new Date(currentDate);

    // Adjust to start from Monday if not already
    const dayOfWeek = startDate.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days, otherwise adjust to Monday
    startDate.setDate(startDate.getDate() + diff);

    // Create 7 days starting from Monday
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  // Format date to display month and year for month view
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Format date for day view header display
  const formatDayDate = () => {
    return currentDate.toLocaleString('default', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format date range for week view header display
  const formatDateRange = () => {
    const weekDays = getWeekDays();
    const startDay = weekDays[0];
    const endDay = weekDays[6];

    const startMonth = startDay.toLocaleString('default', { month: 'short' });
    const endMonth = endDay.toLocaleString('default', { month: 'short' });

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay.getDate()} – ${endDay.getDate()} ${endDay.getFullYear()}`;
    } else {
      return `${startMonth} ${startDay.getDate()} – ${endMonth} ${endDay.getDate()} ${endDay.getFullYear()}`;
    }
  };

  // Navigate to previous period (month, week, or day)
  const prev = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  // Navigate to next period (month, week, or day)
  const next = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date(2025, 4, 1)); // May 2025 for the example
  };

  // Generate time slots for the week/day view
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push({
        hour: i,
        label: i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`
      });
    }
    return slots;
  };

  // Calendar events data
  const events = [
    { id: 1, title: 'Online Course', start: new Date(2025, 3, 28), end: new Date(2025, 4, 1), color: 'bg-red-500' },
    { id: 2, title: 'Weekly Exam Quiz', start: new Date(2025, 3, 28), end: new Date(2025, 4, 1), color: 'bg-green-500' },
    { id: 3, title: 'Student Health Checkup', start: new Date(2025, 4, 1), end: new Date(2025, 4, 1), color: 'bg-black', textColor: 'text-white', time: '12a' },
    { id: 4, title: 'Online Course Campus Programme', start: new Date(2025, 4, 1), end: new Date(2025, 4, 4), color: 'bg-orange-500', time: '16:30a' },
    { id: 5, title: 'Online Course Campus Programme', start: new Date(2025, 4, 5), end: new Date(2025, 4, 8), color: 'bg-orange-500' },
    { id: 6, title: 'Vacation', start: new Date(2025, 4, 10), end: new Date(2025, 4, 18), color: 'bg-green-600', time: '12a' },
    { id: 7, title: 'Staff Meeting', start: new Date(2025, 4, 10), end: new Date(2025, 4, 10), color: 'bg-black', textColor: 'text-white', time: '12a' },
    { id: 8, title: 'Summer Camp', start: new Date(2025, 4, 10), end: new Date(2025, 4, 15), color: 'bg-pink-600', time: '16:30a' },
    { id: 9, title: 'Assign Fees to All Student before 1', start: new Date(2025, 4, 15), end: new Date(2025, 4, 15), color: 'bg-black', textColor: 'text-white', time: '12a' },
    { id: 10, title: 'Teacher Meeting', start: new Date(2025, 4, 19), end: new Date(2025, 4, 19), color: 'bg-black', textColor: 'text-white', time: '12a' },
    { id: 11, title: 'Online Course Test', start: new Date(2025, 4, 21), end: new Date(2025, 4, 25), color: 'bg-red-500', time: '16:30a' },
    { id: 12, title: 'Online Course Test', start: new Date(2025, 4, 26), end: new Date(2025, 4, 31), color: 'bg-red-500' },
  ];

  // Get events for a specific day (month view)
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);

      // Convert to date strings for comparison (ignoring time)
      const eventStartDay = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());
      const eventEndDay = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate());
      const currentDay = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());

      return currentDay >= eventStartDay && currentDay <= eventEndDay;
    });
  };

  // Get events for a specific day in week/day view
  const getWeekViewEventsForDay = (date) => {
    return events.filter(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);

      // Convert to date strings for comparison (ignoring time)
      const eventStartDay = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());
      const eventEndDay = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate());
      const currentDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      return currentDay >= eventStartDay && currentDay <= eventEndDay;
    });
  };

  // Get events for a specific hour on a specific day
  const getEventsForHourAndDay = (date, hour) => {
    const dayEvents = getWeekViewEventsForDay(date);

    return dayEvents.filter(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);
      const eventStartHour = eventStartDate.getHours();
      const eventEndHour = eventEndDate.getHours();

      // Include event if it covers this hour
      // For all-day events or events that span multiple days, we check if they cover the full day
      if (
        (eventStartDate.getDate() !== eventEndDate.getDate()) ||
        (eventStartHour === 0 && eventEndHour === 23)
      ) {
        return true;
      }

      return hour >= eventStartHour && hour <= eventEndHour;
    });
  };

  // Check if an event is an all-day event
  const isAllDayEvent = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    // Check if event spans multiple days
    if (startDate.getDate() !== endDate.getDate() ||
      startDate.getMonth() !== endDate.getMonth() ||
      startDate.getFullYear() !== endDate.getFullYear()) {
      return true;
    }

    // Check if event covers the full day
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    return startHour === 0 && endHour >= 23;
  };

  // Check if a day is today
  const isToday = (date) => {
    const today = new Date(2025, 4, 8); // Assuming today is May 8, 2025 for the example

    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Format day name and date for week view
  const formatDayHeader = (date) => {
    const dayName = date.toLocaleString('default', { weekday: 'short' });
    const dayNumber = date.getDate();
    return { dayName, dayNumber };
  };

  // Get the data for current view
  const days = getMonthData();
  const weekDays = getWeekDays();
  const timeSlots = getTimeSlots();

  // Display only a limited number of events in month view based on available space
  const getVisibleEvents = (events) => {
    const limit = 3;
    const visibleEvents = events.slice(0, limit);
    const hiddenCount = events.length - limit;

    return { visibleEvents, hiddenCount };
  };

  const feesExpenses = [
    {
      "title": "Monthly Fees Collection",
      "expenses": "₹4,29,975.00"
    },
    {
      "title": "Monthly Expenses",
      "expenses": "₹56,35,000.00"
    },
    {
      "title": "Student Count",
      "expenses": "55"
    },
    {
      "title": "Student Head Count",
      "expenses": "55"
    }
  ]

  const workingPersons = [
    { "title": "Admin", "name": "1" },
    { "title": "Teacher", "name": "3" },
    { "title": "Accountant", "name": "1" },
    { "title": "Librarian", "name": "1" },
    { "title": "Receptionist", "name": "1" },
    { "title": "Super Admin", "name": "1" }
  ]
  

  return (
    <div className="lg:flex md:block gap-4 p-4 bg-gray-50">
      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5">
          {feesExpenses.map((item, index) => (
            <div key={index} className="bg-blue-50 flex flex-col p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.expenses}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex space-x-1">
                <button
                  onClick={prev}
                  className="p-1.5 rounded-full hover:bg-blue-100 transition-colors text-blue-700"
                  aria-label="Previous"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="p-1.5 rounded-full hover:bg-blue-100 transition-colors text-blue-700"
                  aria-label="Next"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <button
                onClick={goToToday}
                className="px-3 py-1 border border-blue-300 rounded-full text-sm hover:bg-blue-100 transition-colors text-blue-800"
              >
                Today
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {view === 'month' ? formatMonthYear(currentDate) : view === 'week' ? formatDateRange() : formatDayDate()}
              </h2>
            </div>
            <div className="flex justify-end space-x-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === 'month' ? 'btn-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === 'week' ? 'btn-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === 'day' ? 'btn-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Day
              </button>
            </div>
          </div>

          {/* Calendar Month View */}
          {view === 'month' && (
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-7 border-b text-center bg-gray-50">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div
                    key={day}
                    className="py-2 text-xs sm:text-sm font-medium text-gray-700"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 bg-blue-50 flex-grow">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDay(day);
                  const { visibleEvents, hiddenCount } = getVisibleEvents(dayEvents);

                  return (
                    <div
                      key={index}
                      className={`border-r border-b min-h-16 sm:min-h-24 lg:min-h-32 relative ${day.isCurrentMonth ? '' : 'bg-blue-50'
                        } ${isToday(day.date) ? 'bg-blue-50' : ''}`}
                    >
                      <div className={`text-xs sm:text-sm p-1 sm:p-2 ${day.isCurrentMonth ? (isToday(day.date) ? 'text-blue-800 font-bold' : 'text-gray-700') : 'text-gray-400'
                        }`}>
                        {day.date.getDate()}
                      </div>

                      <div className="px-1 pt-1 space-y-1 overflow-hidden">
                        {visibleEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 truncate rounded ${event.color} ${event.textColor || 'text-white'} transition-all hover:opacity-90`}
                          >
                            {event.time && <span className="font-semibold mr-1">{event.time}</span>}
                            {event.title}
                          </div>
                        ))}
                        {hiddenCount > 0 && (
                          <div className="text-xs font-medium text-gray-700 p-1">
                            + {hiddenCount} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Calendar Week View */}
          {view === 'week' && (
            <div className="flex flex-col h-full overflow-x-auto bg-blue-50">
              {/* Days of Week Header */}
              <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 border-b sticky top-0 bg-white z-10">
                <div className="hidden sm:block py-2 px-2 text-xs text-gray-500 font-medium border-r w-16">
                  All-day
                </div>
                {weekDays.map((day, index) => {
                  const { dayName, dayNumber } = formatDayHeader(day);
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={index}
                      className={`py-2 px-2 text-xs sm:text-sm font-medium border-r text-center ${isCurrentDay ? 'bg-blue-50 text-blue-800' : 'text-gray-700'
                        }`}
                    >
                      <div className="sm:hidden">
                        {dayName} {dayNumber} {index === 0 && "(All Day Events Below)"}
                      </div>
                      <div className="hidden sm:block">
                        {dayName} {dayNumber}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* All-day Events Row - Mobile Version */}
              <div className="sm:hidden">
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = getWeekViewEventsForDay(day).filter(event => isAllDayEvent(event));

                  if (dayEvents.length === 0) return null;

                  return (
                    <div key={`mobile-all-day-${dayIndex}`} className="border-b p-2">
                      <div className="text-xs font-semibold text-gray-700 mb-1">
                        All-day events for {formatDayHeader(day).dayName} {day.getDate()}:
                      </div>
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className={`${event.color} ${event.textColor || 'text-white'} my-1 p-1 text-xs rounded`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* All-day Events Row - Desktop Version */}
              <div className="hidden sm:grid sm:grid-cols-8 border-b">
                <div className="px-2 py-2 text-xs text-gray-500 font-medium border-r">

                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = getWeekViewEventsForDay(day).filter(event => isAllDayEvent(event));

                  return (
                    <div key={dayIndex} className="border-r relative min-h-12 flex flex-col">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`${event.color} ${event.textColor || 'text-white'} m-0.5 p-1 text-xs rounded overflow-hidden flex-grow`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Time Slots and Events */}
              <div className="flex flex-col divide-y overflow-y-auto" style={{ height: '600px' }}>
                {timeSlots.map((slot) => (
                  <div key={slot.hour} className="grid grid-cols-1 sm:grid-cols-8 min-h-16">
                    <div className="px-2 py-1 text-xs text-gray-500 border-r sticky left-0 bg-white font-medium">
                      {slot.label}
                    </div>

                    {/* Mobile Layout - Stack days vertically */}
                    <div className="sm:hidden">
                      {weekDays.map((day, dayIndex) => {
                        const hourEvents = getEventsForHourAndDay(day, slot.hour).filter(event => !isAllDayEvent(event));

                        if (hourEvents.length === 0) return null;

                        return (
                          <div key={`mobile-${dayIndex}`} className="border-t border-gray-200 py-1">
                            <div className="text-xs font-medium text-gray-600 px-2">
                              {formatDayHeader(day).dayName}
                            </div>
                            {hourEvents.map((event) => (
                              <div
                                key={event.id}
                                className={`${event.color} ${event.textColor || 'text-white'} m-1 p-1 text-xs rounded`}
                              >
                                {event.time && <span className="font-semibold mr-1">{event.time}</span>}
                                {event.title}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>

                    {/* Desktop Layout */}
                    {weekDays.map((day, dayIndex) => {
                      const hourEvents = getEventsForHourAndDay(day, slot.hour).filter(event => !isAllDayEvent(event));

                      return (
                        <div
                          key={`desktop-${dayIndex}`}
                          className="hidden sm:block border-r relative h-full hover:bg-gray-50"
                        >
                          {hourEvents.map((event, eventIndex) => {
                            // Only render event at its start hour
                            const eventStartDate = new Date(event.start);
                            const eventHour = eventStartDate.getHours();

                            if (eventHour === slot.hour) {
                              // Calculate display duration (in hours)
                              const eventEndDate = new Date(event.end);
                              const startHour = eventStartDate.getHours();
                              const endHour = eventEndDate.getHours();
                              const durationHours = endHour - startHour + 1;
                              const height = durationHours * 64; // 64px per hour

                              return (
                                <div
                                  key={event.id}
                                  className={`${event.color} ${event.textColor || 'text-white'} p-1 text-xs absolute w-full overflow-hidden rounded shadow-sm transition-opacity hover:opacity-90`}
                                  style={{
                                    top: 0,
                                    height: `${height}px`,
                                    zIndex: 10 + eventIndex
                                  }}
                                >
                                  {event.time && <div className="font-semibold">{event.time}</div>}
                                  {event.title}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Day View */}
          {view === 'day' && (
            <div className="flex flex-col h-full overflow-x-auto bg-blue-50">
              {/* Day Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b sticky top-0 bg-white z-10">
                <div className="hidden sm:block py-2 px-2 text-xs text-gray-500 font-medium border-r w-16">
                  All-day
                </div>
                <div className="py-2 px-2 text-sm font-medium text-gray-700 border-r text-center">
                  {formatDayHeader(currentDate).dayName} {currentDate.getDate()}
                  <div className="sm:hidden text-xs text-gray-500 mt-1">All-day events below</div>
                </div>
              </div>

              {/* All-day Events Row - Mobile Version */}
              <div className="sm:hidden border-b p-2">
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  All-day events:
                </div>
                {getWeekViewEventsForDay(currentDate)
                  .filter(event => isAllDayEvent(event))
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`${event.color} ${event.textColor || 'text-white'} my-1 p-1 text-xs rounded`}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>

              {/* All-day Events Row - Desktop Version */}
              <div className="hidden sm:grid sm:grid-cols-2 border-b">
                <div className="px-2 py-2 text-xs text-gray-500 font-medium border-r">

                </div>
                <div className="border-r relative min-h-12 p-1">
                  {getWeekViewEventsForDay(currentDate)
                    .filter(event => isAllDayEvent(event))
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} ${event.textColor || 'text-white'} my-0.5 p-1 text-xs rounded`}
                      >
                        {event.title}
                      </div>
                    ))}
                </div>
              </div>

              {/* Time Slots and Events */}
              <div className="flex flex-col divide-y overflow-y-auto" style={{ height: '600px' }}>
                {timeSlots.map((slot) => (
                  <div key={slot.hour} className="grid grid-cols-1 sm:grid-cols-2 min-h-16">
                    <div className="px-2 py-1 text-xs text-gray-500 border-r sticky left-0 bg-white font-medium">
                      {slot.label}
                    </div>
                    <div className="border-r relative h-full hover:bg-gray-50">
                      {getEventsForHourAndDay(currentDate, slot.hour)
                        .filter(event => !isAllDayEvent(event))
                        .map((event, eventIndex) => {
                          // Only render event at its start hour
                          const eventStartDate = new Date(event.start);
                          const eventHour = eventStartDate.getHours();

                          if (eventHour === slot.hour) {
                            // Calculate display duration (in hours)
                            const eventEndDate = new Date(event.end);
                            const startHour = eventStartDate.getHours();
                            const endHour = eventEndDate.getHours();
                            const durationHours = endHour - startHour + 1;
                            const height = durationHours * 64; // 64px per hour

                            return (
                              <div
                                key={event.id}
                                className={`${event.color} ${event.textColor || 'text-white'} p-1 text-xs absolute w-full overflow-hidden rounded shadow-sm transition-opacity hover:opacity-90`}
                                style={{
                                  top: 0,
                                  height: `${height}px`,
                                  zIndex: 10 + eventIndex
                                }}
                              >
                                {event.time && <div className="font-semibold">{event.time}</div>}
                                {event.title}
                              </div>
                            );
                          }
                          return null;
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Time Indication (Fixed Bar at Bottom) */}
          <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-white border-t shadow-inner">
            <div className="text-xs text-gray-500">
              Today: {new Date(2025, 4, 8).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div>
        {
          workingPersons.map((item, index) => (
            <div key={index} className="bg-blue-50 flex flex-col p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
// AttendanceView.tsx
import React, { useState } from 'react';
import { CheckCircle, Printer, FileText, Download, Calendar, Grid } from 'lucide-react';

type AttendanceStatus = 'P' | 'A' | 'L' | 'H' | 'F' | '';

type AttendanceMonthData = {
  [day: number]: AttendanceStatus;
};

type AttendanceData = {
  [month: string]: AttendanceMonthData;
};

type AttendanceSummary = {
  present: number;
  late: number;
  absent: number;
  halfDay: number;
  holiday: number;
};

const AttendanceView: React.FC = () => {
  const months: string[] = [
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
    'January', 'February', 'March'
  ];

  const [attendanceSummary, setAttendanceSummary] = useState<AttendanceSummary>({
    present: 1,
    late: 0,
    absent: 0,
    halfDay: 0,
    holiday: 0
  });

  const [attendanceData, setAttendanceData] = useState<AttendanceData>({
    April: {
      1: '',
      2: 'P',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: ''
    }
  });

  const handleCalendarClick = () => {
    alert('Calendar filter not implemented yet.');
  };

  const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleExportCSV = () => {
    const csvHeader = ['Date / Month', ...months];
    const csvRows = days.map((day) => {
      const row: string[] = [day.toString()];
      months.forEach((month) => {
        row.push(attendanceData[month]?.[day] || '');
      });
      return row;
    });

    const csvContent = [csvHeader, ...csvRows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const tableHtml = document.querySelector('table')?.outerHTML || '';

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Attendance Print</title>
            <style>
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 6px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h2>Attendance Report</h2>
            ${tableHtml}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleViewText = () => {
    const lines: string[] = [];
    days.forEach((day) => {
      const row: string[] = [`Day ${day}`];
      months.forEach((month) => {
        const status = attendanceData[month]?.[day] || '-';
        row.push(`${month}: ${status}`);
      });
      lines.push(row.join(' | '));
    });
    alert(lines.join('\n'));
  };

  const handleToggleView = () => {
    alert('Toggle view (grid/list) not implemented yet.');
  };

  return (
    <div className="p-4 flex-1 bg-gray-50">
      {/* Summary Cards */}
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
        {['present', 'late', 'absent', 'halfDay'].map((key) => (
          <div key={key} className="bg-white p-4 w-full rounded-md shadow-sm flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-700">
                Total {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="text-2xl font-bold">{attendanceSummary[key as keyof AttendanceSummary]}</div>
            </div>
            <div className="bg-gray-200 rounded-full p-3">
              <CheckCircle className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        ))}
        <div className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-700">Total Holiday</div>
            <div className="text-2xl font-bold">{attendanceSummary.holiday}</div>
          </div>
          <div className="bg-gray-200 rounded-full p-3">
            <CheckCircle className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Legend + Action Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="text-sm text-gray-600 mb-2 md:mb-0">
          Present: <span className="font-medium text-green-600">P</span>{' '}
          Late: <span className="font-medium text-yellow-600">L</span>{' '}
          Absent: <span className="font-medium text-red-600">A</span>{' '}
          Holiday: <span className="font-medium text-blue-600">H</span>{' '}
          Half Day: <span className="font-medium text-purple-600">F</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCalendarClick} className="p-1 border border-gray-300 rounded">
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleViewText} className="p-1 border border-gray-300 rounded">
            <FileText className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleExportCSV} className="p-1 border border-gray-300 rounded">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handlePrint} className="p-1 border border-gray-300 rounded">
            <Printer className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleToggleView} className="p-1 border border-gray-300 rounded">
            <Grid className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-md shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Date / Month
              </th>
              {months.map((month) => (
                <th key={month} className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {days.map((day) => (
              <tr key={day} className={day % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 whitespace-nowrap border-r text-sm font-medium text-gray-700">
                  {day}
                </td>
                {months.map((month) => {
                  const status = attendanceData[month]?.[day] || '';
                  let statusClass = '';

                  switch (status) {
                    case 'P':
                      statusClass = 'text-green-600';
                      break;
                    case 'A':
                      statusClass = 'text-red-600';
                      break;
                    case 'L':
                      statusClass = 'text-yellow-600';
                      break;
                    case 'H':
                      statusClass = 'text-blue-600';
                      break;
                    case 'F':
                      statusClass = 'text-purple-600';
                      break;
                    default:
                      statusClass = '';
                      break;
                  }

                  return (
                    <td key={`${month}-${day}`} className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                      <span className={statusClass}>{status}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceView;

"use client";
import scheduleData from "./ScheduleData";
import { Printer } from "lucide-react";

function ExamSchedule() {
  const handlePrint = (printData) => {
    if (!printData || printData.length === 0) return;

    const headers = Object.keys(printData[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';

    printData.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table>';

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Exam Schedule</title>
        </head>
        <body>
          <h2>Exam Schedule</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Exam Schedule</h1>

      {scheduleData.map((test, index) => (
        <div key={index} className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">{test.testName}</h2>
            <button
              onClick={() => handlePrint(test.exams)}
              className="text-gray-600 hover:text-black"
              title="Print Schedule"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 sm:px-4 py-2">Subject</th>
                  <th className="border px-2 sm:px-4 py-2">Date</th>
                  <th className="border px-2 sm:px-4 py-2">Start Time</th>
                  <th className="border px-2 sm:px-4 py-2">Duration (minute)</th>
                  <th className="border px-2 sm:px-4 py-2">Room No.</th>
                </tr>
              </thead>
              <tbody>
                {test.exams.map((exam, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 sm:px-4 py-2">{exam.subject}</td>
                    <td className="border px-2 sm:px-4 py-2">{exam.date}</td>
                    <td className="border px-2 sm:px-4 py-2">{exam.startTime}</td>
                    <td className="border px-2 sm:px-4 py-2">{exam.duration}</td>
                    <td className="border px-2 sm:px-4 py-2">{exam.roomNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExamSchedule;

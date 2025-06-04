// ExamResults.tsx
import React from 'react';

interface Subject {
  name: string;
  code: string;
  maxMarks: number;
  minMarks: number;
  marksObtained: number;
  result?: string;
  grade?: string;
  note?: string;
}

interface GPASubject {
  name: string;
  code: string;
  gradePoint: number;
  creditHours: number;
  qualityPoints: number;
  note?: string;
}

interface AverageSubject {
  name: string;
  code: string;
  maxMarks: number;
  marksObtained: number;
  note?: string;
}

interface TestSummary {
  percentage: number;
  rank: number;
  result: string;
  division: string;
  grandTotal: number;
  totalObtainMarks: number;
}

interface GPASummary {
  creditHours: number;
  rank: number;
  qualityPoints: number;
  totalCreditHours: number;
  gpa: number;
  grade: string;
}

const ExamResults: React.FC = () => {
  return (
    <div className="p-4 flex-1 bg-gray-50">

      {/* Monthly Test Section */}
      <div className="bg-white shadow-sm rounded-md mb-6">
        <div className="bg-gray-100 p-3 font-medium">
          Monthly Test April(2025-26)
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Max Marks</th>
                <th className="text-left py-3 px-4">Min Marks</th>
                <th className="text-left py-3 px-4">Marks Obtained</th>
                <th className="text-left py-3 px-4">Result</th>
                <th className="text-left py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">77.00</td>
                <td className="py-3 px-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Pass</span>
                </td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Hindi (230)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">67.00</td>
                <td className="py-3 px-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Pass</span>
                </td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">88.00</td>
                <td className="py-3 px-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Pass</span>
                </td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Social Studies (212)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">88.00</td>
                <td className="py-3 px-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Pass</span>
                </td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-100 p-3 flex flex-wrap items-center text-sm">
          <div className="mr-6">Percentage: 80.00</div>
          <div className="mr-6">Rank: 9</div>
          <div className="mr-6">Result: 
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs ml-1">Pass</span>
          </div>
          <div className="mr-6">Division: First</div>
          <div className="mr-6">Grand Total: 400</div>
          <div>Total Obtain Marks: 320</div>
        </div>
      </div>

      {/* Weekly Test Section */}
      <div className="bg-white shadow-sm rounded-md">
        <div className="bg-gray-100 p-3 font-medium">
          Weekly Test (2025-26)
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Max Marks</th>
                <th className="text-left py-3 px-4">Min Marks</th>
                <th className="text-left py-3 px-4">Marks Obtained</th>
                <th className="text-left py-3 px-4">Grade</th>
                <th className="text-left py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">66.00</td>
                <td className="py-3 px-4">B++</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">77.00</td>
                <td className="py-3 px-4">A</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Science (111)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">89.00</td>
                <td className="py-3 px-4">A+</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Social Studies (212)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">88.00</td>
                <td className="py-3 px-4">A+</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-100 p-3 flex flex-wrap items-center text-sm">
          <div className="mr-6">Percentage: 80.00</div>
          <div className="mr-6">Rank: 8</div>
          <div className="mr-6">Result: 
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs ml-1">Pass</span>
          </div>
          <div className="mr-6">Division: First</div>
          <div className="mr-6">Grand Total: 400</div>
          <div>Total Obtain Marks: 320</div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-md mb-6 mt-7">
        <div className="bg-gray-100 p-3 font-medium">
          All Subject Test (April) - GPA Grading System
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Grade Point</th>
                <th className="text-left py-3 px-4">Credit Hours</th>
                <th className="text-left py-3 px-4">Quality Points</th>
                <th className="text-left py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4">3.50</td>
                <td className="py-3 px-4">2.00</td>
                <td className="py-3 px-4">7.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Hindi (230)</td>
                <td className="py-3 px-4">4.00</td>
                <td className="py-3 px-4">4.00</td>
                <td className="py-3 px-4">16.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4">4.00</td>
                <td className="py-3 px-4">2.00</td>
                <td className="py-3 px-4">8.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Science (111)</td>
                <td className="py-3 px-4">4.00</td>
                <td className="py-3 px-4">4.00</td>
                <td className="py-3 px-4">16.00</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-3 flex flex-wrap items-center text-sm">
          <div className="mr-6">Credit Hours: 12</div>
          <div className="mr-6">Rank: 8</div>
          <div className="mr-6">Quality Points: 47/12 = 3.92 <span className="ml-1 font-semibold text-green-600">[A]</span></div>
        </div>
      </div>

      {/* Average Weekly Test Section */}
      <div className="bg-white shadow-sm rounded-md mb-6">
        <div className="bg-gray-100 p-3 font-medium">
          Average Weekly Test
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Max Marks</th>
                <th className="text-left py-3 px-4">Marks Obtained</th>
                <th className="text-left py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Hindi (230)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">67.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">78.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Science (111)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">78.00</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">78.00</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-3 flex flex-wrap items-center text-sm">
          <div className="mr-6">Percentage: 75.25</div>
          <div className="mr-6">Rank: 3</div>
          <div className="mr-6">Result: 
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs ml-1">Pass</span>
          </div>
          <div className="mr-6">Division: First</div>
          <div className="mr-6">Grand Total: 400</div>
          <div>Total Obtain Marks: 301</div>
        </div>
      </div>

      {/* Period Assessment Section */}
      <div className="bg-white shadow-sm rounded-md">
        <div className="bg-gray-100 p-3 font-medium">
          Period Assessments Test
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Max Marks</th>
                <th className="text-left py-3 px-4">Min Marks</th>
                <th className="text-left py-3 px-4">Marks Obtained</th>
                <th className="text-left py-3 px-4">Grade</th>
                <th className="text-left py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">56.00</td>
                <td className="py-3 px-4">B+</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Hindi (230)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">67.00</td>
                <td className="py-3 px-4">B++</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Science (111)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">67.00</td>
                <td className="py-3 px-4">B++</td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4">100.00</td>
                <td className="py-3 px-4">35.00</td>
                <td className="py-3 px-4">78.00</td>
                <td className="py-3 px-4">A</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-3 flex flex-wrap items-center text-sm">
          <div className="mr-6">Percentage: 67.00</div>
          <div className="mr-6">Rank: 13</div>
          <div className="mr-6">Result: 
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs ml-1">Pass</span>
          </div>
          <div className="mr-6">Division: First</div>
          <div className="mr-6">Grand Total: 400</div>
          <div>Total Obtain Marks: 268</div>
        </div>
      </div>

    </div>
  );
};

export default ExamResults;
"use client";
import { FaPrint } from "react-icons/fa";
export default function MultiBranchOverview() {

    const handlePrintClick = () => {
        const printWindow = window.open('', '_blank', 'width=1200,height=800');
        const htmlContent = `
        <html>
        <head>
            <title>Branch Overview</title>
            <style>
                body { font-family: sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { border: 1px solid #333; padding: 8px; text-align: left; }
                th { background: #f0f0f0; }
                h2 { margin-top: 40px; }
            </style>
        </head>
        <body>
            <h1>Overview</h1>

            <h2>Fees Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Branch</th><th>Current Session</th><th>Total Students</th><th>Total Fees</th><th>Total Paid Fees</th><th>Total Balance Fees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Home Branch</td><td>2025-26</td><td>55</td><td>₹4,03,93,501.4</td><td>₹32,66,900.7</td><td>₹3,71,26,600.7</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>2025-26</td><td>16</td><td>₹29,92,500.00</td><td>₹2,08,600.00</td><td>₹27,83,900.00</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>2025-26</td><td>11</td><td>₹15,22,500.00</td><td>₹1,54,000.00</td><td>₹13,68,500.00</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>2025-26</td><td>14</td><td>₹33,63,500.00</td><td>₹2,48,500.00</td><td>₹31,15,000.00</td></tr>
                </tbody>
            </table>

            <h2>Transport Fees Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Branch</th><th>Current Session</th><th>Total Fees</th><th>Total Paid Fees</th><th>Total Balance Fees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Home Branch</td><td>2025-26</td><td>₹20,75,500.00</td><td>₹74,200.00</td><td>₹20,01,300.00</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>2025-26</td><td>₹2,06,500.00</td><td>₹7,000.00</td><td>₹1,99,500.00</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>2025-26</td><td>₹3,18,500.00</td><td>₹7,000.00</td><td>₹3,11,500.00</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>2025-26</td><td>₹1,99,500.00</td><td>₹3,500.00</td><td>₹1,96,000.00</td></tr>
                </tbody>
            </table>

            <h2>Student Admission</h2>
            <table>
                <thead>
                    <tr><th>Branch</th><th>Current Session</th><th>Offline Admission</th><th>Online Admission</th></tr>
                </thead>
                <tbody>
                    <tr><td>Home Branch</td><td>2025-26</td><td>5</td><td>3</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>2025-26</td><td>4</td><td>2</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>2025-26</td><td>3</td><td>2</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>2025-26</td><td>3</td><td>2</td></tr>
                </tbody>
            </table>

            <h2>Library Details</h2>
            <table>
                <thead>
                    <tr><th>Branch</th><th>Total Books</th><th>Members</th><th>Book Issued</th></tr>
                </thead>
                <tbody>
                    <tr><td>Home Branch</td><td>50</td><td>47</td><td>261</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>12</td><td>16</td><td>40</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>11</td><td>16</td><td>40</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>8</td><td>21</td><td>37</td></tr>
                </tbody>
            </table>

            <h2>Alumni Students</h2>
            <table>
                <thead><tr><th>Branch</th><th>Alumni Students</th></tr></thead>
                <tbody>
                    <tr><td>Home Branch</td><td>4</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>2</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>5</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>2</td></tr>
                </tbody>
            </table>

            <h2>Staff Payroll of April</h2>
            <table>
                <thead>
                    <tr>
                        <th>Branch</th><th>Total Staff</th><th>Payroll Generated</th><th>Payroll Not Generated</th>
                        <th>Payroll Paid</th><th>Net Amount</th><th>Paid Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Home Branch</td><td>8</td><td>2</td><td>1</td><td>5</td><td>₹92,21,100.00</td><td>₹55,47,500.00</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>7</td><td>0</td><td>7</td><td>0</td><td>₹0.00</td><td>₹0.00</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>7</td><td>0</td><td>7</td><td>0</td><td>₹0.00</td><td>₹0.00</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>8</td><td>0</td><td>8</td><td>0</td><td>₹0.00</td><td>₹0.00</td></tr>
                </tbody>
            </table>

            <h2>Staff Attendance Details At 05/13/2025</h2>
            <table>
                <thead><tr><th>Branch</th><th>Total Staff</th><th>Present</th><th>Absent</th></tr></thead>
                <tbody>
                    <tr><td>Home Branch</td><td>8</td><td>-</td><td>-</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>7</td><td>-</td><td>-</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>7</td><td>-</td><td>-</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>8</td><td>-</td><td>-</td></tr>
                </tbody>
            </table>

            <h2>User Log Details</h2>
            <table>
                <thead><tr><th>Branch</th><th>Total User Log</th></tr></thead>
                <tbody>
                    <tr><td>Home Branch</td><td>138</td></tr>
                    <tr><td>Mount Carmel School 1</td><td>151</td></tr>
                    <tr><td>Mount Carmel School 2</td><td>97</td></tr>
                    <tr><td>Mount Carmel School 3</td><td>108</td></tr>
                </tbody>
            </table>

            <script>
                window.print();
            </script>
        </body>
        </html>
    `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };


    return (
        <div className="p-6 mt-2 bg-white shadow border-b pb-2">
            {/* Header with Print Icon */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h1 className="text-xl">Overview</h1>
                <FaPrint
                    className="text-2xl text-white-600 hover:text-black cursor-pointer"
                    title="Print Report"
                    onClick={handlePrintClick}
                />
            </div>

            {/* Fees Details Table */}

            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Fees Details</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Current Session</th>
                            <th className="text-left px-3 py-2">Total Students</th>
                            <th className="text-left px-3 py-2">Total Fees</th>
                            <th className="text-left px-3 py-2">Total Paid Fees</th>
                            <th className="text-left px-3 py-2">Total Balance Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">55</td>
                            <td className="px-3 py-2">₹4,03,93,501.00</td>
                            <td className="px-3 py-2">₹25,98,400.00</td>
                            <td className="px-3 py-2">₹3,77,95,101.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">16</td>
                            <td className="px-3 py-2">₹29,92,500.00</td>
                            <td className="px-3 py-2">₹2,08,600.00</td>
                            <td className="px-3 py-2">₹27,83,900.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">11</td>
                            <td className="px-3 py-2">₹15,22,500.00</td>
                            <td className="px-3 py-2">₹1,54,000.00</td>
                            <td className="px-3 py-2">₹13,68,500.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">14</td>
                            <td className="px-3 py-2">₹33,63,500.00</td>
                            <td className="px-3 py-2">₹2,48,500.00</td>
                            <td className="px-3 py-2">₹31,15,000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Transport Fees Details */}
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Transport Fees Details</h2>
                <table className="w-full text-sm">
                    <thead className=" text-gray-700">
                        <tr className="border-b border-gray-300">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Current Session</th>
                            <th className="text-left px-3 py-2">Offline Admission</th>
                            <th className="text-left px-3 py-2">Online Admission</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">5</td>
                            <td className="px-3 py-2">3</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">4</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">3</td>
                            <td className="px-3 py-2">1</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">3</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Student Admission */}
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Student Admission</h2>
                <table className="w-full text-sm">
                    <thead className=" text-gray-700">
                        <tr className="border-b border-gray-300">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Current Session</th>
                            <th className="text-left px-3 py-2">Offline Admission</th>
                            <th className="text-left px-3 py-2">Online Admission</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">5</td>
                            <td className="px-3 py-2">3</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">4</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">3</td>
                            <td className="px-3 py-2">1</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">2025-26</td>
                            <td className="px-3 py-2">3</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Library Details */}
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Library Details</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Total Books</th>
                            <th className="text-left px-3 py-2">Members</th>
                            <th className="text-left px-3 py-2">Book Issued</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">50</td>
                            <td className="px-3 py-2">47</td>
                            <td className="px-3 py-2">261</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">12</td>
                            <td className="px-3 py-2">16</td>
                            <td className="px-3 py-2">40</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">11</td>
                            <td className="px-3 py-2">15</td>
                            <td className="px-3 py-2">35</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">9</td>
                            <td className="px-3 py-2">14</td>
                            <td className="px-3 py-2">33</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Alumni Students</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Alumni Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">4</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">5</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Staff Payroll of April</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Total Staff</th>
                            <th className="text-left px-3 py-2">Payroll Generated</th>
                            <th className="text-left px-3 py-2">Payroll Not Generated</th>
                            <th className="text-left px-3 py-2">Payroll Paid</th>
                            <th className="text-left px-3 py-2">Net Amount</th>
                            <th className="text-left px-3 py-2">Paid Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2">2</td>
                            <td className="px-3 py-2">1</td>
                            <td className="px-3 py-2">5</td>
                            <td className="px-3 py-2">₹92,21,100.00</td>
                            <td className="px-3 py-2">₹55,47,500.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">₹0.00</td>
                            <td className="px-3 py-2">₹0.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">₹0.00</td>
                            <td className="px-3 py-2">₹0.00</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2">0</td>
                            <td className="px-3 py-2">₹0.00</td>
                            <td className="px-3 py-2">₹0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">Staff Attendance Details At 05/13/2025</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Total Staff</th>
                            <th className="text-left px-3 py-2">Present</th>
                            <th className="text-left px-3 py-2">Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2">1</td>
                            <td className="px-3 py-2">0</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">-</td>
                            <td className="px-3 py-2">-</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">7</td>
                            <td className="px-3 py-2">-</td>
                            <td className="px-3 py-2">-</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">8</td>
                            <td className="px-3 py-2">-</td>
                            <td className="px-3 py-2">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white rounded border border-gray-300 mb-6">
                <h2 className="font-semibold bg-gray-100 p-2 rounded-t">User Log Details</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-700">
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left px-3 py-2">Branch</th>
                            <th className="text-left px-3 py-2">Total User Log</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Home Branch</td>
                            <td className="px-3 py-2">148</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 1</td>
                            <td className="px-3 py-2">151</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 2</td>
                            <td className="px-3 py-2">97</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-3 py-2">Mount Carmel School 3</td>
                            <td className="px-3 py-2">108</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

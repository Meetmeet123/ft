import React, { useState } from 'react';
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface Session {
  session: string;
  status: string;
}

const SessionSettings: React.FC = () => {
  const [sessionInput, setSessionInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSessionAscending, setIsSessionAscending] = useState<boolean>(true);
  const [isStatusAscending, setIsStatusAscending] = useState<boolean>(true);
  const [sessions, setSessions] = useState<Session[]>([
    { session: "2017-18", status: "" },
    { session: "2018-19", status: "" },
    { session: "2019-20", status: "" },
    { session: "2020-21", status: "" },
    { session: "2021-22", status: "" },
    { session: "2022-23", status: "" },
    { session: "2023-24", status: "" },
    { session: "2024-25", status: "" },
    { session: "2025-26", status: "" },
    { session: "2026-27", status: "" },
    { session: "2027-28", status: "" },
    { session: "2028-29", status: "" },
    { session: "2029-30", status: "" },
    { session: "2030-31", status: "" }
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (sessionInput.trim() === "") {
      setError("This field is required");
    } else {
      setError("");
      setSessions((prev) => [...prev, { session: sessionInput, status: "" }]);
      setSessionInput("");
      setSuccessMessage("Record Saved Successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const toggleSessionSort = (): void => {
    setIsSessionAscending((prev) => !prev);
    setSessions((prevSessions) =>
      [...prevSessions].sort((a, b) =>
        isSessionAscending
          ? a.session.localeCompare(b.session)
          : b.session.localeCompare(a.session)
      )
    );
  };

  const toggleStatusSort = (): void => {
    setIsStatusAscending((prev) => !prev);
    setSessions((prevSessions) =>
      [...prevSessions].sort((a, b) =>
        isStatusAscending
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      )
    );
  };

  const filteredSessions: Session[] = sessions.filter((session) =>
    session.session.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Add Session Form */}
        <div className="md:w-1/2 w-full bg-white p-4 rounded shadow">
          <h1 className="text-xl border-b dark:border-gray-700 pb-2">Add Session</h1>

          {successMessage && (
            <div className="text-green-500 text-xs mb-2 mt-2 bg-green-100 border border-green-200 p-2 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-2">
              <label htmlFor="session">Session <span className="text-red-500">*</span></label>
              <input
                id="session"
                type="text"
                value={sessionInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSessionInput(e.target.value)}
                className="py-1 px-2 border border-gray-300 rounded mt-1 text-sm"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div className="flex justify-end mt-5 border-t pt-3">
              <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm">
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Session List */}
        <div className="md:w-3/4 w-full bg-white p-4 rounded shadow">
          <h1 className="text-xl border-b dark:border-gray-700 pb-2">Session List</h1>

          <div className="bg-[#dae8f2] text-[#3498db] border border-[#a3c8e3] p-3 mt-3 rounded text-sm">
            Note: After saving General Setting please logout and login again to apply changes.
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="form-input border-b border-gray-400 w-full md:w-1/3 text-sm focus:ring-0 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm table-auto border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left px-4 py-2 cursor-pointer" onClick={toggleSessionSort}>
                    Session
                  </th>
                  <th className="text-left px-4 py-2 cursor-pointer" onClick={toggleStatusSort}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{session.session}</td>
                      <td className="px-4 py-2">{session.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center text-red-500 py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSettings;
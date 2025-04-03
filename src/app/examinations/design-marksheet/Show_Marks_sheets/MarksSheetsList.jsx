import React, { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const MarksheetList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Items per page

  const [marksheets, setMarksheets] = useState([
    {
      id: 1,
      name: "School Marksheet",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
    {
      id: 2,
      name: "College Marksheet",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
    {
      id: 3,
      name: "University Marksheet",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
    {
      id: 4,
      name: "Diploma Marksheet",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
    {
      id: 5,
      name: "Training Certificate",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
    {
      id: 6,
      name: "Workshop Certificate",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setMarksheets(marksheets.filter((sheet) => sheet.id !== id));
    }
  };

  // Filter & Paginate Data
  const filteredSheets = marksheets.filter((sheet) =>
    sheet.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedSheets = filteredSheets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md px-3 py-1 text-sm focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">Certificate Name</th>
              <th className="py-3 px-4 text-left">Background Image</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSheets.map((sheet) => (
              <tr
                key={sheet.id}
                className="border-b hover:bg-gray-50 text-sm h-[72px]"
              >
                <td className="py-3 px-4 align-middle">{sheet.name}</td>
                <td className="py-3 px-4 align-middle">
                  <img
                    src={sheet.image}
                    alt="Marksheet"
                    className="w-14 h-14 object-cover rounded-md shadow"
                  />
                </td>
                <td className="py-3 px-4 text-right flex justify-end gap-3 h-20 items-center">
                  <EyeOutlined className="text-blue-500 cursor-pointer hover:scale-110" />
                  <EditOutlined className="text-green-500 cursor-pointer hover:scale-110" />
                  <DeleteOutlined
                    className="text-red-500 cursor-pointer hover:scale-110"
                    onClick={() => handleDelete(sheet.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredSheets.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MarksheetList;

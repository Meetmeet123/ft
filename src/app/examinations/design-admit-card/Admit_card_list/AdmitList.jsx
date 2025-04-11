import React, { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const AdmitCardList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const [admitCards, setAdmitCards] = useState([
    {
      id: 1,
      name: "Sample Admit Card 1",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg", // Random image
      active: true,
    },
    {
      id: 2,
      name: "Sample Admit Card 2",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg", // Random image
      active: false,
    },
    {
      id: 3,
      name: "Sample Admit Card 3",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg", // Random image
      active: false,
    },
    {
      id: 4,
      name: "Sample Admit Card 4",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg", // Random image
      active: false,
    },
    {
      id: 5,
      name: "Sample Admit Card 5",
      image:
        "https://cdn.pixabay.com/photo/2022/08/23/11/58/stock-exchange-7405619_1280.jpg", // Random image
      active: false,
    },
    {
      id: 6,
      name: "Sample Admit Card 6",
      image: "https://source.unsplash.com/random/300x200?sig=6", // Random image
      active: false,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setAdmitCards(admitCards.filter((card) => card.id !== id));
    }
  };

  // Filtered & Paginated Data
  const filteredCards = admitCards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">Admit Card List</h2>
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
              <th className="py-3 px-4 text-center">Active</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCards.map((card) => (
              <tr
                key={card.id}
                className="border-b hover:bg-gray-50 text-sm h-[72px]" // Fixed row height
              >
                <td className="py-3 px-4 align-middle">{card.name}</td>
                <td className="py-3 px-4 align-middle">
                  <img
                    src={card.image}
                    alt="Admit"
                    className="w-14 h-14 object-cover rounded-md shadow"
                  />
                </td>
                <td className="py-3 px-4 text-center align-middle">
                  <input
                    type="radio"
                    name="active_admit_card"
                    checked={card.active}
                    readOnly
                  />
                </td>
                <td className="py-3 px-4 text-right flex justify-end gap-3 h-20  items-center">
                  <EyeOutlined className="text-blue-500 cursor-pointer hover:scale-110" />
                  <EditOutlined className="text-green-500 cursor-pointer hover:scale-110" />
                  <DeleteOutlined
                    className="text-red-500 cursor-pointer hover:scale-110"
                    onClick={() => handleDelete(card.id)}
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
          total={filteredCards.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AdmitCardList;

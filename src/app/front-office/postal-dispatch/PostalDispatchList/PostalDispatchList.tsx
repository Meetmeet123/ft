import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const API_URL = "https://school2025.dolittletech.co.in/api/dispatch";

interface PostalDispatch {
  id: number;
  reference_no: string;
  to_title: string;
  from_title: string;
  date: string;
  address: string;
  note: string;
  image?: string;
}

const PostalDispatchList: React.FC<{
  onEdit: (dispatch: PostalDispatch) => void;
  refreshKey: number;
}> = ({ onEdit, refreshKey }) => {
  const [dispatches, setDispatches] = useState<PostalDispatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // useEffect(() => {
  //   const fetchDispatches = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(API_URL);
  //       const data = await response.json();
  //       setDispatches(data);
  //     } catch (error) {
  //       console.error(error);
  //       message.error("Failed to fetch dispatches");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDispatches();
  // }, [refreshKey]);

  const handleDelete = async (id: number) => {
    // try {
    //   await fetch(`${API_URL}/${id}`, {
    //     method: 'DELETE',
    //   });
    //   message.success("Dispatch deleted successfully");
    //   setDispatches(dispatches.filter(item => item.id !== id));
    // } catch (error) {
    //   console.error(error);
    //   message.error("Delete failed");
    // }
  };

  const filteredDispatches = dispatches.filter((dispatch) =>
    dispatch.to_title.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredDispatches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "To Title",
      dataIndex: "to_title",
      key: "to_title",
      ellipsis: true,
    },
    {
      title: "Reference No",
      dataIndex: "reference_no",
      key: "reference_no",
      ellipsis: true,
    },
    {
      title: "From Title",
      dataIndex: "from_title",
      key: "from_title",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: PostalDispatch) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                handleDelete(record.id);
              }
            }}
          />
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="w-full">
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px", minWidth: "200px" }}
      />
      <div className="flex gap-2 mb-3.5">
        <Button icon={<FileTextOutlined />} />
        <Button icon={<FileExcelOutlined />} />
        <Button icon={<FilePdfOutlined />} />
        <Button icon={<PrinterOutlined />} />
      </div>
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredDispatches.length,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-gray-500 mb-4">No data available in table</div>
              <div className="text-green-600 flex items-center gap-2">
                <span>←</span> Add a new record or search with different criteria.
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PostalDispatchList;
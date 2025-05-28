import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Modal, Form, Select, DatePicker, InputNumber } from "antd";
import {
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from 'dayjs';

interface Income {
  id: number;
  inc_head_id: string;
  name: string;
  invoice_no: string;
  date: string;
  amount: number;
  note: string;
  is_active: string;
}

interface IncomeResultProps {
  searchParams: any;
  refreshList: boolean;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeResult: React.FC<IncomeResultProps> = ({ 
  searchParams, 
  refreshList,
  setRefreshList
}) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Changed from isModalVisible
  const [form] = Form.useForm();
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const pageSize = 5;

  useEffect(() => {
    const fetchIncomes = async () => {
      setLoading(true);
      try {
        let url = 'http://127.0.0.1:8000/api/income';
        
        if (searchParams.searchType && searchParams.searchValue) {
          url += `?search_type=${searchParams.searchType}&search_value=${searchParams.searchValue}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok && data.incomelist) {
          setIncomes(data.incomelist);
        } else {
          message.error(data.message || "Failed to fetch incomes");
          setIncomes([]);
        }
      } catch (error) {
        message.error("Error fetching incomes");
        console.error("Fetch error:", error);
        setIncomes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [searchParams, refreshList]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/income/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        message.success("Income deleted successfully");
        setRefreshList(prev => !prev);
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("Delete error:", error);
    }
  };

  const showModal = (income: Income | null = null) => {
    setEditingIncome(income);
    form.setFieldsValue({
      ...income,
      date: income ? dayjs(income.date) : dayjs()
    });
    setIsModalOpen(true); // Changed to setIsModalOpen
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD')
      };

      const url = editingIncome 
        ? `http://127.0.0.1:8000/api/income/${editingIncome.id}`
        : 'http://127.0.0.1:8000/api/income';
      
      const method = editingIncome ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(editingIncome ? "Income updated successfully" : "Income added successfully");
        setIsModalOpen(false); // Changed to setIsModalOpen
        setRefreshList(prev => !prev);
      } else {
        throw new Error(data.message || "Operation failed");
      }
    } catch (error: any) {
      message.error(error.message || "Validation failed");
      console.error("Submit error:", error);
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.name.toLowerCase().includes(searchText.toLowerCase()) ||
    income.invoice_no.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredIncomes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_no",
      key: "invoice_no",
    },
    {
      title: "Income Head ID",
      dataIndex: "inc_head_id",
      key: "inc_head_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => amount.toLocaleString('en-IN'),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (status: string) => (
        <span style={{ color: status === "yes" ? "green" : "red" }}>
          {status === "yes" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Income) => (
        <div className="flex gap-2">
          <Button 
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this income?")) {
                handleDelete(record.id);
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-2 w-full border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <div className="flex gap-2">
          <Button icon={<PlusOutlined />} onClick={() => showModal()} />
          <Button icon={<FileTextOutlined />} />
          <Button icon={<FileExcelOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<PrinterOutlined />} />
        </div>
      </div>

      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredIncomes.length,
          onChange: (page) => setCurrentPage(page),
        }}
        locale={{
          emptyText: (
            <div className="text-center py-10">
              <div className="text-pink-500 mb-4">No data available in table</div>
              <div className="flex justify-center">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" />
                  <path d="M4 12H20" stroke="currentColor" />
                  <path d="M12 4V20" stroke="currentColor" />
                </svg>
              </div>
              <p className="text-green-600 mt-4">
                ← Add new record or search with different criteria.
              </p>
            </div>
          ),
        }}
        scroll={{ x: 'max-content' }}
      />

      {/* Add/Edit Modal - Updated with open prop */}
      <Modal
        title={editingIncome ? "Edit Income" : "Add New Income"}
        open={isModalOpen} // Changed from visible to open
        onOk={handleFormSubmit}
        onCancel={() => setIsModalOpen(false)} // Changed to setIsModalOpen
        okText={editingIncome ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="invoice_no"
            label="Invoice Number"
            rules={[{ required: true, message: 'Please enter invoice number' }]}
          >
            <Input placeholder="Enter invoice number" />
          </Form.Item>
          <Form.Item
            name="inc_head_id"
            label="Income Head ID"
            rules={[{ required: true, message: 'Please select income head' }]}
          >
            <Input placeholder="Enter income head ID" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              min={0} 
              step={0.01} 
              formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={value => value!.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
          >
            <Input.TextArea placeholder="Enter note (optional)" />
          </Form.Item>
          <Form.Item
            name="is_active"
            label="Status"
            initialValue="yes"
          >
            <Select>
              <Select.Option value="yes">Active</Select.Option>
              <Select.Option value="no">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IncomeResult;
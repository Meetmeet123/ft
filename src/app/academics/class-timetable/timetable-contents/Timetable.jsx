import {
  PlusOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

const timetableData = [
  {
    key: "monday",
    day: "Monday",
    schedule: [
      {
        subject: "English (210)",
        time: "9:30 AM - 10:10 AM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
      {
        subject: "Mathematics (110)",
        time: "10:10 AM - 10:50 AM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
      {
        subject: "Science (111)",
        time: "10:50 AM - 11:30 AM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
      {
        subject: "Hindi (230)",
        time: "12:10 PM - 12:50 PM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
    ],
  },
  // Add other days similarly
];

const columns = [
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "Schedule",
    dataIndex: "schedule",
    key: "schedule",
    render: (schedule) => (
      <div>
        {schedule.map((entry, index) => (
          <div key={index} className="border-b py-2">
            <p>
              <strong>{entry.subject}</strong>
            </p>
            <p>{entry.time}</p>
            <p>{entry.teacher}</p>
            <p>{entry.room}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const Header = () => {
  return (
    <div className="ml-5 mt-5">
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <SearchOutlined /> Select Criteria
        </h3>
        <a
          style={{ backgroundColor: "#164f63" }}
          className="hover:bg-teal-700 text-white  font-bold px-4 py-2 rounded transition flex items-center"
          href="https://demo.smart-school.in/admin/timetable/create"
        >
          <PlusOutlined /> Add
        </a>
      </div>
      <div className="flex justify-end mt-4">
        <button type="primary" size="small" name="search">
          Search
        </button>
      </div>
      <div className="mt-5 bg-white shadow-md rounded-lg p-4">
        <button icon={<PrinterOutlined />} className="mb-4" type="primary">
          Print
        </button>
        <Table
          columns={columns}
          dataSource={timetableData}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Header;

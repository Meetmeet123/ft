"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Box,
  ShoppingBag,
  Inbox,
  HardDrive,
  CreditCard,
  MessageSquare,
  Mail,
  FileText,
  Calendar,
  Edit,
  Users,
  Trello,
  Activity,
  Zap,
  ChevronDown,
  Menu,
  Book,
  Phone,
  Settings,
  IdCard,
  AlertTriangle,
  FilePlus,
  User,
  Globe,
  Trash2,
  List,
  DollarSign,
  PlusCircle,
  Search,
  AlertCircle,
  GraduationCap,
  Tag,
  Bell,
  ArrowRight,
  Percent,
  SquareArrowOutUpRight,
  Projector,
  Accessibility,
  HousePlus,
  Banknote

} from "lucide-react";

interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  subItems?: MenuItem[];
}

const iconMap = {
  link: Home,
  home: Home,
  users: Users,
  book: Book,
  phone: Phone,
  mail: Mail,
  "message-square": MessageSquare,
  settings: Settings,
  user: User,
  "file-plus": FilePlus,
  globe: Globe,
  trash2: Trash2,
  list: List,
  "alert-triangle": AlertTriangle,
  "id-card": IdCard,
  "dollar-sign": DollarSign,
  "plus-circle": PlusCircle,
  search: Search,
  "alert-circle": AlertCircle,
  "file-text": FileText,
  "graduation-cap": GraduationCap,
  "credit-card": CreditCard,
  tag: Tag,
  percent: Percent,
  "arrow-right": ArrowRight,
  bell: Bell,
  "chevron-down": ChevronDown,
  SquareArrowOutUpRight:SquareArrowOutUpRight,
  Projector:Projector,
  Accessibility:Accessibility,
  HousePlus:HousePlus,
  Banknote:Banknote
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const menuItems: MenuItem[] = [
    {
      title: "Quick Links",
      path: "/quick-links",
      icon: "SquareArrowOutUpRight", // Using a generic icon for "Quick Links"
    },
    {
      title: "Front Office",
      path: "/front-office",
      icon: "Projector", // Using "Home" icon as a placeholder for "Front Office"
      subItems: [
        { title: "Admission Enquiry", path: "/front-office/admission-enquiry", icon: "users" },
        { title: "Visitor Book", path: "/front-office/visitor-book", icon: "book" },
        { title: "Phone Call Log", path: "/front-office/phone-call-log", icon: "phone" },
        { title: "Postal Dispatch", path: "/front-office/postal-dispatch", icon: "mail" },
        { title: "Postal Receive", path: "/front-office/postal-receive", icon: "mail" },
        { title: "Complain", path: "/front-office/complain", icon: "message-square" },
        { title: "Setup Front Office", path: "/front-office/setup-front-office", icon: "settings" },
      ],
    },
    {
      title: "Student Information",
      path: "/student-information",
      icon: "users",
      subItems: [
        { title: "Student Details", path: "/student-information/student-details", icon: "user" },
        { title: "Student Admission", path: "/student-information/student-admission", icon: "file-plus" },
        { title: "Online Admission", path: "/student-information/online-admission", icon: "globe" },
        { title: "Disabled Students", path: "/student-information/disabled-students", icon: "Accessibility" },
        { title: "Multi Class Student", path: "/student-information/multi-class-student", icon: "users" },
        { title: "Bulk Delete", path: "/student-information/bulk-delete", icon: "trash2" },
        { title: "Student Categories", path: "/student-information/student-categories", icon: "list" },
        { title: "Student House", path: "/student-information/student-house", icon: "HousePlus" },
        { title: "Disable Reason", path: "/student-information/disable-reason", icon: "alert-triangle" },
        { title: "Student ID Cards", path: "/student-information/student-id-cards", icon: "id-card" },
      ],
    },
    {
      title: "Fees Collection",
      path: "/fees-collection",
      icon: "Banknote",
      subItems: [
        { title: "Collect Fees", path: "/fees-collection/collect-fees", icon: "plus-circle" },
        { title: "Search Fees Payment", path: "/fees-collection/search-fees-payment", icon: "search" },
        { title: "Search Due Fees", path: "/fees-collection/search-due-fees", icon: "alert-circle" },
        { title: "Fees Master", path: "/fees-collection/fees-master", icon: "file-text" },
        { title: "Fees Master College", path: "/fees-collection/fees-master-college", icon: "graduation-cap" },
        { title: "Fees Group", path: "/fees-collection/fees-group", icon: "users" },
        { title: "Fees Type", path: "/fees-collection/fees-type", icon: "list" },
        { title: "Bank Account", path: "/fees-collection/bank-account", icon: "credit-card" },
        { title: "Fees Category", path: "/fees-collection/fees-category", icon: "tag" },
        { title: "Fees Discount", path: "/fees-collection/fees-discount", icon: "percent" },
        { title: "Fees Carry Forward", path: "/fees-collection/fees-carry-forward", icon: "arrow-right" },
        { title: "Fees Reminder", path: "/fees-collection/fees-reminder", icon: "bell" },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isActive = item.path ? pathname === item.path : false;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;

    return (
      <li key={item.title}>
        <Link
          href={item.path || "#"}
          className={`flex items-center p-3 text-slate-700 hover:bg-slate-200/50 transition-colors duration-200 ${
            isActive ? "bg-darkmode-700 text-white" : ""
          } ${level > 0 ? "pl-8" : ""}`}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleMenu(item.title);
            }
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <IconComponent size={20} />
          </div>
          <div className="flex-1 flex items-center justify-between font-medium">
            {item.title}
            {hasSubItems && (
              <div
                className={`w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={16} />
              </div>
            )}
          </div>
        </Link>
        {hasSubItems && isOpen && (
          <ul className="space-y-1">{item.subItems!.map((subItem) => renderMenuItem(subItem, level + 1))}</ul>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-60 text-slate-700 bg-white/80 rounded shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 w-64 bg-slate-100 p-4 overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:min-h-0 dark:bg-darkmode-800 dark:text-slate-300 z-50`}
        style={{ top: "80px", height: "calc(100vh - 80px)" }} // Moved sidebar down further
      >
        <ul className="space-y-2 pb-4 pt-4">{menuItems.map((item) => renderMenuItem(item))}</ul>
      </nav>
    </>
  );
};

export default Sidebar;
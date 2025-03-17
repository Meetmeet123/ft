// src/app/sidebar/sidebar.tsx
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
  FileText,
  Calendar,
  Edit,
  Users,
  Trello,
  Activity,
  Zap,
  ChevronDown,
  Menu,
} from "lucide-react";

// Define types for menu items
interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  subItems?: MenuItem[];
}

// Map icon strings to Lucide components
const iconMap = {
  home: Home,
  box: Box,
  "shopping-bag": ShoppingBag,
  inbox: Inbox,
  "hard-drive": HardDrive,
  "credit-card": CreditCard,
  "message-square": MessageSquare,
  "file-text": FileText,
  calendar: Calendar,
  edit: Edit,
  users: Users,
  trello: Trello,
  activity: Activity,
  zap: Zap,
  "chevron-down": ChevronDown,
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
      title: "Dashboard",
      icon: "home",
      subItems: [
        { title: "Overview 1", path: "/dashboard/overview-1", icon: "activity" },
        { title: "Overview 2", path: "/dashboard/overview-2", icon: "activity" },
        { title: "Overview 3", path: "/dashboard/overview-3", icon: "activity" },
        { title: "Overview 4", path: "/", icon: "activity" },
      ],
    },
    {
      title: "Menu Layout",
      icon: "box",
      subItems: [
        { title: "Side Menu", path: "/menu/side", icon: "activity" },
        { title: "Simple Menu", path: "/menu/simple", icon: "activity" },
        { title: "Top Menu", path: "/menu/top", icon: "activity" },
      ],
    },
    {
      title: "E-Commerce",
      icon: "shopping-bag",
      subItems: [
        { title: "Categories", path: "/ecommerce/categories", icon: "activity" },
        { title: "Add Product", path: "/ecommerce/add-product", icon: "activity" },
        {
          title: "Products",
          icon: "activity",
          subItems: [
            { title: "Product List", path: "/ecommerce/product-list", icon: "zap" },
            { title: "Product Grid", path: "/ecommerce/product-grid", icon: "zap" },
          ],
        },
        {
          title: "Transactions",
          icon: "activity",
          subItems: [
            { title: "Transaction List", path: "/ecommerce/transaction-list", icon: "zap" },
            { title: "Transaction Detail", path: "/ecommerce/transaction-detail", icon: "zap" },
          ],
        },
        {
          title: "Sellers",
          icon: "activity",
          subItems: [
            { title: "Seller List", path: "/ecommerce/seller-list", icon: "zap" },
            { title: "Seller Detail", path: "/ecommerce/seller-detail", icon: "zap" },
          ],
        },
        { title: "Reviews", path: "/ecommerce/reviews", icon: "activity" },
      ],
    },
    { title: "Inbox", path: "/inbox", icon: "inbox" },
    { title: "File Manager", path: "/file-manager", icon: "hard-drive" },
    { title: "Point of Sale", path: "/pos", icon: "credit-card" },
    { title: "Chat", path: "/chat", icon: "message-square" },
    { title: "Post", path: "/post", icon: "file-text" },
    { title: "Calendar", path: "/calendar", icon: "calendar" },
    {
      title: "Crud",
      icon: "edit",
      subItems: [
        { title: "Data List", path: "/crud/data-list", icon: "activity" },
        { title: "Form", path: "/crud/form", icon: "activity" },
      ],
    },
    {
      title: "Users",
      icon: "users",
      subItems: [
        { title: "Layout 1", path: "/users/layout-1", icon: "activity" },
        { title: "Layout 2", path: "/users/layout-2", icon: "activity" },
        { title: "Layout 3", path: "/users/layout-3", icon: "activity" },
      ],
    },
    {
      title: "Profile",
      icon: "trello",
      subItems: [
        { title: "Overview 1", path: "/profile/overview-1", icon: "activity" },
        { title: "Overview 2", path: "/profile/overview-2", icon: "activity" },
        { title: "Overview 3", path: "/profile/overview-3", icon: "activity" },
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
        className={`fixed top-0 left-0 w-64 min-h-screen bg-slate-100 p-4 overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:min-h-0 dark:bg-darkmode-800 dark:text-slate-300 z-50`}
      >
        <ul className="space-y-2 mt-16 pb-4">{menuItems.map((item) => renderMenuItem(item))}</ul>
      </nav>
    </>
  );
};

export default Sidebar;
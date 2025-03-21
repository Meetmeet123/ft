// src/components/SideSubMenu.tsx
"use client";

import React from 'react';
import { LucideIcon, Image, Video, File, Users, Trash } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
}

const SideSubMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    { href: "/images", label: "Images", icon: Image, isActive: true },
    { href: "/videos", label: "Videos", icon: Video },
    { href: "/documents", label: "Documents", icon: File },
    { href: "/shared", label: "Shared", icon: Users },
    { href: "/trash", label: "Trash", icon: Trash },
  ];

  return (
    <div className="intro-y box p-5 mt-6 bg-white dark:bg-darkmode-700 rounded-md shadow-md md:w-64">
      <div className="mt-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center px-3 py-2 mt-2 rounded-md w-full ${
              item.isActive
                ? 'bg-primary text-white font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkmode-600'
            }`}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideSubMenu;
// src/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define types for menu items
interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  subItems?: MenuItem[];
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home',
      subItems: [
        { title: 'Overview 1', path: '/dashboard/overview-1', icon: 'activity' },
        { title: 'Overview 2', path: '/dashboard/overview-2', icon: 'activity' },
        { title: 'Overview 3', path: '/dashboard/overview-3', icon: 'activity' },
        { title: 'Overview 4', path: '/', icon: 'activity' },
      ],
    },
    {
      title: 'Menu Layout',
      icon: 'box',
      subItems: [
        { title: 'Side Menu', path: '/menu/side', icon: 'activity' },
        { title: 'Simple Menu', path: '/menu/simple', icon: 'activity' },
        { title: 'Top Menu', path: '/menu/top', icon: 'activity' },
      ],
    },
    {
      title: 'E-Commerce',
      icon: 'shopping-bag',
      subItems: [
        { title: 'Categories', path: '/ecommerce/categories', icon: 'activity' },
        { title: 'Add Product', path: '/ecommerce/add-product', icon: 'activity' },
        {
          title: 'Products',
          icon: 'activity',
          subItems: [
            { title: 'Product List', path: '/ecommerce/product-list', icon: 'zap' },
            { title: 'Product Grid', path: '/ecommerce/product-grid', icon: 'zap' },
          ],
        },
        // Add more sub-items as needed
      ],
    },
    { title: 'Inbox', path: '/inbox', icon: 'inbox' },
    { title: 'File Manager', path: '/file-manager', icon: 'hard-drive' },
    // Add more items as per your original menu
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isActive = item.path ? pathname === item.path : false;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);

    return (
      <li key={item.title}>
        <a
          href={item.path || '#'}
          className={`side-menu ${isActive ? 'side-menu--active' : ''}`}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleMenu(item.title);
            }
          }}
        >
          <div className="side-menu__icon">
            <i data-lucide={item.icon}></i>
          </div>
          <div className="side-menu__title">
            {item.title}
            {hasSubItems && (
              <div className={`side-menu__sub-icon ${isOpen ? 'transform rotate-180' : ''}`}>
                <i data-lucide="chevron-down"></i>
              </div>
            )}
          </div>
        </a>
        {hasSubItems && isOpen && (
          <ul className={isOpen ? 'side-menu__sub-open' : ''}>
            {item.subItems!.map((subItem) => renderMenuItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="side-nav">
      <ul>{menuItems.map((item) => renderMenuItem(item))}</ul>
    </nav>
  );
};

export default Sidebar;
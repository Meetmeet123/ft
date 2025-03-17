'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Dynamic breadcrumbs based on pathname
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter((segment) => segment);
    const breadcrumbs = [
      { title: 'Application', path: '/' },
      ...pathSegments.map((segment, index) => ({
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: `/${pathSegments.slice(0, index + 1).join('/')}`,
      })),
    ];
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
      <div className="h-full flex items-center">
        {/* BEGIN: Logo */}
        <Link href="/" className="logo -intro-x hidden md:flex xl:w-[180px] block">
          {/* <img
            alt="Enigma - Admin Template"
            className="logo__image w-6"
            src="/logo.svg" // Adjust the path to your logo
          /> */}
          <span className="logo__text text-white text-lg ml-3">Enigma</span>
        </Link>
        {/* END: Logo */}

        {/* BEGIN: Breadcrumb */}
        <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
          <ol className="breadcrumb breadcrumb-light">
            {breadcrumbs.map((item, index) => (
              <li
                key={item.path}
                className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
                aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
              >
                {index === breadcrumbs.length - 1 ? (
                  item.title
                ) : (
                  <Link href={item.path}>{item.title}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {/* END: Breadcrumb */}

        {/* BEGIN: Search */}
        <div className="intro-x relative mr-3 sm:mr-6">
          <div className="search hidden sm:block">
            <input
              type="text"
              className="search__input form-control border-transparent"
              placeholder="Search..."
            />
            <i data-lucide="search" className="search__icon dark:text-slate-500"></i>
          </div>
          <a
            className="notification notification--light sm:hidden"
            href="#"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <i data-lucide="search" className="notification__icon dark:text-slate-500"></i>
          </a>
          {isSearchOpen && (
            <div className="search-result">
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                  <a href="#" className="flex items-center">
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                      <i className="w-4 h-4" data-lucide="inbox"></i>
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </a>
                  {/* Add more search items as needed */}
                </div>
                {/* Add more sections like Users, Products */}
              </div>
            </div>
          )}
        </div>
        {/* END: Search */}

        {/* BEGIN: Notifications */}
        <div className="intro-x dropdown mr-4 sm:mr-6">
          <div
            className="dropdown-toggle notification notification--bullet cursor-pointer"
            role="button"
            aria-expanded={isNotificationsOpen}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <i data-lucide="bell" className="notification__icon dark:text-slate-500"></i>
          </div>
          {isNotificationsOpen && (
            <div className="notification-content pt-2 dropdown-menu">
              <div className="notification-content__box dropdown-content">
                <div className="notification-content__title">Notifications</div>
                <div className="cursor-pointer relative flex items-center">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Enigma - Admin Template"
                      className="rounded-full"
                      src="/profile-15.jpg" // Adjust path
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="#" className="font-medium truncate mr-5">Christian Bale</a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">06:05 AM</div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      It is a long established fact that a reader will be distracted...
                    </div>
                  </div>
                </div>
                {/* Add more notification items */}
              </div>
            </div>
          )}
        </div>
        {/* END: Notifications */}

        {/* BEGIN: Account Menu */}
        <div className="intro-x dropdown w-8 h-8">
          <div
            className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            role="button"
            aria-expanded={isAccountOpen}
            onClick={() => setIsAccountOpen(!isAccountOpen)}
          >
            <img alt="Enigma - Admin Template" src="/profile-5.jpg" /> {/* Adjust path */}
          </div>
          {isAccountOpen && (
            <div className="dropdown-menu w-56">
              <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <li className="p-2">
                  <div className="font-medium">Christian Bale</div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">Backend Engineer</div>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <Link href="/profile" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="user" className="w-4 h-4 mr-2"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link href="/add-account" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="edit" className="w-4 h-4 mr-2"></i> Add Account
                  </Link>
                </li>
                <li>
                  <Link href="/reset-password" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="lock" className="w-4 h-4 mr-2"></i> Reset Password
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="help-circle" className="w-4 h-4 mr-2"></i> Help
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <Link href="/logout" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="toggle-right" className="w-4 h-4 mr-2"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* END: Account Menu */}
      </div>
    </div>
  );
};

export default Header;
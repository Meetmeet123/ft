'use client';

import "../app/globals.css";
import type { Metadata } from "next";
import Header from "./header";
import Sidebar from "./sidebar/layout";
import "../public/dist/css/app.css";
import Login from "./login/page";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
      
      // Handle public routes that don't require authentication
      const publicRoutes = ['/login', '/register', '/forgot-password'];
      const isPublicRoute = pathname &&  publicRoutes.includes(pathname);

      if (!token && !isPublicRoute) {
        // Not logged in and trying to access protected route
        router.push('/login');
      } else if (token && isPublicRoute) {
        // Logged in and trying to access auth pages
        router.push('/admin/dashboard');
      }
      
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname, router]);

  if (isLoading) {
    return (
      <html lang="en" className="light">
        <body className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={darkMode ? "dark" : "light"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="DLT admin panel..." />
        <meta name="keywords" content="Admin Panel, Dashboard, DLT..." />
        <meta name="author" content="LEFT4CODE" />
        <link rel="stylesheet" href="/dist/css/app.css" />
      </head>
      <body className="py-5 md:py-0">
        {isLoggedIn ? (
          <>
            <Header />
            <div className="flex overflow-hidden">
              <Sidebar />
              <main
                className="content w-full md:ml-64"
                style={{ minHeight: "calc(100vh - 65px)" }}
              >
                {children}
              </main>
            </div>
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
            >
              <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
              <div className="dark-mode-switcher__toggle border"></div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </body>
    </html>
  );
}

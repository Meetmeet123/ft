"use client";
import React from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import Captcha from './Captcha';

const Users: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-medium">Captcha Setting</h1>
          </div>
        </div>
        <Captcha />
      </div>
    </div>
  );
};

export default Users;

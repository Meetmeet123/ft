"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Purpose from "../Purpose/page";
import Reference from "../Reference/page";
import ComplainType from "../ComplainType/page";
import SourceFrom from "./SourceFrom/SourceFrom";
import SourceList from "./SourceList/SourceList";

interface Source {
  id: number;
  source: string;
  description: string;
}

const SetupFrontOffice = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("source");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editData, setEditData] = useState<Source | null>(null);

  useEffect(() => {
    const path = pathname.toLowerCase();
    if (path.includes("purpose")) {
      setActiveLink("purpose");
    } else if (path.includes("complain-type")) {
      setActiveLink("complain-type");
    } else if (path.includes("reference")) {
      setActiveLink("reference");
    } else if (path.includes("source")) {
      setActiveLink("source");
    }
  }, [pathname]);

  const SourceContent = () => {
    const handleRefresh = () => {
      setRefreshKey(prev => prev + 1);
      setEditData(null);
    };

    return (
      <div className="xl:w-full h-fit flex flex-row gap-6">
        {/* Form Section */}
        <div className="w-2/5">
          <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
            <div className="text-[#444] text-xl font-extrabold block p-6 relative">
              <h3>{editData ? "Edit Source" : "Add Source"}</h3>
            </div>
            <div className="p-5">
              <SourceFrom 
                editData={editData} 
                refreshList={handleRefresh} 
              />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="w-3/5">
          <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
            <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
              <h3>Source List</h3>
            </div>
            <div className="p-6">
              <SourceList 
                onEdit={(data) => setEditData(data)}
                refreshKey={refreshKey}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    try {
      switch (activeLink) {
        case "purpose":
          return (
            <div className="flex flex-row gap-6">
              <Purpose />
            </div>
          );
        case "complain-type":
          return (
            <div className="flex flex-row gap-6">
              <ComplainType />
            </div>
          );
        case "reference":
          return (
            <div className="flex flex-row gap-6">
              <Reference />
            </div>
          );
        case "source":
          return <SourceContent />;
        default:
          return <div>Please select an option from the menu.</div>;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return <div>Error rendering content: {error.message}</div>;
      }
      return <div>An unexpected error occurred</div>;
    }
  };

  return (
    <div className="mt-10 h-fit flex flex-row px-5" style={{ marginLeft: "120px" }}>
      {/* Side Submenu (20%) */}
      <div className="w-1/5">
        <div className="relative min-h-[200px]">
          <div className="border-solid border-l-2 border-[#164f63]/60 p-2">
            {/* Green active indicator */}
            <div
              className="absolute left-0 w-[2.4px] h-6 bg-green-600 transition-all duration-300 ease-in-out"
              style={{
                top: activeLink === "purpose" 
                  ? "3px"
                  : activeLink === "complain-type"
                  ? "42px"
                  : activeLink === "reference"
                  ? "74px"
                  : "114px"
              }}
            />
            <div className="flex flex-col gap-4">
              <Link
                href="/front-office/setup-front-office/Purpose"
                className={`text-blue-600 hover:underline ${
                  activeLink === "purpose" ? "font-bold text-blue-800" : ""
                }`}
                onClick={() => setActiveLink("purpose")}
              >
                Purpose
              </Link>
              <Link
                href="/front-office/setup-front-office/ComplainType"
                className={`text-blue-600 hover:underline ${
                  activeLink === "complain-type" ? "font-bold text-blue-800" : ""
                }`}
                onClick={() => setActiveLink("complain-type")}
              >
                Complain Type
              </Link>
              <Link
                href="/front-office/setup-front-office/Reference"
                className={`text-blue-600 hover:underline ${
                  activeLink === "reference" ? "font-bold text-blue-800" : ""
                }`}
                onClick={() => setActiveLink("reference")}
              >
                Reference
              </Link>
              <Link
                href="/front-office/setup-front-office/Source"
                className={`text-blue-600 hover:underline ${
                  activeLink === "source" ? "font-bold text-blue-800" : ""
                }`}
                onClick={() => setActiveLink("source")}
              >
                Source
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Content Section (80%) */}
      <div className="w-4/5">{renderContent()}</div>
    </div>
  );
};

export default SetupFrontOffice;
"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface Discount {
  id: string;
  name: string;
  code: string;
  type: string;
  amount: string;
  displayName: string;
}

const FeesDiscountDetails: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "staff-45": false,
    "sibling-disc": false,
    "handicap-disc": false,
    "cls-top-disc": false,
  });

  const discounts: Discount[] = [
    {
      id: "staff-45",
      name: "staff",
      code: "45",
      type: "Fix",
      amount: "2,80,000.00",
      displayName: "staff - 45",
    },
    {
      id: "sibling-disc",
      name: "Sibling Discount",
      code: "sibling-disc",
      type: "Fix",
      amount: "35,000.00",
      displayName: "Sibling Discount - sibling-disc",
    },
    {
      id: "handicap-disc",
      name: "Handicapped Discount",
      code: "handicap-disc",
      type: "Fix",
      amount: "70,000.00",
      displayName: "Handicapped Discount - handicap-disc",
    },
    {
      id: "cls-top-disc",
      name: "Class Topper Discount",
      code: "cls-top-disc",
      type: "Fix",
      amount: "7,000.00",
      displayName: "Class Topper Discount - cls-top-disc",
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white rounded-md shadow-sm">
      <div className="bg-gray-100 p-5 font-semibold text-lg border-b">
        Fees Discount Details
      </div>

      {discounts.map((discount) => (
        <div key={discount.id} className="border-b">
          {/* Header row */}
          <div className="flex items-center px-5 py-3 border-b bg-gray-50">
            <Plus onClick={() => toggleSection(discount.id)} className="mr-2 cursor-pointer" />
            <input type="checkbox" className="mr-2" />
            <span>{discount.displayName}</span>
          </div>

          {/* Collapsible content */}
          {expandedSections[discount.id] && (
            <div>
              {/* Table header */}
              <div className="grid grid-cols-4 px-5 py-3 border-b">
                <div className="font-medium text-gray-700">Name</div>
                <div className="font-medium text-gray-700">Discount Code</div>
                <div className="font-medium text-gray-700">Type</div>
                <div className="font-medium text-gray-700 text-right">Amount (₹)</div>
              </div>

              {/* Table data */}
              <div className="grid grid-cols-4 px-5 py-3">
                <div>{discount.name}</div>
                <div>{discount.code}</div>
                <div>{discount.type}</div>
                <div className="text-right">{discount.amount} (₹)</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeesDiscountDetails;

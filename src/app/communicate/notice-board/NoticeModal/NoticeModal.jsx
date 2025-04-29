"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";
import { RiAdminLine } from "react-icons/ri";
import { FaParachuteBox } from "react-icons/fa";

const NoticeModal = ({ notice, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-end z-50">
      <div
        className={`bg-white h-800 w-1/3 p-6 relative shadow-lg overflow-y-auto transition-transform duration-800 transform ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
      >


        <div className="flex text-xl font-semibold mb-2 border-b pb-2">
          <div className="text-green-500 mt-1"><FaArrowLeft /></div>
          <div><h2 className="ml-4 ">{notice.title}</h2></div>
          <div className="text-green-500"> <button
            onClick={onClose}
            className="absolute top-5 right-4  hover:text-black text-xl font-semibold"
          >
            ✕
          </button></div>
        </div>
        <div>{notice.message}</div>
        <div className="mt-4 ">

          
          <div className="py-2 pt-4 border-b pb-2">
            <div className="flex">
              <div className="px-2"><CiCalendarDate /></div>
              <div>Publish Date: {notice.publishDate}</div>
            </div>
            <div className="flex">
              <div className="px-2"><HiCalendarDateRange /></div>
              <div>Notice Date:{notice.noticeDate}</div>
            </div>
            <div className="flex">
              <div className="px-2"><RiAdminLine /></div>
              <div>Created By:{"Joe Black (9000)"}</div>
            </div>


          </div>

          {notice.attachment && (
            <p><strong>Attachment:</strong> {notice.attachment}</p>
          )}

          <div className="mt-4 ">
            <p className=" text-xl"><strong>Message To:</strong></p>

            <div className="flex flex-wrap gap-4 mt-2">
              {notice.student && (
                <div className="flex items-center gap-2 text-sm">
                  <FaParachuteBox />
                  <p>{notice.student}</p>
                </div>
              )}

              {notice.admin && (
                <div className="flex items-center gap-2 text-sm">
                  <FaParachuteBox />
                  <p>{notice.admin}</p>
                </div>
              )}

              {notice.parent && (
                <div className="flex items-center gap-2 text-sm">
                  <FaParachuteBox />
                  <p>{notice.parent}</p>
                </div>
              )}

              {notice.teacher && (
                <div className="flex items-center gap-2 text-sm">
                  <FaParachuteBox />
                  <p>{notice.teacher}</p>
                </div>
              )}

              {/* Add more roles if needed */}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NoticeModal;





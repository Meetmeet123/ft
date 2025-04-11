// "use client";
// import dynamic from "next/dynamic";
// // import { MdOutlineEmail } from "react-icons/md";
// import { MdOutlineEmail, MdEdit, MdDelete } from "react-icons/md";
// import { IoMdAdd } from "react-icons/io";

// // Dynamically import the component to ensure it only renders on the client
// const NoticeBoard = () => {

//     const notices = [
//         "Summer Vacation",
//         "Staff Meeting",
//         "Parent Teacher Meeting",
//         "Student Health Check-up",
//         "Notice for New Book Collection",
//         "Online Learning Notice"
//     ];

//     return (
//         <div className="mt-6 intro-y col-span-12 lg:col-span-6">
//             <div className="intro-y box p-3">
//                 <div className="sm:flex-row items-center  border-b border-slate-200/60 dark:border-darkmode-400">
//                     <div className="flex p-2">
//                         <h2 className="font-medium text-lg mr-auto">Notice Board</h2>
//                         <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded">
//                         <IoMdAdd className="text-white" /> Post New Message
//                         </button>
//                     </div>

//                     <div>
//                         {notices.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="relative group flex justify-between items-center border-t border-slate-300 dark:border-darkmode-400 py-2 px-3 text-green-600 text-lg cursor-pointer"
//                             >
//                                 {/* Left: Icon + Text */}
//                                 <div className="flex items-center gap-2">
//                                     <MdOutlineEmail />
//                                     {item}
//                                 </div>

//                                 {/* Right: Hidden icons on hover */}
//                                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                     <MdEdit className="text-blue-500 hover:text-blue-700" />
//                                     <MdDelete className="text-red-500 hover:text-red-700" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>



//                 </div>


//             </div>
//         </div>
//     );
// };

// // Export with dynamic import to prevent SSR
// export default dynamic(() => Promise.resolve(NoticeBoard), {
//     ssr: false,
//     loading: () => (
//         <div className="mt-16 intro-y col-span-12 lg:col-span-6">
//             <div className="intro-y box p-5">
//                 <p>Loading form...</p>
//             </div>
//         </div>
//     ),
// });
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MdOutlineEmail, MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const NoticeBoard = () => {
  const router = useRouter();

  const notices = [
    "Summer Vacation",
    "Staff Meeting",
    "Parent Teacher Meeting",
    "Student Health Check-up",
    "Notice for New Book Collection",
    "Online Learning Notice",
  ];
   function PostNoticePage() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">📝 Post a New Notice</h2>
        <p>This is where you can build your notice posting form.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6 intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-3">
        <div className="sm:flex-row items-center border-b border-slate-200/60 dark:border-darkmode-400 mb-3">
          <div className="flex p-2 justify-between w-full items-center">
            <h2 className="font-medium text-lg">Notice Board</h2>
            <button
              type="button"
              onClick={() => router.push("/notice/post") }
              className="btn btn-primary bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <IoMdAdd className="text-white text-xl" />
              Post New Message
            </button>
          </div>
        </div>

        {/* Notice List */}
        <div>
          {notices.map((item, index) => (
            <div
              key={index}
              className="relative group flex justify-between items-center border-t border-slate-300 dark:border-darkmode-400 py-2 px-3 text-green-600 text-lg cursor-pointer"
            >
              {/* Left: Email Icon + Text */}
              <div className="flex items-center gap-2">
                <MdOutlineEmail />
                {item}
              </div>

              {/* Right: Edit/Delete Icons (only on hover) */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <MdEdit className="text-blue-500 hover:text-blue-700" />
                <MdDelete className="text-red-500 hover:text-red-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export dynamically to avoid SSR in Next.js
export default dynamic(() => Promise.resolve(NoticeBoard), {
  ssr: false,
  loading: () => (
    <div className="mt-16 intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-5">
        <p>Loading form...</p>
      </div>
    </div>
  ),
});


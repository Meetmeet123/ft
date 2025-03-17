// "use client";

// import { useState } from "react";

// export default function Page() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-gray-800 text-white p-4 text-center font-bold text-lg">
//         My Next.js App
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center justify-center p-6">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Show Slide Over
//         </button>
//       </main>

//       {/* Slide Over */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
//           <div className="bg-white w-80 h-full shadow-lg p-5 relative">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-600"
//             >
//               &times;
//             </button>
//             <h2 className="text-lg font-semibold mb-4">Broadcast Message</h2>
//             <div className="space-y-4">
//               <input className="w-full border p-2 rounded" type="text" placeholder="From" />
//               <input className="w-full border p-2 rounded" type="text" placeholder="To" />
//               <input className="w-full border p-2 rounded" type="text" placeholder="Subject" />
//               <textarea className="w-full border p-2 rounded" placeholder="Message"></textarea>
//             </div>
//             <div className="mt-4 flex justify-end gap-2">
//               <button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded">
//                 Cancel
//               </button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
//         &copy; {new Date().getFullYear()} My Next.js App
//       </footer>
//     </div>
//   );
// }


// src/app/page.tsx
// src/app/page.tsx
import Header from './header';
import Sidebar from './sidebar/layout';

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', marginTop: '65px' }}>
        <main style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <h1>Welcome to the Homepage</h1>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  );
}
"use client";
import dynamic from "next/dynamic";

// Dynamically import the component to ensure it only renders on the client
const NoticeBoard = () => {



    return (
        <div className="mt-6 intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box p-5">
                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">Form Validation</h2>
                </div>

            </div>
        </div>
    );
};

// Export with dynamic import to prevent SSR
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

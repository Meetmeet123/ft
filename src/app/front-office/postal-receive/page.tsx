"use client";
import React from "react";
import PostalReceiveForm from "./PostalReceiveForm/PostalReceiveForm";
import PostalRecevieList from "./PostalReceiveList/PostalRecevieList";

const PostalDispatch = () => {
  return (
    <div
      className="ml-5 mt-10 xl:w-1230px h-fit flex flex-row gap-6"
      style={{ marginLeft: "150px" }}
    >
      {/* Form Section */}
      <div className="w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>Add Postal Receive</h3>
          </div>
          <div className="p-5">
            <PostalReceiveForm />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-3/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Postal Receive List</h3>
          </div>
          <div className="p-6">
            <PostalRecevieList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostalDispatch;
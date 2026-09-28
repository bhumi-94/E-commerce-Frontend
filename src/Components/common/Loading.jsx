import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[500px] bg-[#FCFBF3] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#f0dfd4] border-t-[#8b3905] rounded-full animate-spin" />

        <p className="text-sm text-gray-500">Loading your orders...</p>
      </div>
    </div>
  );
};

export default Loading;

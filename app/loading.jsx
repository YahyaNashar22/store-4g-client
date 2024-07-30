import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <p className="mt-4 text-2xl font-bold text-blue-500 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;

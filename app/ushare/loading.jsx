import React from "react";

const Loading = () => {
  return (
    <div className="m-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <p className="mt-4 text-2xl font-bold text-blue-500 animate-pulse">
          Getting your bundles
          <br />
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;

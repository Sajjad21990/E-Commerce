import React from "react";

const Toast = () => {
  return (
    <div className="flex justify-center fixed top-20 left-1/6 w-full z-50">
      <div
        className="bg-red-100 border-l-4 border-red-400 text-red-700 w-auto px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Holy smokes! </strong>
        <span className="block sm:inline">
          Something seriously bad happened.
        </span>
      </div>
    </div>
  );
};

export default Toast;

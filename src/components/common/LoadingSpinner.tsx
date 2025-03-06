import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h3>잠시만 기다려 주세요.</h3>
      <RingLoader color="#6A31F6" />
    </div>
  );
};

export default LoadingSpinner;

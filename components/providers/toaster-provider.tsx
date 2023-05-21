"use client";

import { Toaster } from "sonner";

const ToasterProvider = () => {
  return (
    <div className="relative z-[100]">
      <Toaster position="top-center" />
    </div>
  );
};

export default ToasterProvider;

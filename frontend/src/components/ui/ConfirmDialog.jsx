import React from "react";
import { AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

const ConfirmDialog = ({ onConfirm, onCancel, message }) => {
  
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      onCancel(); 
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-[#0F172A] p-6 rounded-lg shadow-lg transform translate-x-8"
        onClick={(e) => e.stopPropagation()} 
      >
        <AlertDescription className="text-white text-lg text-center">{message}</AlertDescription>
        <div className="flex justify-end space-x-4 mt-4">
          <Button
            variant="outline"
            size="default"
            onClick={onCancel}
            className="text-[#60A5FA] border-[#60A5FA] hover:bg-[#60A5FA] hover:text-[#0F172A]"
          >
            No
          </Button>
          <Button
            variant="destructive"
            size="default"
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

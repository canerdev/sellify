import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

const ConfirmDialog = ({ onConfirm, onCancel, message }) => {
  return (
    <Alert className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <AlertTitle>Are you sure?</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" size="default" onClick={onCancel}>
            No
          </Button>
          <Button variant="destructive" size="default" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default ConfirmDialog;

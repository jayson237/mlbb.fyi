"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shared/dialog";

interface FolDialogProps {
  children: React.ReactNode;
  triggerChild: React.ReactNode;
  title: string;
  description?: string;
}

const FolDialog = ({
  children,
  triggerChild,
  title,
  description,
}: FolDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="h-96">
          <DialogTitle>{title}</DialogTitle>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          {/* <div className="overflow-auto h-fit">{children}</div> */}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FolDialog;

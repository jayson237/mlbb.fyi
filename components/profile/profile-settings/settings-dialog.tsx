"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog";

interface SettingsDialogProps {
  children: React.ReactNode;
  triggerChild: React.ReactNode;
  title: string;
  description?: string;
}

const SettingsDialog = ({
  children,
  triggerChild,
  title,
  description,
}: SettingsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="h-fit">
        <DialogTitle className="flex justify-center">{title}</DialogTitle>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          {/* <div className="overflow-auto h-fit">{children}</div> */}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

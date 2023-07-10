"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog";

interface DialogFitProps {
  children: React.ReactNode;
  triggerChild: React.ReactNode;
  title: string;
  description?: string;
}

const DialogFit = ({
  children,
  triggerChild,
  title,
  description,
}: DialogFitProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="h-fit">
        <DialogTitle className="flex justify-center">{title}</DialogTitle>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFit;

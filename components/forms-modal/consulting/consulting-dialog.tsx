"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ConsultingForm } from "@/components/forms-modal/consulting/consulting-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ConsultingDialogProps = {
  buttonText: string;
  dialogTitle: string;
  dialogDescription: string;
  successMessage: string;
};

export function ConsultingDialog({
  buttonText,
  dialogTitle,
  dialogDescription,
  successMessage,
}: ConsultingDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    toast.success(successMessage);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary h-9 px-6 text-sm hover:text-white md:h-12 md:px-16 md:text-base"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <ConsultingForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

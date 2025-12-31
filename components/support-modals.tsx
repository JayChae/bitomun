"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SUPPORT_LIGHTING_ADDRESS,
  SUPPORT_LIGHTING_ADDRESS_QR,
  SUPPORT_ONCHAIN_ADDRESS,
  SUPPORT_ONCHAIN_ADDRESS_QR,
} from "@/constants";

import CopyButton from "./copy-button";

interface SupportModalProps {
  type: "onchain" | "lightning";
  trigger: ReactNode;
}

export default function SupportModal({ type, trigger }: SupportModalProps) {
  const tAction = useTranslations("action");
  const tModal = useTranslations("supportModal");

  const config = {
    onchain: {
      title: tModal("onchain.title"),
      description: tModal("onchain.description"),
      address: SUPPORT_ONCHAIN_ADDRESS,
      addressQR: SUPPORT_ONCHAIN_ADDRESS_QR,
    },
    lightning: {
      title: tModal("lightning.title"),
      description: tModal("lightning.description"),
      address: SUPPORT_LIGHTING_ADDRESS,
      addressQR: SUPPORT_LIGHTING_ADDRESS_QR,
    },
  };

  const {
    title,
    description,
    address: ADDRESS,
    addressQR: ADDRESS_QR,
  } = config[type];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto mt-4 space-y-4">
          {/* QR Code */}
          <Image
            src={ADDRESS_QR}
            alt="Onchain QR Code"
            width={250}
            height={250}
            className="mx-auto"
          />

          {/* Address */}
          <div className="space-y-2">
            <input
              type="text"
              value={ADDRESS}
              readOnly
              className="w-full rounded-lg bg-zinc-900 p-3 font-mono text-xs text-gray-300"
            />
            <div className="flex justify-center">
              <CopyButton
                text={ADDRESS}
                copyText={tAction("clipboard.copy")}
                copiedText={tAction("clipboard.copy")}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

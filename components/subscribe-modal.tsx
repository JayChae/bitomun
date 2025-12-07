"use client";

import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SubscribeModalProps = {
  children: ReactNode;
};

export default function SubscribeModal({ children }: SubscribeModalProps) {
  const t = useTranslations("subscribe");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 프론트엔드 이메일 검증
    if (!validateEmail(email)) {
      toast.error(t("errors.invalidEmail"));
      return;
    }

    setIsSubmitting(true);

    try {
      // 스프레드시트 저장 API 호출
      const spreadsheetResponse = await fetch("/api/spreadsheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await spreadsheetResponse.json();

      if (!spreadsheetResponse.ok) {
        // errorCode 기반 다국어 에러 메시지 표시
        const errorCode = data.errorCode;
        let errorMessage = t("error");

        switch (errorCode) {
          case "INVALID_EMAIL":
            errorMessage = t("errors.invalidEmail");
            break;
          case "REQUIRED_FIELDS":
            errorMessage = t("errors.requiredFields");
            break;
          case "DUPLICATE_EMAIL":
            errorMessage = t("errors.duplicateEmail");
            break;
          case "SPREADSHEET_ERROR":
            errorMessage = t("errors.spreadsheetError");
            break;
          case "SERVER_ERROR":
            errorMessage = t("errors.serverError");
            break;
          case "TOO_MANY_REQUESTS":
            errorMessage = t("errors.tooManyRequests");
            break;
          default:
            errorMessage = t("error");
        }

        toast.error(errorMessage);
        return;
      }

      // 성공: 토스트 띄우고 모달 닫기
      toast.success(t("success"));
      setOpen(false);

      // 폼 초기화
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
      // 네트워크 오류 등
      toast.error(t("errors.networkError"));
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fields.name")}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t("fields.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("fields.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("fields.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

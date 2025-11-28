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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 이메일 전송 API 호출
      // const emailResponse = await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ name, email }),
      // });

      // 스프레드시트 저장 API 호출
      const spreadsheetResponse = await fetch("/api/spreedsheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await spreadsheetResponse.json();

      if (!spreadsheetResponse.ok) {
        // API에서 반환한 에러 메시지 표시
        toast.error(data.error || t("error") || "구독 신청에 실패했습니다.");
        return;
      }

      // 성공: 토스트 띄우고 모달 닫기
      toast.success(t("success") || "구독 신청이 성공적으로 접수되었습니다.");
      setOpen(false);

      // 폼 초기화
      setName("");
      setEmail("");
    } catch {
      toast.error(t("error") || "구독 신청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
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

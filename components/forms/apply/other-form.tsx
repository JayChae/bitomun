"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OtherForm() {
  const t = useTranslations("apply");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/other-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("문의 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting other request:", error);
      toast.error("문의 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (submitted) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-6 text-center">
          <CheckCircle2 className="text-primary mx-auto h-20 w-20" />
          <h2 className="text-4xl font-black">{t("common.submitted.title")}</h2>
          <p className="text-muted-foreground text-xl">
            {t("common.submitted.description")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-border space-y-8 border-2 p-8">
      <div>
        <h2 className="mb-2 text-3xl font-black">
          {t("categories.other.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("categories.other.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t("form.name")} *</Label>
          <Input
            id="name"
            placeholder={t("form.namePlaceholder")}
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("form.email")} *</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("form.phone")}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t("form.phonePlaceholder")}
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t("form.messageOther")} *</Label>
          <Textarea
            id="message"
            placeholder={t("form.messagePlaceholder")}
            required
            rows={8}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="resize-none border-2"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full text-base font-bold"
        >
          {isSubmitting ? t("form.submitting") : t("form.submit")}
        </Button>
      </form>
    </div>
  );
}

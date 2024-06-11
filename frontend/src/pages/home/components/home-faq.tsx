// home-faq.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export function HomeFAQ() {
  const { t } = useTranslation();

  return (
    <div className="px-4 pb-4">
      <h1 className="text-2xl font-semibold">{t("faq")}</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("faq1_question")}</AccordionTrigger>
          <AccordionContent>{t("faq1_answer")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("faq2_question")}</AccordionTrigger>
          <AccordionContent>{t("faq2_answer")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t("faq3_question")}</AccordionTrigger>
          <AccordionContent>{t("faq3_answer")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

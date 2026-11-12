import type { Metadata } from "next";
import Content from "@/content/legal/privacy.mdx";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Falconfio collects, uses and protects personal data, and the rights you have.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="12 November 2026">
      <Content />
    </LegalPage>
  );
}

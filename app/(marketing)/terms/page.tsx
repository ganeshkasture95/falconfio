import type { Metadata } from "next";
import Content from "@/content/legal/terms.mdx";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use the Falconfio website and its free tools.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="12 November 2026">
      <Content />
    </LegalPage>
  );
}

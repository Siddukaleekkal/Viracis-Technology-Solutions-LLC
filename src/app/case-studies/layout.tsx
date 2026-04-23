import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "See how Viracis has helped businesses transform through strategic technology implementation and automation.",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Case Studies",
  description: "Explore how Viracis partners with industry leaders to drive digital transformation through strategic enterprise technology implementation and AI automation.",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

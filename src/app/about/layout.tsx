import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Viracis Technology Solutions, our mission to bridge technology gaps for businesses, and our process for delivering results.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

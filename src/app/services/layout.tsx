import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our technology solutions: AI automation, cloud infrastructure, custom software development, and digital transformation.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

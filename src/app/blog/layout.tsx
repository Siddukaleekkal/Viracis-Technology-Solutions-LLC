import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI, cloud technology, and digital strategy for modern businesses from the Viracis team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

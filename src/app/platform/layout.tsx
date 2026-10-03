import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | Viracis Field Operations OS",
  description:
    "The all-in-one operating system for door-to-door sales and field service operations. Territory turf mapping, live fleet dispatch, doorstep client scheduling, instant invoicing, and 2-way SMS.",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

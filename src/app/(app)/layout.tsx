import type { Metadata } from "next";

import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "Dashboard || Mystry Message",
  description: "Mystry Messages",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

      <Navbar />
      {children}
    </div>

  );
}

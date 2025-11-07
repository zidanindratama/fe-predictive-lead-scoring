import * as React from "react";

export const metadata = {
  title: {
    default: "NAMA WEB",
    template: "NAMA WEB",
  },
  description: "DESKRIPSI WEB",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-[calc(100dvh-64px-200px)]">{children}</main>
    </>
  );
}

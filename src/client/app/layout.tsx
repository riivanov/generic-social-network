'use client';

import { usePathname } from "next/navigation";
import Nav from "./components/nav/nav.component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showLogin = !pathname.includes(`/auth/login`);

  return (
    <html lang="en">
      <body>
        <Nav showLogin={showLogin} />
        {children}
      </body>
    </html>
  );
}

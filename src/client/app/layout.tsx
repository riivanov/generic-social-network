'use client';

import styles from "./layout.module.scss";
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
    <html className={styles.html} lang="en">
      <body className={styles.body}>
        <Nav showLogin={showLogin} />
        {children}
      </body>
    </html>
  );
}

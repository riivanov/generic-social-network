"use client";

import { useRouter } from "next/navigation";
import "./nav.component.scss";

export default function Nav({ showLogin }) {
  const router = useRouter();

  function handleClick() {
    router.push(`/auth/login`);
  }

  return (
    <>
      <nav className="nav">
        {showLogin && <button onClick={handleClick}>Login</button>}
      </nav>
    </>
  );
}

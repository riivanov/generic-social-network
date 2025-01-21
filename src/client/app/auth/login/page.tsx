"use client";

import { APIService } from "app/services/api.service";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./page.module.scss";

export default function LoginComponent() {
  useEffect(() => {
    APIService.instance.fetchPeople();

    return () => {};
  }, []);

  function clicked() {
    console.log("clicked");
  }

  return (
    <>
      <form className={styles.form}>
        {/* TODO(auth): custom input field component */}
        <label>E-mail:</label>
        <input id="user" className="user" type="text" />
        <label>Password:</label>
        <input id="pass" className="pass" type="password" />
        <Link href="/auth/forgot">Forgot your password?</Link>
      </form>
      <button onClick={clicked}>Login</button>
      <div className="register">
        Need an account?<Link href="/auth/register">Register</Link>
      </div>
    </>
  );
}

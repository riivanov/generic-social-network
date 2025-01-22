"use client";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className={styles.iconLabel}>
        <FontAwesomeIcon icon={faUsers} />
        <p className={styles.label}>Login to GSN</p>
      </div>
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

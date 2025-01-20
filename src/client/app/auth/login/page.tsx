"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";
import { APIService } from "app/services/api.service";

export default function Login() {
  useEffect(() => {
    APIService.instance.fetchPeople();

    return () => {}
  }, []);

  function clicked() {
    console.log("clicked");
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          {/* TODO(auth): custom input field component */}
          <label>Username:</label>
          <input id="user" className="user" type="text" />
          <label>Password:</label>
          <input id="pass" className="pass" type="password" />
        </form>
        <button onClick={clicked}>Login</button>
      </div>
    </>
  );
}

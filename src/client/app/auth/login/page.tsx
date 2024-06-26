"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";

export default function Login() {
  // const c = 1;
  useEffect(() => {
    async function getPeople() {
      // call facade / service to make API call
      // supabase ? make my own API?
      const url = `https://swapi.dev/api/people/2`;
      const res = await fetch(url);
      console.log(await res.json());
    }

    getPeople()

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

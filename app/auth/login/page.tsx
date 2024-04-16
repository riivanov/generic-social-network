'use client'

import styles from "./page.module.scss";

export default function Login() {
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
      </div>
    </>
  );
}

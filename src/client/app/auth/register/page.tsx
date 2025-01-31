"use client";

import { Button, Link, TextField } from "@mui/material";
import styles from "./page.module.scss";

export default function RegisterComponent() {
  function handleContinueClick() {
    console.log("clicked");
  }

  return (
    <>
      <form className={styles.form}>
        <h3 className={styles.createAccountContainer}>
          <p className={styles.createAccount}>Create an account</p>
        </h3>
        {/* TODO:
            - websocket to check if e-mail already exists without page navigation / reload
         */}
        <TextField
          className={styles.eMail}
          label="E-Mail"
          variant="outlined"
        ></TextField>
        {/* TODO:
            - websocket to check if username already exists without page navigation / reload
         */}
        <TextField
          className={styles.username}
          label="Username"
          variant="outlined"
        ></TextField>
        {/* TODO:
            - password strength checker with red/yellow/green indicator
         */}
        <TextField
          className={styles.password}
          label="Password"
          variant="outlined"
          type="password"
        ></TextField>
        <Button
          className={styles.continue}
          variant="contained"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
        <Link className={styles.haveAccount} href="/auth/login">
          Already have an account?
        </Link>
      </form>
    </>
  );
}

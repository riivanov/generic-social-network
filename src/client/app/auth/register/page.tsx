"use client";

import { Button, TextField } from "@mui/material";
import styles from "./page.module.scss";

export default function RegisterComponent() {
  function handleContinueClick() {
    console.log("clicked");
  }

  return (
    <>
      <h3 className={styles.createAccountContainer}>
        <p className={styles.createAccount}>Create an account</p>
      </h3>
      <form className={styles.form}>
        {/* TODO:
            - websocket to check if e-mail already exists without page navigation / reload
         */}
        <TextField label="E-Mail" variant="outlined"></TextField>
        {/* TODO:
            - websocket to check if username already exists without page navigation / reload
         */}
        <TextField label="Username" variant="outlined"></TextField>
        {/* TODO:
            - password strength checker with red/yellow/green indicator
         */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
        ></TextField>
        <Button variant="contained" onClick={handleContinueClick}>
          Continue
        </Button>
      </form>
    </>
  );
}

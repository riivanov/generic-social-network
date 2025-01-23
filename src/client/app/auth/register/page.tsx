"use client";

import { TextField } from "@mui/material";
import styles from "./page.module.scss";

export default function RegisterComponent() {
  return (
    <>
      <form className={styles.form}>
        <TextField label="E-Mail" variant="outlined"></TextField>
        <TextField label="Username" variant="outlined"></TextField>
        <TextField label="Password" variant="outlined"></TextField>
      </form>
    </>
  );
}

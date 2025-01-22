"use client";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APIService } from "app/services/api.service";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { Button, TextField } from "@mui/material";

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
        <TextField className={styles.eMail} label="E-mail" variant="outlined"></TextField>
        <TextField className={styles.password} label="Password" type="password" variant='outlined'></TextField>
        <Link className={styles.forgot} href="/auth/forgot">Forgot your password?</Link>
      </form>
      <Button variant="contained" onClick={clicked}>Login</Button>
      <div className="register">
        Need an account?<Link href="/auth/register">Register</Link>
      </div>
    </>
  );
}

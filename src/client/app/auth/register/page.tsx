"use client";

import { Button, Link, TextField } from "@mui/material";
import PasswordStrengthComponent from "app/components/password-strength/password-strength";
import { SocketService } from "app/services/socket.service";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./page.module.scss";

export default function RegisterComponent() {
  function handleContinueClick() {
    console.log("clicked");
    SocketService.instance
      .isUsernameTaken(formik.values.username)
      .on("user:username-taken", handleIsUsernameTaken);
  }

  function handleIsUsernameTaken(isTaken: boolean) {
    console.log("Is username taken", isTaken);
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password has to be at least 8 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h3 className={styles.createAccountContainer}>
          <p className={styles.createAccount}>Create an account</p>
        </h3>
        {/* TODO:
            - websocket to check if e-mail already exists without page navigation / reload
         */}
        <TextField
          className={styles.eMail}
          variant="outlined"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        ></TextField>
        {/* TODO:
            - websocket to check if username already exists without page navigation / reload
         */}
        <TextField
          className={styles.username}
          variant="outlined"
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        ></TextField>
        <TextField
          className={styles.password}
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
        ></TextField>
        <PasswordStrengthComponent password={formik.values.password} />
        <Button
          className={styles.continue}
          variant="contained"
          type="submit"
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

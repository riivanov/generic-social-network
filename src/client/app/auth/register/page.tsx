"use client";

import { IUser } from "@lib/models/user.interface";
import { ServerClientEvents } from "@lib/socket/event-names";
import { Button, Link, TextField } from "@mui/material";
import PasswordStrengthComponent from "app/components/password-strength/password-strength";
import { SocketService } from "app/services/socket.service";
import { UserService } from "app/services/user.service";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import * as yup from "yup";
import styles from "./page.module.scss";

export default function RegisterComponent() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup
      .string()
      .min(4, "Must be at least 4 characters")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces")
      .required("Username is required"),
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
    onSubmit: handleSubmit,
  });

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  function handleSubmit(values: IUser) {
    console.log(JSON.stringify(values, null, 2), "clicked");
    UserService.instance.createUser(values);
  }

  function handleEmailChange(ev: ChangeEvent<HTMLInputElement>) {
    formik.handleChange(ev);

    SocketService.instance
      .isEmailTaken(ev?.target?.value)
      .once<ServerClientEvents>("user:is-email-taken", handleIsEmailTaken);
  }

  function handleIsEmailTaken(isTaken: boolean) {
    setIsEmailTaken(isTaken);
  }

  function handleUsernameChange(ev: ChangeEvent<HTMLInputElement>) {
    formik.handleChange(ev);

    SocketService.instance
      .isUsernameTaken(ev?.target?.value)
      .once<ServerClientEvents>(
        "user:is-username-taken",
        handleIsUsernameTaken
      );
  }

  function handleIsUsernameTaken(isTaken: boolean) {
    setIsUsernameTaken(isTaken);
  }

  function isInputDirty(name: string) {
    let boolean =
      formik.getFieldMeta(name).value ===
      formik.getFieldMeta(name).initialValue;
    return !boolean;
  }

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h3 className={styles.createAccountContainer}>
          <p className={styles.createAccount}>Create an account</p>
        </h3>
        <TextField
          className={styles.eMail}
          variant="outlined"
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={handleEmailChange}
          onBlur={formik.handleBlur}
          error={
            isEmailTaken ||
            (formik.touched.email && Boolean(formik.errors.email))
          }
          helperText={
            isEmailTaken
              ? "E-mail is already in use. Use another."
              : formik.touched.email && formik.errors.email
          }
        ></TextField>
        <TextField
          className={styles.username}
          variant="outlined"
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={handleUsernameChange}
          onBlur={formik.handleBlur}
          error={
            isUsernameTaken ||
            (formik.touched.username && Boolean(formik.errors.username))
          }
          helperText={
            isUsernameTaken
              ? "Username is not available"
              : formik.touched.username && formik.errors.username
          }
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
        {isInputDirty("password") && (
          <PasswordStrengthComponent password={formik.values.password} />
        )}
        <Button className={styles.continue} variant="contained" type="submit">
          Continue
        </Button>
        <Link className={styles.haveAccount} href="/auth/login">
          Already have an account?
        </Link>
      </form>
    </>
  );
}

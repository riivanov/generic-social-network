"use client";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "@lib/models/user.interface";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import styles from "./page.module.scss";

export default function LoginComponent() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(user: Partial<IUser>) {
    console.log(user);
  }

  return (
    <>
      <div className={styles.iconLabel}>
        <FontAwesomeIcon icon={faUsers} />
        <p className={styles.label}>Login to GSN</p>
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={styles.eMail}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="E-mail"
          variant="outlined"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        ></TextField>
        <TextField
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={styles.password}
          label="Password"
          type="password"
          variant="outlined"
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        ></TextField>
        <Link className={styles.forgot} href="/auth/forgot">
          Forgot your password?
        </Link>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <div className={styles.needAccount}>
        Need an account?{" "}
        <Link className={styles.register} href="/auth/register">
          Register
        </Link>
      </div>
    </>
  );
}

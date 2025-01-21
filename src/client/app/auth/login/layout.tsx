import styles from "./layout.module.scss";
import LoginComponent from "./page";

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formRegisterContainer}>
          <LoginComponent />
        </div>
      </div>
    </>
  );
}

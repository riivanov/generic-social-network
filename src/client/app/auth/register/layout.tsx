"use client";

import RegisterComponent from "./page";
import styles from "./layout.module.scss"

export default function RegisterLayout() {
  return (
    <>
      <div className={styles.verticalContainer}>
        <div className={styles.horizontalContainer}>
          <RegisterComponent />
        </div>
      </div>
    </>
  );
}

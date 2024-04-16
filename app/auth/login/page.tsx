import styles from "./page.module.scss";

export default function Login() {
  return (
    <>
      <div className="container">
        <form className="form">
          <input className="user" type="text" />
          <input className="pass" type="password" />
        </form>
      </div>
    </>
  );
}

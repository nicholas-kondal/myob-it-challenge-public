import React from "react";
import logo from "../images/rev-you.svg";
import myob from "../images/myob.png";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  function handleSignIn() {
    window.location.replace("http://localhost:5000/login");
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.columnContainer}>
        <div className={styles.welcome}>
          <h1> Welcome back </h1>
          </div>
          <div className={styles.loginBox}>
            <img className={styles.logo} src={logo} alt=""></img>
            <div className={styles.login}>
              <span> Find out what your clients think,<br></br> grow your business today. </span>
              <div className={styles.buttonRow}>
                <div class={styles.loginButton} onClick={handleSignIn}>
                    <img class={styles.myobIcon} src={myob} />
                  
                  <p class={styles.buttonText}>
                    <b>Sign in with MYOB</b>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

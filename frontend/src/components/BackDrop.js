import React from "react";
import styles from "./BackDrop.module.css";

export default function Backdrop(props) {
  return <div className={styles.backdrop}>{props.children}</div>;
}

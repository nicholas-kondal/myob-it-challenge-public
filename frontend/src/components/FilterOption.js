import React from "react";
import styles from "./FilterOption.module.css";

export default function FilterOption(props) {
  return (
    <div className={styles.filterContainer}>
      {props.icon ? (
        <div className={styles.iconContainer}>
          {props.icon}
          {props.includeDropdown ? <a>:</a> : null}
        </div>
      ) : null}
      {props.includeDropdown ? (
        <select
          className={styles.dropDown}
          name={props.filterField}
          id={props.filterField}
        >
          {props.options.map((field, index) => {
            return <option value={field}>{field}</option>;
          })}
        </select>
      ) : null}
    </div>
  );
}

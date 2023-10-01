import React from "react";
import styles from "./OptionsButtons.module.css";
import IconButton from "@material-ui/core/IconButton";

export default function OptionsButtons(props) {
  return (
    <div className={styles.optionButtonsContainer}>
      <div className={styles.buttonContainerRow}>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={props.icon1OnClick ? () => props.icon1OnClick(true) : null}
          >
            {props.icon1}
          </IconButton>
          <IconButton>{props.icon2}</IconButton>
        </div>
      </div>
    </div>
  );
}

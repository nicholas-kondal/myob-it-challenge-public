import React from "react";
import styles from "./FeedbackCard.module.css";
import IconButton from "@material-ui/core/IconButton";
import FlagIcon from "@material-ui/icons/Flag";
import StarRatings from "react-star-ratings";

export default function FeedbackCard(props) {
  function getFlag() {
    if (parseInt(props.feedbackData.questions.overall) < 3) {
      return (
        <FlagIcon className={styles.flagbutton} style={{ color: "#F96E6E" }} />
      );
    } else {
      return <FlagIcon className={styles.flagbutton} />;
    }
  }
  return (
    <div
      className={props.className}
      onClick={() => props.onClick(props.feedbackData)}
    >
      <div className={styles.subsection}>
        <p className={styles.title}>Order No.:</p>
        <p className={styles.response}>{props.feedbackData.order_number}</p>
      </div>
      <div className={styles.subsection}>
        <p className={styles.title}>Customer:</p>
        <p className={styles.response}>{props.feedbackData.customer_name}</p>
      </div>
      <div className={styles.subsection}>
        <p className={styles.title}>Overall Satisfaction:</p>
        <StarRatings
          rating={parseInt(props.feedbackData.questions.overall)}
          numberOfStars={5}
          name="rating"
          starDimension="1.6vw"
          starSpacing="0.2vw"
          starRatedColor="#00000080"
        />
      </div>
      <div className={styles.subsection}>
        <p className={styles.title}>Date:</p>
        <p className={styles.response}>{props.feedbackData.date_received} </p>
      </div>
      <div className={styles.flag}>
        <IconButton>{getFlag()}</IconButton>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./FeedbackPopUp.module.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import StarRatings from "react-star-ratings";
import { feedbackResultMapping } from "../constants";

export default function PopUp(props) {
  var ratingFeedbackSection = (label, value) => (
    <div className={styles.labelValue}>
      <span className={styles.label}>{label}</span>
      <StarRatings
        className={styles.value}
        rating={value}
        numberOfStars={5}
        name="rating"
        starDimension="1.2vw"
        starSpacing="0.2vw"
        starRatedColor="#00000080"
      />
    </div>
  );

  var textFeedbackSection = (label, value) => (
    <div className={styles.labelValue}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );

  function getQuestionAnswers() {
    var questionAnswers = [];

    for (var key in props.feedbackData.questions) {
      if (key == "overall") {
        questionAnswers.push(
          ratingFeedbackSection(
            feedbackResultMapping[key],
            parseInt(props.feedbackData.questions[key])
          )
        );
      } else {
        questionAnswers.push(
          textFeedbackSection(
            feedbackResultMapping[key],
            props.feedbackData.questions[key]
          )
        );
      }
    }
    return questionAnswers;
  }

  return (
    <div className={styles.popUp}>
      <div className={styles.closeContainer}>
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <span className={styles.header}>Order Details:</span>
          <div className={styles.labelValue}>
            <span className={styles.label}>Order No.:</span>
            <span className={styles.value}>
              {props.feedbackData.order_number}
            </span>
          </div>
          <div className={styles.labelValue}>
            <span className={styles.label}>Customer:</span>
            <span className={styles.value}>
              {props.feedbackData.customer_name}
            </span>
          </div>
          <div className={styles.labelValue}>
            <span className={styles.label}>Order Date:</span>
            <span className={styles.value}>
              {props.feedbackData.date_ordered}
            </span>
          </div>
        </div>
        <div className={styles.text}>
          <span className={styles.header}>Response Details:</span>
          <div className={styles.labelValue}>
            <span className={styles.label}>Date Sent:</span>
            <span className={styles.value}>{props.feedbackData.date_sent}</span>
          </div>
          <div className={styles.labelValue}>
            <span className={styles.label}>Date Recieved:</span>
            <span className={styles.value}>
              {props.feedbackData.date_received}
            </span>
          </div>
          {getQuestionAnswers()}
        </div>
      </div>
    </div>
  );
}

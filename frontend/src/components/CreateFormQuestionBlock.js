import { React, useState } from "react";
import styles from "./CreateFormQuestionBlock.module.css";

export default function CreateFormQuestionBlock(props) {
  const [questions, setQuestions] = useState(props.question);

  var productConditionalOptions = [
    { value: "prod123", label: "prod #123" },
    { value: "prod124", label: "prod #124" },
    { value: "prod125", label: "prod #125" },
    { value: "prod126", label: "prod #126" },
  ];
  var shippingConditionalOptions = [
    { value: "dom", label: "Domestic" },
    { value: "int", label: "International" },
  ];

  function updateState(key, value) {
    var currentQuestionSelection = questions;
    currentQuestionSelection[key] = value;
    setQuestions(currentQuestionSelection);
    props.handleUpdateQuestions(props.index, currentQuestionSelection);
  }

  return (
    <div>
      <div className={styles.labelContainer}>
        <p className={styles.label}>Question Type:</p>
        <select
          className={styles.dropDown}
          name="ratingType"
          id="type"
          onChange={(e) => updateState("ratingType", e.target.value)}
          value={questions.ratingType ? questions.ratingType : null}
        >
          <option hidden disabled selected value></option>
          <option value="starRating">Star Rating</option>
          <option value="textRating">Written - Short</option>
        </select>
        <select
          className={styles.dropDown}
          name="compulsoryType"
          id="type"
          onChange={(e) => {
            updateState("compulsoryType", e.target.value);
          }}
          value={questions.compulsoryType ? questions.compulsoryType : null}
        >
          <option hidden disabled selected value></option>
          <option value="compulsory">Compulsory</option>
          <option value="standard">Optional</option>
          <option value="conditional">Conditional</option>
        </select>
      </div>

      {questions.compulsoryType == "conditional" ? (
        <div className={styles.labelContainer}>
          <p className={styles.label}>If Invoice Contains:</p>
          <select
            className={styles.dropDown}
            name="conditionalType"
            id="condType"
            onChange={(e) => updateState("conditionalType", e.target.value)}
            value={questions.conditionalType ? questions.conditionalType : null}
          >
            <option hidden disabled selected value></option>
            <option value="productType">Product Code</option>
            <option value="shippingAddress">Shipping Address</option>
          </select>
          <select
            className={styles.dropDown}
            name="conditionalValue"
            id="type"
            onChange={(e) => updateState("conditionalValue", e.target.value)}
            value={
              questions.conditionalValue ? questions.conditionalValue : null
            }
          >
            <option hidden disabled selected value></option>
            {questions.conditionalType === "productType"
              ? productConditionalOptions.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  );
                })
              : shippingConditionalOptions.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
          </select>
        </div>
      ) : null}

      <div className={styles.labelContainer}>
        <p className={styles.label}>Question Topic:</p>
        <select
          className={styles.dropDown}
          name="questionTopic"
          id="topic"
          onChange={(e) => updateState("questionTopic", e.target.value)}
          value={questions.questionTopic ? questions.questionTopic : null}
        >
          <option hidden disabled selected value></option>
          <option value="overallSatisfaction">Overall Satisfaction</option>
          <option value="productRating">Product Satisfaction</option>
          <option value="serviceRating">Service Satisfaction</option>
          <option value="companyRating">Company Review</option>
          <option value="comments">Additional Comments</option>
        </select>
      </div>
      {props.divider}
    </div>
  );
}

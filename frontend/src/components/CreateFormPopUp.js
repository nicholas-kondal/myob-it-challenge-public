import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import styles from "./CreateFormPopUp.module.css";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import CreateFormQuestionBlock from "./CreateFormQuestionBlock";
import moment from "moment";

export default function CreateFormPopUp(props) {
  const [formQuestions, setFormQuestions] = useState([]);
  const [formName, setFormName] = useState("");
  const [scheduleNum, setScheduleNum] = useState("");
  const [scheduleTimeframe, setScheduleTimeframe] = useState("");

  var defaultBlock = {
    ratingType: "",
    compulsoryType: "",
    conditionalType: "",
    conditionalValue: "",
    questionTopic: "",
  };

  function addQuestion() {
    var questions = [...formQuestions];
    questions.splice(questions.length, 0, defaultBlock);
    setFormQuestions(questions);
  }

  function removeQuestion() {
    var questions = [...formQuestions];
    questions.splice(questions.length - 1, 1);
    setFormQuestions(questions);
  }

  function updateQuestion(index, value) {
    var questions = [...formQuestions];
    questions[index] = value;
    setFormQuestions(questions);
  }

  var editDivider = (
    <div className={styles.editDivider}>
      <hr className={styles.hr} />
      <div className={styles.editButtons}>
        <IconButton>
          <SwapVerticalCircleIcon />
        </IconButton>
        <IconButton>
          <RemoveCircleIcon onClick={removeQuestion} />
        </IconButton>
        <IconButton onClick={addQuestion}>
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>
  );

  var addDivider = (
    <div className={styles.editDivider}>
      <hr className={styles.hr} />
      <div className={styles.editButtonsRemove}>
        <IconButton>
          <AddCircleIcon onClick={addQuestion} />
        </IconButton>
      </div>
    </div>
  );

  function handleOnClick(e) {
    e.preventDefault();
    var formObject = {
      name: formName,
      scheduled: scheduleNum + " " + scheduleTimeframe,
      sent: 0,
      recieved: 0,
      questions: formQuestions,
      numQuestions: formQuestions.length,
      createdDate: moment().format("DD/MM/YY"),
      lastModified: moment().format("DD/MM/YY"),
    };
    props.onSubmit(formObject);
  }

  return (
    <div className={styles.popUp}>
      <form className={styles.formWrapper}>
        <div>
          <div className={styles.titleContainer}>
            <p className={styles.label}>Form Name:</p>
            <input
              className={styles.inputField}
              type="text"
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Company Logo:</p>
            <button className={styles.buttons}>Upload</button>
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Schedule Send:</p>
            <select
              className={styles.dropDown}
              onChange={(e) => setScheduleNum(e.target.value)}
            >
              <option hidden disabled selected value></option>
              <option>1 </option>
              <option>2 </option>
              <option>3 </option>
            </select>
            <select
              className={styles.dropDown}
              onChange={(e) => setScheduleTimeframe(e.target.value)}
            >
              <option hidden disabled selected value></option>
              <option>hour(s) </option>
              <option>day(s) </option>
              <option>week(s) </option>
              <option>month(s) </option>
            </select>
          </div>
          {formQuestions.length === 0 ? addDivider : editDivider}
          {formQuestions.map((question, index) => {
            if (index === formQuestions.length - 1) {
              return (
                <CreateFormQuestionBlock
                  key={index}
                  divider={addDivider}
                  index={index}
                  handleUpdateQuestions={updateQuestion}
                  question={question}
                />
              );
            } else {
              return (
                <CreateFormQuestionBlock
                  divider={editDivider}
                  index={index}
                  handleUpdateQuestions={updateQuestion}
                  question={question}
                />
              );
            }
          })}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={props.onClose} className={styles.buttons}>
            Cancel
          </button>
          <input
            className={styles.buttons}
            type="submit"
            onClick={handleOnClick}
          ></input>
        </div>
      </form>
    </div>
  );
}

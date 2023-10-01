import React, { useState } from "react";
import styles from "./FormsPage.module.css";
import FormCard from "../components/FormCard";
import Search from "../components/Search";
import OptionsButtons from "../components/OptionsButtons";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import BackDrop from "../components/BackDrop";
import CreateFormPopUp from "../components/CreateFormPopUp";
import SideBar from "../components/layout/SideBar";
import FormDetailsPopUp from "../components/FormDetailsPopUp";

export default function Forms() {
  const [showFormsPopUp, setShowFormsPopUp] = useState(false);
  const [showDetailsPopUp, setShowDetailsPopUp] = useState(false);
  const [currentFormIndex, setCurrentIndex] = useState(0);
  const [dummyForms, setDummyForms] = useState([
    {
      name: "B2B",
      createdDate: "09/08/21",
      lastModified: "11/08/21",
      numQuestions: 2,
      sent: 5,
      recieved: 1,
      scheduled: "2 day(s)",
      questions: [
        {
          ratingType: "starRating",
          compulsoryType: "compulsory",
          conditionalType: "",
          conditionalValue: "",
          questionTopic: "serviceRating",
        },
        {
          ratingType: "textRating",
          compulsoryType: "standard",
          conditionalType: "",
          conditionalValue: "",
          questionTopic: "comments",
        },
      ],
    },
    {
      name: "B2C",
      createdDate: "12/08/21",
      lastModified: "12/08/21",
      numQuestions: 2,
      sent: 1,
      recieved: 1,
      scheduled: "1 week(s)",
      questions: [
        {
          ratingType: "textRating",
          compulsoryType: "standard",
          conditionalType: "",
          conditionalValue: "",
          questionTopic: "serviceRating",
        },
        {
          ratingType: "starRating",
          compulsoryType: "standard",
          conditionalType: "",
          conditionalValue: "",
          questionTopic: "serviceRating",
        },
      ],
    },
  ]);

  function closePopUp(e) {
    e.preventDefault();
    setShowFormsPopUp(false);
  }

  function openDetailsPopUp(index) {
    console.log("open details " + index);
    setCurrentIndex(index);
    setShowDetailsPopUp(true);
    setShowFormsPopUp(false);
  }

  function closeDetailsPopUp() {
    setShowDetailsPopUp(false);
    setShowFormsPopUp(false);
  }

  function addForm(formObject) {
    console.log(JSON.stringify(formObject));
    var forms = [...dummyForms];
    forms.push(formObject);
    setDummyForms(forms);
    setShowFormsPopUp(false);
  }

  function deleteForm(index) {
    var forms = [...dummyForms];
    forms.splice(index, 1);
    setDummyForms(forms);
  }

  function getFormData() {
    console.log("returning " + currentFormIndex);
    return dummyForms[currentFormIndex];
  }

  return (
    <div className="pageContainer">
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="body">
        <div className="contentBody">
          <div className="searchOptions">
            <Search includeFilter={false} />
            <OptionsButtons
              icon1={<AddIcon style={{ fontSize: "3vh" }} />}
              icon2={<SettingsIcon style={{ fontSize: "3vh" }} />}
              icon1OnClick={setShowFormsPopUp}
            />
          </div>
          <div className={styles.formsContainer}>
            {dummyForms.map((data, index) => {
              return (
                <FormCard
                  key={index}
                  form={data}
                  openPopUp={openDetailsPopUp}
                  deleteForm={deleteForm}
                  index={index}
                />
              );
            })}
          </div>
          {showFormsPopUp && (
            <BackDrop>
              <CreateFormPopUp onClose={closePopUp} onSubmit={addForm} />
            </BackDrop>
          )}
          {showDetailsPopUp && (
            <BackDrop>
              <FormDetailsPopUp
                onClose={closeDetailsPopUp}
                onSubmit={addForm}
                form={getFormData()}
              />
            </BackDrop>
          )}
        </div>
      </div>
    </div>
  );
}

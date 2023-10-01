import React, { useState, useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import BackDrop from "../components/BackDrop";
import FeedbackPopUp from "../components/FeedbackPopUp";
import styles from "./HomePage.module.css";
import Search from "../components/Search";
import OptionsButtons from "../components/OptionsButtons";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import SideBar from "../components/layout/SideBar";
import "../index.css";

export default function Home() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetch("/get-feedback", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        console.log("feedback data " + JSON.stringify(obj));
        setFeedbackData(obj);
      });
  }, []);

  function handleFeedbackClicked(data) {
    setSelectedFeedback(data);
    setShowPopUp(true);
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  return (
    <div className="pageContainer">
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="body">
        <div className="contentBody">
          <div className="searchOptions">
            <Search includeFilter={true} />
            <OptionsButtons
              icon1={<SystemUpdateAltIcon style={{ fontSize: "3vh" }} />}
              icon2={<SettingsIcon style={{ fontSize: "3vh" }} />}
            />
          </div>
          <div className={styles.feedbackList}>
            {feedbackData.map((data, index) => {
              return (
                <FeedbackCard
                  className={styles.feedbackCard}
                  key={index}
                  feedbackData={data}
                  onClick={handleFeedbackClicked}
                />
              );
            })}
          </div>
          {showPopUp && (
            <BackDrop>
              <FeedbackPopUp
                onClose={closePopUp}
                feedbackData={selectedFeedback}
              />
            </BackDrop>
          )}
        </div>
      </div>
    </div>
  );
}

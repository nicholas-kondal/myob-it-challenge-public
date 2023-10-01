import React, { useState } from "react";
import styles from "./SummaryPage.module.css";
import OptionsButtons from "../components/OptionsButtons";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import trustuspt from "../images/company.png";
import SideBar from "../components/layout/SideBar";

export default function SummaryPage() {
  return (
    <div className="pageContainer">
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="body">
        <div className="contentBody">
          <div className="searchOptions">
            <span className={styles.companyName}>
              {" "}
              Trust Us Plumbing Technicians Summary{" "}
            </span>
            <OptionsButtons
              icon1={<AddIcon style={{ fontSize: "3vh" }} />}
              icon2={<SettingsIcon style={{ fontSize: "3vh" }} />}
            />
          </div>
          <div className={styles.summaryContainer}>
            {/* ROW 1 */}
            <div className={styles.row}>
              <div className={styles.overallStars}>
                <span className={styles.title}>
                  {" "}
                  Average Overall Satisfaction:
                </span>
                <br></br>
                <br></br>
                <div className={styles.labelvalue1}>
                  <div className={styles.label}>
                    <StarRoundedIcon
                      style={{ fontSize: "15vw", color: "#FFE777" }}
                    />
                  </div>
                  <div className={styles.stats}>
                    <span className={styles.values1}> 4.2 </span>
                    <span className={styles.label}>/ 5 </span>
                  </div>
                </div>
              </div>

              <div className={styles.prod123}>
                <span className={styles.title}>Product Prod#123:</span>{" "}
                <br></br>
                <br></br>
                <div className={styles.labelvalue1}>
                  <div className={styles.label}>
                    <SentimentSatisfiedRoundedIcon
                      style={{ fontSize: "14vw", color: "#D8A0F0" }}
                    />
                  </div>
                  <div className={styles.stats}>
                    <span className={styles.values1}> Positive</span>
                    <br></br>
                    <span className={styles.label}>sentiment analysis</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ROW 2 */}
            <div className={styles.row}>
              <div className={styles.doingWell}>
                <span className={styles.title}> Doing Well:</span>
                <br></br>
                <br></br>
                <div className={styles.labelvalue1}>
                  <div className={styles.label}>
                    <ThumbUpRoundedIcon
                      style={{ fontSize: "15vw", color: "#A6F0A0" }}
                    />
                  </div>
                  <ul className={styles.values2}>
                    <li>Fast Service</li>
                    <li>Knowledgeable Staff</li>
                    <li>Value for Money</li>
                  </ul>
                </div>
              </div>

              <div className={styles.count}>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Total Sent: </span>
                  <span className={styles.values2}> 10 </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Total Received: </span>
                  <span className={styles.values2}> 7 / 10 </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Last Response: </span>
                  <span className={styles.values2}> 11/08/21 8:20PM </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Total Flagged: </span>
                  <span className={styles.values2}> 1 </span>
                </div>
              </div>
            </div>

            {/* ROW 3 */}
            <div className={styles.row}>
              <div className={styles.feedback}>
                <span className={styles.title}> Things To Work On:</span>
                <br></br>
                <br></br>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Order No.: </span>
                  <span className={styles.values2}> 000000007 </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Overall Satisfaction: </span>
                  <span className={styles.values2}> 2 / 5 </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Status: </span>
                  <span className={styles.values2}> Flagged </span>
                </div>
                <div className={styles.labelvalue2}>
                  <span className={styles.label}> Feedback: </span>
                  <span className={styles.values2}>
                    {" "}
                    Disappointed, very long response time from the team.{" "}
                  </span>
                </div>
              </div>
              <img className={styles.logo} src={trustuspt} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

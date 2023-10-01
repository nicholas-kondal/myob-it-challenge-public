import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import logo from "../../images/rev-you.png";

export default function SideBar() {
  const [selectedTab, setSelectedTab] = useState("");
  var selectedStyle = { backgroundColor: "#00000010" };

  function handleTabClick(tabValue) {
    console.log(tabValue);
    setSelectedTab(tabValue);
  }

  return (
    <div className={styles.sideBarContainer}>
      <img className={styles.logo} src={logo} alt=""></img>
      <hr></hr>
      <nav>
        <ul className={styles.list}>
          <li
            className={styles.tab}
            style={selectedTab === "Responses" ? selectedStyle : null}
          >
            <NavLink
              to="/responses"
              className={styles.a}
              activeStyle={{ fontWeight: "bold" }}
            >
              Responses
            </NavLink>
          </li>
          <li className={styles.tab}>
            <NavLink to="/summary" className={styles.a} activeStyle={{ fontWeight: "bold" }}>
              Summary
            </NavLink>
          </li>
          <li
            className={styles.tab}
            style={selectedTab === "Forms" ? selectedStyle : null}
          >
            <NavLink
              to="/forms"
              className={styles.a}
              activeStyle={{ fontWeight: "bold" }}
            >
              Forms
            </NavLink>
          </li>
          <br></br>
          <br></br>
          <hr width={"75%"}></hr>
          <br></br>
          <li className={styles.tab}>
            <div className={styles.a}>My Account</div>
          </li>
          <li className={styles.tab}>
            <div className={styles.a}>Sign Out</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

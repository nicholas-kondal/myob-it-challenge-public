import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import FlagIcon from "@material-ui/icons/Flag";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import FilterOption from "./FilterOption";

export default function Search(props) {
  var starOptions = [
    "All",
    "1 star",
    "2 stars",
    "3 stars",
    "4 stars",
    "5 stars",
  ];

  var flagOptions = ["All", "Flagged", "Unflagged"];

  var sortOptions = ["Newest-Oldest", "Newest-Latest"];

  return (
    <div className={styles.searchModuleContainer}>
      <form className={styles.formWrapper}>
        <div className={styles.searchLayout}>
          <SearchIcon className={styles.search} style={{ fontSize: "2vw" }} />
          <input
            className={styles.inputField}
            type="text"
            placeholder="Search"
          />
        </div>
        {props.includeFilter ? (
          <div className={styles.filterOptionsContainer}>
            <label className={styles.filterLabel}>Filter By:</label>
            <FilterOption
              icon={<StarIcon style={{ color: "#00000080" }} />}
              filterField="star"
              options={starOptions}
              includeDropdown={true}
            />
            <FilterOption
              icon={<FlagIcon style={{ color: "#00000080" }} />}
              filterField="flag"
              options={flagOptions}
              includeDropdown={true}
            />
            <FilterOption
              icon={<AddIcon style={{ color: "#00000080" }} />}
              includeDropdown={false}
            />
          </div>
        ) : null}
        <div className={styles.filterOptionsContainer}>
          <label className={styles.filterLabel}>Sort By:</label>
          <FilterOption
            filterField="sort"
            options={sortOptions}
            includeDropdown={true}
          />
        </div>
        {props.includeFilter ? null : (
          <div className={styles.filterOptionsContainer}></div>
        )}
      </form>
    </div>
  );
}

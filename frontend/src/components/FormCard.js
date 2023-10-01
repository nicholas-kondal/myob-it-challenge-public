import React from "react";
import styles from "./FormCard.module.css";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default function FormCard(props) {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const open = Boolean(anchorElement);

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <p>{props.form.name}</p>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElement}
          keepMounted
          onClose={handleClose}
          open={open}
        >
          <MenuItem
            style={{ fontFamily: "Quicksand" }}
            key="View Details"
            onClick={() => {
              props.openPopUp(props.index);
              handleClose();
            }}
          >
            View Questions
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand" }}
            key="Delete"
            onClick={() => {
              props.deleteForm(props.index);
              handleClose();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }}>Duplicate</MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }}>Disable</MenuItem>
        </Menu>
      </div>
      <div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Date Created:</p>
          <p className={styles.value}>{props.form.createdDate}</p>
        </div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Date Modified:</p>
          <p className={styles.value}>{props.form.lastModified}</p>
        </div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Questions:</p>
          <p className={styles.value}>{props.form.numQuestions}</p>
        </div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Sent:</p>
          <p className={styles.value}>{props.form.sent}</p>
        </div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Recieved:</p>
          <p className={styles.value}>{props.form.recieved}</p>
        </div>
        <div className={styles.labelValue}>
          <p className={styles.label}>Schedule Send:</p>
          <p className={styles.value}>{props.form.scheduled}</p>
        </div>
      </div>
    </div>
  );
}

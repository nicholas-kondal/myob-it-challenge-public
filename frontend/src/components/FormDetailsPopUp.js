import React from 'react'
import styles from "./FormDetails.module.css"
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { questionMapping, questionKeyMapping} from "../constants"

export default function FormDetailsPopUp(props) {
    return (
        <div className={styles.popUp}>
            <div className={styles.closeContainer}>
                <IconButton onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.text}>
                    <span className={styles.header}>Form Questions:</span>
                    {console.log("formData " + JSON.stringify(props.form))}
                    {props.form.questions.map((question, index) => {
                        console.log("question " + JSON.stringify(question))
                        var questionBlock = [<p className={styles.questionLabel}>Question {index + 1}</p>]
                        for (var key in question) {
                            if (question[key]) {
                                questionBlock.push(<div className={styles.labelValue}>
                                    <span className={styles.label}>{questionMapping[key]}</span>
                                    <span className={styles.value}>{questionKeyMapping[key][question[key]]}</span>
                                </div>)
                            }
                        }
                        questionBlock.push(<hr className={styles.hr}></hr>)
                        return questionBlock
                    })}
                </div>
            </div>
        </div>
    )
}

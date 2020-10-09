import React from "react";

import styles from "./Alert.module.css";

export default function Alert({ close }) {
  return (
    <div className={styles.alert}>
      <span className={styles.close} onClick={close}></span>Contact alredy exist
    </div>
  );
}

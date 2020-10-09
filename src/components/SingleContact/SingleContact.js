import React from "react";
import PropTypes from "prop-types";

import styles from "./SingleContact.module.css";

function SingleContact({ name, number, id, deleteContact, firstLetters }) {
  return (
    <li key={id} className={styles.item}>
      <span className={styles.text}>{firstLetters(name)}</span>
      <span className={styles.text}>{number}</span>
      <button type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
}

SingleContact.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  firstLetters: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default SingleContact;

import React from "react";
import PropTypes from "prop-types";
import SingleContact from "../SingleContact/SingleContact";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./Contacts.module.css";

function Contacts({ visibleContacts, deleteContact }) {
  return (
    <section className={styles.contacts}>
      <div className={styles.contactsHead}>
        <p className={styles.text}>Name</p>
        <p className={styles.text}>Phone</p>
      </div>
      <TransitionGroup component="ul" className={styles.list}>
        {visibleContacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={250} classNames={styles}>
            <SingleContact
              name={contact.name}
              number={contact.number}
              id={contact.id}
              deleteContact={deleteContact}
              firstLetters={firstLetters}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
}

function firstLetters(phrase) {
  return phrase
    .trim()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}

Contacts.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  visibleContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default Contacts;

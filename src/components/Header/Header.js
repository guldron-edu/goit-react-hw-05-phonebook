import React from "react";
import styles from "./Header.module.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
  return (
    <header className={styles.header}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames={styles}
        unmountOnExit
      >
        <h1>Phonebook</h1>
      </CSSTransition>
    </header>
  );
}

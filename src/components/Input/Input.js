import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input({
  type,
  name,
  value,
  inputTracking,
  placeholder,
  minLength,
  required,
  autoFocus,
}) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      onChange={(ev) => inputTracking(ev)}
      value={value}
      placeholder={placeholder || ""}
      minLength={minLength}
      autoFocus={autoFocus}
      required={required}
    ></input>
  );
}

Input.propTypes = {
  inputTracking: PropTypes.func.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  minLength: PropTypes.number,
  required: PropTypes.bool,
};

export default Input;

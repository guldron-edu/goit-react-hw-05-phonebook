import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";
import withFilterContext from "../hoc/withFilterContext";

import Input from "../Input/Input";

function Filter({ filterProps }) {
  let currentFilterValue = filterProps.filterValue;
  return (
    <div className={styles.wrapper}>
      <Input
        type={"input"}
        name={"filter"}
        inputTracking={filterProps.filterFunc}
        placeholder={"Search"}
        value={currentFilterValue}
      />
    </div>
  );
}

Filter.propTypes = {
  filterProps: PropTypes.exact({
    filterFunc: PropTypes.func.isRequired,
    filterValue: PropTypes.string,
  }),
};

export default withFilterContext(Filter);

import React from "react";
import FilterContext from "../../context/FilterFunction";

const withFilterContext = (WrappedComponent) => {
  return function withFilterContext(props) {
    return (
      <FilterContext.Consumer>
        {(ctx) => <WrappedComponent {...props} filterProps={ctx} />}
      </FilterContext.Consumer>
    );
  };
};

export default withFilterContext;

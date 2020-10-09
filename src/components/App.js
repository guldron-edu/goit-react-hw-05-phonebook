import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Main/Main";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" component={Main}></Route>
      </Layout>
    );
  }
}

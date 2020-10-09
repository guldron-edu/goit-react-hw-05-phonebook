import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import InputForm from "../InputForm/InputForm";
import Contacts from "../Contacts/Contacts";
import Alert from "../Alert/Alert";
import parseSearch from "../../utils/parseQueryString";
import styles from "./Main.module.css";
import FilterContext from "../../context/FilterFunction";

export default class Main extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  state = {
    contacts: [],
    onAlert: false,
  };

  componentDidMount() {
    const localStorageContacts = localStorage.getItem("contacts");

    const { search } = this.props.location;
    const { filter } = parseSearch(search);
    this.filterValue = filter;

    if (localStorageContacts) {
      this.setState({
        contacts: JSON.parse(localStorageContacts),
      });
    }
  }
  filterValue = "";

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = (name, number) => {
    const tempContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.checkNameAndAddContact(name, tempContact);
  };

  checkNameAndAddContact = (name, tempContact) => {
    this.checkExistingName(name)
      ? this.showAlert()
      : this.setState((prevState) => {
          return {
            contacts: [...prevState.contacts, tempContact],
          };
        });
  };

  showAlert = () => {
    this.setState({ onAlert: true });
    setTimeout(this.closeAlert, 4000);
  };
  closeAlert = () => {
    this.setState({ onAlert: false });
  };

  inputFilterTracking = (ev) => {
    const query = ev.target.value;
    if (query) {
      this.props.history.push({
        ...this.props.location,
        search: `filter=${query}`,
      });
    } else {
      this.props.history.push({
        ...this.props.location,
        search: ``,
      });
    }
    this.filterValue = query;
  };

  filterContacts = () => {
    const { search } = this.props.location;
    const { filter } = parseSearch(search);
    let filterQuery = filter
      ? this.state.contacts.filter((contact) =>
          (contact.name.toLowerCase() + contact.number.toLowerCase()).includes(
            filter.toLowerCase()
          )
        )
      : this.state.contacts;
    return filterQuery;
  };

  checkExistingName = (targetName) => {
    return this.state.contacts
      .map((contact) => contact.name.toLowerCase().trim())
      .includes(targetName.toLowerCase().trim());
  };

  deleteContact = (targetId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== targetId),
      };
    });
  };

  render() {
    const { contacts, onAlert } = this.state;

    const visibleContacts = this.filterContacts();
    const checkLength = this.state.contacts.length > 1;

    return (
      <>
        <section className={styles.wrapper}>
          <FilterContext.Provider
            value={{
              filterFunc: this.inputFilterTracking,
              filterValue: this.filterValue,
            }}
          >
            <InputForm
              addNewContact={this.addNewContact}
              onFilter={checkLength}
            />
          </FilterContext.Provider>
          <CSSTransition
            in={true}
            appear={contacts.length > 0}
            timeout={500}
            classNames={styles}
            unmountOnExit
          >
            <Contacts
              visibleContacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </CSSTransition>
        </section>
        <CSSTransition
          in={onAlert}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          <Alert close={this.closeAlert} />
        </CSSTransition>
      </>
    );
  }
}

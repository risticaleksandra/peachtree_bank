import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Form,
  FormControl,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";

import DeafultCardLayout from "../common/DefaultCardLayout";
import icon from "../../public/assets/icons/briefcase.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "../../store/actions";

const cardLabel = "Recent Transactions";

const TransferTransactionsList = ({ transactions, onSreach, onSort }) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOptions, setSortOptions] = useState({
    date: { sorted: true, desc: true },
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const resetSearchValues = () => {
    setSearchValue("");
  };

  const handleSort = (name) => {
    const desc = sortOptions[name] ? !sortOptions[name].desc : true;
    setSortOptions({ ...sortOptions, [name]: { sorted: true, desc } });
  };

  useEffect(() => {
    onSort(sortOptions);
  }, [sortOptions]);

  useEffect(() => {
    onSreach(searchValue);
  }, [searchValue]);

  const RecentTransactionList = () => {
    const SearchInput = () => {
      return (
        <FormControl
          bsPrefix="bankCardInput"
          placeholder="Search by typing..."
          onChange={(e) => handleInputChange(e)}
          defaultValue={searchValue}
          autoFocus
        />
      );
    };

    return (
      <>
        <Row className="searchBar">
          <Col xl={5}>
            <SearchInput />
          </Col>
          <Col className="closeButtonClm" style={{ padding: "0" }} xl={1}>
            <FontAwesomeIcon
              style={{ marginLeft: "0.5rem" }}
              icon={faTimes}
              onClick={resetSearchValues}
            />
          </Col>
          <Col className="searchBarBtnGroup" xl={6}>
            <Form.Label className="searchBarLbl">Sort by</Form.Label>
            <ButtonGroup>
              <Button
                name="date"
                style={{ fontSize: "1.5rem" }}
                variant="outline-secondary"
                onClick={() => handleSort("date")}
              >
                Date
                {sortOptions.date && (
                  <FontAwesomeIcon
                    style={{ marginLeft: "0.5rem" }}
                    icon={sortOptions.date.desc ? faCaretDown : faCaretUp}
                  />
                )}
              </Button>
              <Button
                name="beneficiary"
                style={{ fontSize: "1.5rem" }}
                variant="outline-secondary"
                onClick={() => handleSort("beneficiary")}
              >
                Beneficiary
                {sortOptions.beneficiary && (
                  <FontAwesomeIcon
                    style={{ marginLeft: "0.5rem" }}
                    icon={
                      sortOptions.beneficiary.desc ? faCaretDown : faCaretUp
                    }
                  />
                )}
              </Button>
              <Button
                style={{ fontSize: "1.5rem" }}
                variant="outline-secondary"
                name="amount"
                onClick={() => handleSort("amount")}
              >
                Amount
                {sortOptions.amount && (
                  <FontAwesomeIcon
                    style={{ marginLeft: "0.5rem" }}
                    icon={sortOptions.amount.desc ? faCaretDown : faCaretUp}
                  />
                )}
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="transferTransactionTableWrapp">
          <Table>
            {transactions.map((transaction, index) => {
              const transactionDate =
                moment(transaction.transactionDate).format("MMM") +
                ". " +
                moment(transaction.transactionDate).format("YY");
              return (
                <tbody
                  index
                  style={{
                    borderRight: "1px solid lightgrey",
                    borderBottom: "1px solid lightgrey",
                    width: "90%",
                  }}
                >
                  <tr
                    key={index}
                    style={{
                      borderLeft: `0.5rem solid ${transaction.categoryCode}`,
                    }}
                  >
                    <td style={{ width: "10%" }}>{transactionDate}</td>
                    <td style={{ width: "20%" }}>
                      <img
                        style={{ width: "30%" }}
                        src={transaction.merchantLogo}
                      />
                    </td>
                    <td style={{ width: "60%" }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: "bold",
                          marginBottom: "0",
                        }}
                      >
                        {transaction.merchant}
                      </label>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0",
                        }}
                      >
                        {transaction.transactionType}
                      </label>
                    </td>
                    <td style={{ width: "10%", fontWeight: "bold" }}>
                      -${transaction.amount}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Row>
      </>
    );
  };

  return (
    <DeafultCardLayout
      icon={icon}
      label={cardLabel}
      component={() => <RecentTransactionList />}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.searchedTransactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSreach: (searchValue) =>
      dispatch({
        type: actionTypes.SEARCH_TRANSACTIONS,
        searchValue: searchValue,
      }),
    onSort: (sortOptions) =>
      dispatch({
        type: actionTypes.SORT_TRANSACTIONS,
        sortOptions: sortOptions,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferTransactionsList);

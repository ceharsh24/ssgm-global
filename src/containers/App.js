import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import intersectionBy from 'lodash/intersectionBy';
import { transactions } from '../data/data.json';
import './App.scss';

import { Header } from './Header/Header';
import { FilterList } from './FilterList/FilterList';
import { TransactionTable } from './TransactionTable/TransactionTable';
import { TransactionTableColumn } from './TransactionTable/TransactionTableColumn';
import { TransactionDetails } from './TransactionDetails/TransactionDetails';

const App = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [allFilterTypes, setFilterTypes] = useState({
    accountName: [],
    transactionType: []
  });

  const [tableData, setTableData] = useState([]);

  const [filterObject, setFilterObject] = useState({});

  const setStates = data => {
    if (Array.isArray(data)) {
      setAllTransactions(data);
      const allFilterDetails = {
        accountName: [],
        transactionType: []
      };
      data.forEach(eachTrans => {
        if (!allFilterDetails.accountName.includes(eachTrans.accountName)) {
          allFilterDetails.accountName.push(eachTrans.accountName);
        }
        if (
          !allFilterDetails.transactionType.includes(eachTrans.transactionType)
        ) {
          allFilterDetails.transactionType.push(eachTrans.transactionType);
        }
      });
      setFilterTypes(allFilterDetails);
    }
  };

  useEffect(() => {
    setStates(transactions);
    setTableData(transactions);
  }, []);

  const updateTableData = filter => {
    let accountNameFilter = [];
    let transactionTypeFilter = [];
    let combinedData = [];
    if (Object.keys(filter).length === 0) {
      combinedData = [...allTransactions];
    } else {
      Object.keys(filter).forEach(eachFilter => {
        switch (filter[eachFilter]) {
          case 'accountName': {
            accountNameFilter = [
              ...accountNameFilter,
              ...allTransactions.filter(data => data.accountName === eachFilter)
            ];
            break;
          }
          case 'transactionType': {
            transactionTypeFilter = [
              ...transactionTypeFilter,
              ...allTransactions.filter(
                data => data.transactionType === eachFilter
              )
            ];
            break;
          }
          default:
        }
      });
    }
    if (accountNameFilter.length > 0 && transactionTypeFilter.length > 0) {
      combinedData = intersectionBy(
        accountNameFilter,
        transactionTypeFilter,
        'account'
      );
    } else if (
      accountNameFilter.length > 0 ||
      transactionTypeFilter.length > 0
    ) {
      combinedData = [...accountNameFilter, ...transactionTypeFilter];
    }
    setTableData(combinedData);
  };

  const handleFilter = (name, value, checked) => {
    const filterObj = filterObject;
    if (checked && !Object.prototype.hasOwnProperty.call(filterObj, 'name')) {
      filterObj[name] = value;
    } else {
      delete filterObj[name];
    }
    setFilterObject(filterObj);
    updateTableData(filterObj);
  };

  return (
    <BrowserRouter>
      <Container>
        <Header />

        <Route path="/" exact>
          <Row>
            <Col md={2}>
              <div className="filter-list-header">Filters</div>
              <FilterList
                filters={allFilterTypes}
                handleFilter={handleFilter}
              />
            </Col>
            <Col md={10}>
              <TransactionTable
                columns={TransactionTableColumn}
                data={tableData}
              />
            </Col>
          </Row>
        </Route>

        <Route
          path="/transaction/:accountno"
          exact
          component={TransactionDetails}
        />
      </Container>
    </BrowserRouter>
  );
};

export default App;

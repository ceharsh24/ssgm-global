import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { transactions } from '../data/data.json';
import intersectionBy from 'lodash/intersectionBy';
import './App.scss';

import { FilterList } from './FilterList/FilterList';
import { TransactionTable } from './TransactionTable/TransactionTable';
import { TransactionTableColumn } from './TransactionTable/TransactionTableColumn';

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

  const updateTableData = filterObject => {
    let accountNameFilter = [];
    let transactionTypeFilter = [];
    let combinedData = [];
    if (Object.keys(filterObject).length === 0) {
      combinedData = [...allTransactions];
    } else {
      Object.keys(filterObject).forEach(eachFilter => {
        switch (filterObject[eachFilter]) {
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
    let filterObj = filterObject;
    if (checked && !filterObj.hasOwnProperty(name)) {
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
        <h1>Basic Setup</h1>
        <Row>
          <Col md={2}>
            <div className="filter-list-header">Filters</div>
            <FilterList filters={allFilterTypes} handleFilter={handleFilter} />
          </Col>
          <Col md={10}>
            <TransactionTable
              columns={TransactionTableColumn}
              data={tableData}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;

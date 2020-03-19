import React from 'react';

export const TransactionTableColumn = [
  {
    Header: 'Account No.',
    accessor: 'account'
    // Cell: <span>HHh</span>
  },
  {
    Header: 'Account Name',
    accessor: 'accountName'
  },
  {
    Header: 'Currency',
    accessor: 'currencyCode'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Transaction Type',
    accessor: 'transactionType'
  }
];

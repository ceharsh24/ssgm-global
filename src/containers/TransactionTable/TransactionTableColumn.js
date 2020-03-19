import {
  TransactionTableLink,
  TransactionTypeModifier
} from './TransactionTableStyling';

export const TransactionTableColumn = [
  {
    Header: 'Account No.',
    accessor: 'account',
    Cell: ({ row }) => TransactionTableLink(row.values)
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
    accessor: 'transactionType',
    Cell: ({ row }) => TransactionTypeModifier(row.values)
  }
];

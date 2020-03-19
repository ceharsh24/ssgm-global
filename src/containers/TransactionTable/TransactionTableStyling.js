import React from 'react';
import { Link } from 'react-router-dom';
import TextModifier from '../../utils/textModifier';

import './TransactionTable.scss';

export const TransactionTableLink = values => (
  <Link
    to={{
      pathname: `/transaction/${values.account}`,
      state: {
        values
      }
    }}
    className="transaction-table-link"
  >
    {values.account}
  </Link>
);

export const TransactionTypeModifier = values => (
  <>{TextModifier(values.transactionType)}</>
);

import React from 'react';
import { useLocation } from 'react-router-dom';

import { TextModifier } from '../../utils/textModifier';

import './TransactionDetails.scss';

export const TransactionDetails = () => {
  const { state } = useLocation();
  const { values } = state;
  return Object.keys(values).map(eachKey => (
    <div key={eachKey} className="transaction-details">
      <span className="-header">{`${TextModifier(eachKey)}: `}</span>
      <span className="-body">
        {typeof values[eachKey] === 'string' && eachKey !== 'currencyCode'
          ? TextModifier(values[eachKey])
          : values[eachKey]}
      </span>
    </div>
  ));
};

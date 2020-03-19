import React from 'react';
import { useLocation } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  const { pathname } = useLocation();
  const pathNameArr = pathname.split('/');
  return (
    <>
      <div className="heading">
        {pathname !== '/'
          ? `Transaction Details ${pathNameArr[pathNameArr.length - 1]}`
          : 'My Transactions'}
      </div>
      <hr />
    </>
  );
};

export default Header;

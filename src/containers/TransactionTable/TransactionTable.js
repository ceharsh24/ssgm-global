import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Row, Col } from 'react-bootstrap';

import './TransactionTable.scss';

export const TransactionTable = ({ columns, data }) => {
  const {
    headers,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 }
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table className="transaction-table">
        <thead>
          <tr>
            {headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                className="-header"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={row.id}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} key={cell.value}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Row className="pagination">
        <Col md={4}>
          Page:{' '}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="-input-page"
          />{' '}
          of {pageOptions.length}
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[25, 50, 100, 200, 300].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </>
  );
};

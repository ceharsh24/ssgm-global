import React, { useRef } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

import './SearchBar.scss';

const Search = ({ handleSearchSubmit }) => {
  const inputEl = useRef(null);
  const handleChange = e => {
    e.preventDefault();
    inputEl.current.focus();
    handleSearchSubmit(inputEl.current.value);
  };

  return (
    <Form className="seach-main" onSubmit={handleChange}>
      <Row>
        <Col>
          <Form.Control
            type="number"
            placeholder="Search By Account Number..."
            ref={inputEl}
            onChange={handleChange}
          />
        </Col>
        <Button type="submit" variant="outline-dark">
          Search
        </Button>
      </Row>
    </Form>
  );
};

Search.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired
};

export default Search;

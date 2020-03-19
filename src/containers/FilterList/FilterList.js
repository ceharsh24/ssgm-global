import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

import { TextModifier } from '../../utils/textModifier';
import './FilterList.scss';

export const FilterList = ({ filters, handleFilter }) => {
  const handleInputChange = ({ target }) => {
    const { checked } = target;
    const { value } = target;
    const name = target.id;
    handleFilter(name, value, checked);
  };

  const renderFilterBloack = (title, data) => (
    <div className="filter-type">
      <Form key={title}>
        <Form.Label className="form-label">{TextModifier(title)}</Form.Label>
        {data.map(eachType => (
          <Form.Group controlId="filterCheckBox" key={eachType}>
            <Form.Check
              id={eachType}
              value={title}
              type="checkbox"
              label={TextModifier(eachType)}
              onChange={handleInputChange}
            />
          </Form.Group>
        ))}
      </Form>
    </div>
  );

  return Object.keys(filters).map(filterKey => (
    <Fragment key={filterKey}>
      {renderFilterBloack(filterKey, filters[filterKey])}
    </Fragment>
  ));
};

import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

import './FilterList.scss';

export const FilterList = ({ filters, handleFilter }) => {
  const handleInputChange = ({ target }) => {
    const checked = target.checked;
    const value = target.value;
    const name = target.id;
    handleFilter(name, value, checked);
  };

  const renderText = text => {
    const splitTitle = text.replace(/([A-Z])/g, ' $1');
    const finalTitle = splitTitle.charAt(0).toUpperCase() + splitTitle.slice(1);
    return finalTitle;
  };

  const renderFilterBloack = (title, data) => {
    return (
      <div className="filter-type">
        <Form key={title}>
          <Form.Label className="form-label">{renderText(title)}</Form.Label>
          {data.map(eachType => (
            <Form.Group controlId="filterCheckBox" key={eachType}>
              <Form.Check
                id={eachType}
                value={title}
                type="checkbox"
                label={renderText(eachType)}
                onChange={handleInputChange}
              />
            </Form.Group>
          ))}
        </Form>
      </div>
    );
  };

  return Object.keys(filters).map(filterKey => (
    <Fragment key={filterKey}>
      {renderFilterBloack(filterKey, filters[filterKey])}
    </Fragment>
  ));
};

import React from 'react';
import PropTypes from 'prop-types';
import './FlashMessage.css';

export default function FlashMessage({ count }) {
  return (
    <div>
      No of times data fetched from the API:
      {count}
    </div>
  );
}

FlashMessage.propTypes = {
  count: PropTypes.number.isRequired,
}

import React from 'react';
import './FlashMessage.css';

export default function FlashMessage({ count }) {
  return (
    <div>
      No of times data fetched from the API:
      {count}
    </div>
  );
}
